<template>
  <div class="day-header">
    <h3>{{ dayName }}</h3>
    <p>{{ date }}</p>
  </div>
</template>

<script>
export default {
  props: ['dayName', 'date']
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
