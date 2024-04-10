<template>
  <div class="booking-detail">
    <!-- Title -->
    <h2>Booking Details</h2>

    <!-- Loading state -->
    <div v-if="loading">Loading...</div>

    <!-- Display booking details -->
    <div v-else>
      <p><strong>Customer Name:</strong> {{ booking?.customerName }}</p>
      <p><strong>Booking Start Date:</strong> {{ formattedDate(booking?.startDate) }}</p>
      <p><strong>Booking End Date:</strong> {{ formattedDate(booking?.endDate) }}</p>
      <p>
        <strong>Duration:</strong>
        {{ calculateDuration(booking?.startDate, booking?.endDate) }} days
      </p>
      <p><strong>Station Name:</strong> {{ stationName }}</p>
    </div>

    <!-- Go Back button -->
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
import { apiService } from '@/services/apiService'

export default {
  data() {
    return {
      loading: true,
      booking: null,
      stationName: ''
    }
  },
  mounted() {
    this.fetchBookingDetails()
  },
  methods: {
    // Fetch booking details
    fetchBookingDetails() {
      const { stationId, bookingId } = this.$route.params

      apiService
        .getBookingDetails(stationId, bookingId)
        .then((response) => {
          this.booking = response.data
          this.fetchStationName(this.booking.pickupReturnStationId)
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching booking details:', error)
          this.loading = false // Update loading state in case of error
        })
    },

    // Fetch station name
    fetchStationName(stationId) {
      apiService
        .getStations()
        .then((response) => {
          const station = response.data.find((station) => station.id === stationId)
          if (station) {
            this.stationName = station.name
          }
        })
        .catch((error) => {
          console.error('Error fetching station name:', error)
        })
    },

    // Format date
    formattedDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    },

    // Calculate duration
    calculateDuration(startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    },

    // Go back to previous page
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.booking-detail {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.booking-detail h2 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.booking-detail div {
  margin-bottom: 15px;
}

.booking-detail p {
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
}

.booking-detail strong {
  color: #333;
}

button {
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  border: none;
  background-color: #6bbbae;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: darken(#6bbbae, 10%);
}
</style>
