// DayHeader.spec.js

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DayHeader from '../common/DayHeader.vue'

describe('DayHeader.vue', () => {
  it('renders formatted date correctly', () => {
    const date = '2023-04-15' // Example date

    const wrapper = mount(DayHeader, {
      props: {
        date
      }
    })

    const formattedDate = wrapper.find('p').text()
    expect(formattedDate).toBe('Apr 15, 2023') // Expected formatted date
  })
})
