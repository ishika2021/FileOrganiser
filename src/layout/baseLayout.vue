<template>
  <Sidebar />
  <main>
    <Header />
    <router-view></router-view>
  </main>
</template>

<script>
import Sidebar from "../containers/Sidebar";
import Header from "../containers/Header";

export default {
  name: "baseLayout",
  components: {
    Sidebar,
    Header,
  },
};
</script>

<style>
main {
  width: 100%;
}
</style>
