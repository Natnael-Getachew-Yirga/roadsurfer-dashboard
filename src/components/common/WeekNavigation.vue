<template>
  <div class="week-navigation">
    <button @click="goToPreviousWeek">Previous Week</button>
    <button @click="goToNextWeek">Next Week</button>
  </div>
</template>

<script>
export default {
  emits: ['week-changed'],
  methods: {
    goToPreviousWeek() {
      this.$emit('week-changed', -1)
    },
    goToNextWeek() {
      this.$emit('week-changed', 1)
    }
  }
}
</script>

<style scoped>
.week-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
button {
  padding: 10px 20px;
  border: none;
  background-color: #6bbbae;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
