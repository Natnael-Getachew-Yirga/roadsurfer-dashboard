<template>
  <div class="dropdown-container">
    <button @click="toggleDropdown" class="dropdown-button">
      {{ selectedStation ? getStationName(selectedStation) : 'Select a station...' }}
    </button>
    <div v-show="isDropdownOpen" class="dropdown-list">
      <div
        v-for="station in filteredStations"
        :key="station.id"
        @click="selectStation(station.id)"
        class="dropdown-item"
      >
        {{ station.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/apiService'

export default {
  data() {
    return {
      search: '',
      stations: [],
      selectedStation: null,
      isDropdownOpen: false
    }
  },
  computed: {
    filteredStations() {
      return this.stations.filter((station) =>
        station.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  mounted() {
    this.fetchStations()
  },
  methods: {
    fetchStations() {
      apiService.getStations().then((response) => {
        this.stations = response.data
      })
    },
    emitStationChange() {
      this.$emit('station-changed', this.selectedStation)
      this.toggleDropdown() // Close dropdown after selection
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    selectStation(id) {
      this.selectedStation = id
      this.emitStationChange()
    },
    getStationName(stationId) {
      const station = this.stations.find((station) => station.id === stationId)
      return station ? station.name : ''
    }
  }
}
</script>

<style scoped lang="scss">
$primary-color: #ffffff;
$secondary-color: #6bbbae;

.dropdown-container {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  position: relative; /* Set the position to relative to act as an anchor for the absolute positioning of the dropdown list */
  padding: 20px;
}

.dropdown-button {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid $secondary-color;
  border-radius: 4px;
  background-color: $primary-color;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: left; /* Align text to the left within the button */
}

.dropdown-list {
  display: none; /* Initially hide the dropdown list */
  position: absolute;
  width: calc(100% - 1rem); /* Adjust the width to account for padding */
  background-color: $primary-color;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  left: 0.5rem; /* Align the dropdown list with the button */
}

.dropdown-item {
  padding: 0.5rem;
  border-bottom: 1px solid $secondary-color;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: darken($primary-color, 5%);
  }
}

/* Add this to show the dropdown list when isDropdownOpen is true */
.dropdown-container .dropdown-list {
  display: block;
}
</style>
