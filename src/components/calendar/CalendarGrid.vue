<template>
  <div class="calendar-container">
    <!-- Week Navigation -->
    <week-navigation @week-changed="navigateWeek" />

    <!-- Calendar Grid -->
    <div class="calendar-grid">
      <div v-for="(day, index) in daysOfWeek" :key="index" class="day-column">
        <!-- Day Header -->
        <day-header :dayName="day" :date="formattedDate(day)" />
        <!-- Bookings -->
        <div
          v-for="booking in bookingsByDayAndStation(day)"
          :key="booking.id"
          class="booking"
          @click="openBookingDetail(booking)"
          :class="{
            pickup: isPickup(booking.startDate, day),
            return: isReturn(booking.endDate, day)
          }"
        >
          {{ booking.customerName }}
        </div>
      </div>
      <!-- Legend -->
      <div class="legend">
        <div class="legend-item">
          <div class="color-box pickup"></div>
          Pickup
        </div>
        <div class="legend-item">
          <div class="color-box return"></div>
          Return
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeekNavigation from '@/components/common/WeekNavigation.vue'
import DayHeader from '@/components/common/DayHeader.vue'
import DateUtils from '@/utils/DateUtils'
import { apiService } from '@/services/apiService'

export default {
  props: ['selectedStation'],
  data() {
    return {
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      baseDate: new Date('2021-07-17'), // Default date for convince for api fetch
      bookings: []
    }
  },
  mounted() {
    // Fetch bookings when the component is mounted
    this.fetchBookings()
  },
  methods: {
    formattedDate(day) {
      const date = DateUtils.getDayOfWeek(this.baseDate, day)
      return DateUtils.getFormattedDate(date)
    },
    navigateWeek(step) {
      // Update baseDate when navigating weeks
      this.baseDate = DateUtils.navigateWeek(this.baseDate, step)
      this.fetchBookings()
    },
    fetchBookings() {
      if (!this.selectedStation) {
        // Clear bookings if no station is selected
        this.bookings = []
        return
      }
      // Fetch bookings for the selected station
      apiService
        .getBookingsForStation(this.selectedStation)
        .then((response) => {
          this.bookings = response.data
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error)
        })
    },
    bookingsByDayAndStation(day) {
      // Filter bookings based on the day and selected station
      const dayIndex = this.daysOfWeek.indexOf(day)
      const startOfWeek = new Date(this.baseDate)
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + dayIndex)
      const endOfDay = new Date(startOfWeek)
      endOfDay.setHours(23, 59, 59, 999) // End of the day

      return this.bookings.filter((booking) => {
        const bookingStartDate = new Date(booking.startDate)
        const bookingEndDate = new Date(booking.endDate)
        return (
          ((bookingStartDate >= startOfWeek && bookingStartDate <= endOfDay) ||
            (bookingEndDate >= startOfWeek && bookingEndDate <= endOfDay)) &&
          booking.pickupReturnStationId === this.selectedStation
        )
      })
    },
    isPickup(startDate, day) {
      // Check if a booking is a pickup on the specified day
      const bookingStartDate = new Date(startDate)
      const bookingDay = bookingStartDate.toLocaleDateString('en-US', { weekday: 'long' })
      return bookingDay === day
    },
    isReturn(endDate, day) {
      // Check if a booking is a return on the specified day
      const bookingEndDate = new Date(endDate)
      const bookingDay = bookingEndDate.toLocaleDateString('en-US', { weekday: 'long' })
      return bookingDay === day
    },
    openBookingDetail(booking) {
      // Navigate to the booking detail page
      this.$router.push({
        name: 'BookingDetail',
        params: {
          stationId: booking.pickupReturnStationId,
          bookingId: booking.id
        }
      })
    }
  },
  watch: {
    selectedStation(newStation, oldStation) {
      // Fetch bookings when the selected station changes
      if (newStation !== oldStation) {
        this.fetchBookings()
      }
    }
  },
  components: {
    WeekNavigation,
    DayHeader
  }
}
</script>

<style scoped>
/* Base styles */
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.week-navigation {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 7px;
  width: 90%;
}

.day-column {
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ccc;
}

.day-column:last-child {
  border-right: none;
}

/* Responsive styles */
@media (max-width: 768px) {
  .calendar-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .week-navigation button {
    padding: 5px 10px;
  }
}

@media (max-width: 480px) {
  .calendar-grid {
    grid-template-columns: repeat(1, 1fr); /* Stack columns on very small screens */
  }

  .week-navigation {
    flex-direction: column; /* Stack navigation buttons vertically */
  }

  .week-navigation button {
    width: 100%; /* Full width buttons on very small screens */
    margin-bottom: 5px; /* Add space between stacked buttons */
  }
}

.booking {
  cursor: pointer;
}
.pickup {
  background-color: lightgreen; /* Example color for pickup bookings */
}
.return {
  background-color: lightblue; /* Example color for return bookings */
}
.legend {
  justify-content: center;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.legend-item .color-box {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
