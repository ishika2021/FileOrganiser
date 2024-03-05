<template>
  <div class="app">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "./pages/Dashboard/DashboardPage.vue";
export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>
<style>
@import "./App.css";
</style>
