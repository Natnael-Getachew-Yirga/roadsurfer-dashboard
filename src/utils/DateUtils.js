// DateUtils.js
export default {
  getDayOfWeek(date, dayName) {
    const dayIndex = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ].indexOf(dayName)
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() - newDate.getDay() + dayIndex)
    return newDate
  },

  getFormattedDate(date) {
    return date.toDateString()
  },

  navigateWeek(date, step) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + step * 7)
    return newDate
  }
}
