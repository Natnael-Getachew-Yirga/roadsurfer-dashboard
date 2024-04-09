// Import the necessary testing utilities and the component to be tested
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StationSelector from '@/components/calendar/StationSelector.vue'
import { apiService } from '@/services/apiService'

// Mock the apiService module to control its behavior for testing purposes
vi.mock('@/services/apiService', () => ({
  apiService: {
    // Mock the getStations method to return a resolved promise with mock data
    getStations: vi.fn(() => Promise.resolve({ data: [{ id: '1', name: 'Station One' }] }))
  }
}))

// Describe the test suite for the StationSelector component
describe('StationSelector.vue', () => {
  let wrapper // Declare a variable to hold the component wrapper

  // Before each test, mount the component and wait for any asynchronous operations to complete
  beforeEach(async () => {
    wrapper = mount(StationSelector)
    await wrapper.vm.$nextTick() // Wait for all promises to resolve and DOM updates to complete
  })

  // Test to check if the dropdown button renders with the default text
  it('should render the dropdown button with default text', () => {
    const button = wrapper.find('.dropdown-button') // Find the dropdown button in the component
    expect(button.text()).toContain('Select a station...') // Assert that the button contains the default text
  })

  // Test to check if the dropdown list toggles when the button is clicked
  it('should toggle the dropdown list when the button is clicked', async () => {
    await wrapper.find('.dropdown-button').trigger('click') // Simulate a click on the dropdown button
    expect(wrapper.vm.isDropdownOpen).toBe(true) // Assert that the dropdown is open
    await wrapper.find('.dropdown-button').trigger('click') // Simulate another click to close the dropdown
    expect(wrapper.vm.isDropdownOpen).toBe(false) // Assert that the dropdown is closed
  })

  // Test to check if stations are fetched when the component is mounted
  it('should fetch stations on mount', () => {
    expect(apiService.getStations).toHaveBeenCalled() // Assert that the getStations method was called
  })

  // Test to check if the "station-changed" event is emitted with the selected station id
  it('should emit "station-changed" with the selected station id when a station is selected', async () => {
    // Set the component's stations data to mock the fetched stations
    wrapper.vm.stations = [{ id: '1', name: 'Station One' }]
    wrapper.vm.isDropdownOpen = true // Open the dropdown for the test
    await wrapper.vm.$nextTick() // Wait for the DOM to update
    await wrapper.find('.dropdown-item').trigger('click') // Simulate a click on a dropdown item
    expect(wrapper.emitted()).toHaveProperty('station-changed') // Assert that the "station-changed" event was emitted
    expect(wrapper.emitted()['station-changed'][0]).toEqual(['1']) // Assert that the event payload is correct
  })
})
