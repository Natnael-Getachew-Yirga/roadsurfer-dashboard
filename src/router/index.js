import { createRouter, createWebHistory } from 'vue-router'
import WeekView from '@/views/WeekView.vue'
import BookingDetail from '@/components/calendar/BookingDetail.vue'

// Define the routes for your application
const routes = [
  {
    path: '/',
    name: 'WeekView',
    component: WeekView // This will render the WeekView component when the root URL is accessed
  },
  {
    path: '/booking/:stationId/:bookingId',
    name: 'BookingDetail',
    component: BookingDetail,
    props: true
  }
]

// Create the router instance and pass the `routes` option
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use the HTML5 history mode
  routes // Short for `routes: routes`
})

export default router
