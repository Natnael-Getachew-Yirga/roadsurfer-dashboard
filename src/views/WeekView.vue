<template>
  <div>
    <station-selector @station-changed="onStationChange" />
    <calendar-grid :bookings="bookings" :selectedStation="selectedStation" />
  </div>
</template>

<script>
import StationSelector from '@/components/calendar/StationSelector.vue'
import CalendarGrid from '@/components/calendar/CalendarGrid.vue'
import { apiService } from '@/services/apiService'

export default {
  components: {
    StationSelector,
    CalendarGrid
  },
  data() {
    return {
      bookings: [],
      selectedStation: null
    }
  },
  methods: {
    onStationChange(stationId) {
      this.selectedStation = stationId
      apiService.getBookingsForStation(stationId).then((response) => {
        this.bookings = response.data
      })
    }
  }
}
</script>
