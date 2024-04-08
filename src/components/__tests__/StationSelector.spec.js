import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import StationSelector from '../calendar/StationSelector.vue'

// Mock the apiService module

describe('StationSelector.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(StationSelector, {
      data() {
        return {
          stations: [],
          selectedStation: null,
          isDropdownOpen: false
        }
      }
    })
  })

  it('renders a button to toggle the dropdown', () => {
    const button = wrapper.find('.dropdown-button')
    expect(button.exists()).toBe(true)
  })

  it('toggles the dropdown when the button is clicked', async () => {
    await wrapper.find('.dropdown-button').trigger('click')
    expect(wrapper.vm.isDropdownOpen).toBe(true)
  })

  it('fetches stations on mount', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.stations.length).toBeGreaterThan(0)
  })

  it('displays a list of stations when the dropdown is open', async () => {
    await wrapper.setData({ isDropdownOpen: true })
    const items = wrapper.findAll('.dropdown-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('emits "station-changed" event when a station is selected', async () => {
    await wrapper.setData({ isDropdownOpen: true })
    await wrapper.findAll('.dropdown-item')[0].trigger('click')
    expect(wrapper.emitted('station-changed')).toBeTruthy()
  })
})
