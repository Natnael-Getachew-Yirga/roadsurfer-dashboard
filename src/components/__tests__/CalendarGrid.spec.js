import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CalendarGrid from '@/components/calendar/CalendarGrid.vue'
import { apiService } from '@/services/apiService'

// Mock the apiService module with the provided data sample
vi.mock('@/services/apiService', () => ({
  apiService: {
    getBookingsForStation: vi.fn(() =>
      Promise.resolve({
        data: [
          {
            id: '1',
            pickupReturnStationId: '1',
            customerName: 'Keara Adams',
            startDate: '2021-03-13T22:04:19.032Z',
            endDate: '2021-07-17T08:51:27.402Z'
          },
          {
            id: '7',
            pickupReturnStationId: '1',
            customerName: 'Elmira Larkin Sr.',
            startDate: '2021-02-19T17:22:15.117Z',
            endDate: '2021-08-10T10:35:41.773Z'
          }
          // ... add more bookings if needed
        ]
      })
    )
  }
}))

describe('CalendarGrid.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CalendarGrid, {
      props: {
        selectedStation: '1'
      }
    })
  })

  // Test to ensure the WeekNavigation component is rendered
  it('renders a week navigation component', () => {
    expect(wrapper.findComponent({ name: 'WeekNavigation' }).exists()).toBe(true)
  })

  // Test to ensure seven day columns are rendered
  it('renders seven day columns', () => {
    expect(wrapper.findAll('.day-column').length).toBe(7)
  })

  // Test to ensure fetchBookings is called on mount with the correct station ID
  it('calls fetchBookings on mount', async () => {
    await wrapper.vm.$nextTick()
    expect(apiService.getBookingsForStation).toHaveBeenCalledWith('1')
  })
  // Test to ensure the correct customer name is displayed for a booking
  it('displays the correct customer name for a booking', async () => {
    await wrapper.vm.$nextTick()
    const bookingElement = wrapper.find('.booking')
    expect(bookingElement.text()).toContain('Keara Adams')
  })
})
