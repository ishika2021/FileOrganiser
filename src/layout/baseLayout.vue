<template>
  <Sidebar />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Sidebar from "../containers/Sidebar";

export default {
  name: "baseLayout",
  components: {
    Sidebar,
  },
};
</script>

<style>
main {
  display: grid;
  width: 100%;
}
</style>
