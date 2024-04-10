<template>
  <div class="day-header">
    <h3>{{ dayName }}</h3>
    <p>{{ formattedDate(date) }}</p>
  </div>
</template>

<script>
export default {
  props: ['dayName', 'date'],
  methods: {
    formattedDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style scoped>
.day-header {
  text-align: center;
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}
.day-header h3 {
  font-size: 1.5rem;
  margin: 0;
}

.day-header p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
</style>
