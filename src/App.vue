<template>
  <div id="app">
    <header class="header">
      <!-- Global header content (if any) -->
    </header>
    <main>
      <router-view />
      <!-- The router-view component displays the component based on the current route -->
    </main>
    <footer>
      <!-- Global footer content (if any) -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
  // Any global JavaScript can be included here
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
