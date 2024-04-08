import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiService = {
  getStations() {
    return axios.get(`${API_BASE_URL}/stations`)
  },
  getBookingsForStation(stationId) {
    return axios.get(`${API_BASE_URL}/stations/${stationId}/bookings`)
  },
  getBookingDetails(stationId, bookingId) {
    return axios.get(`${API_BASE_URL}/stations/${stationId}/bookings/${bookingId}`)
  }
}
