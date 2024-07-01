<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {},
  computed: {
    ...mapGetters({
      screenSize: "display/screenSize",
    }),
  },
  methods: {
    changeTheme(newTheme) {
      document.documentElement.setAttribute("data-theme", newTheme);
    },
    handleScreenWidthChange() {
      const width = window.innerWidth;
      let size = "full";
      if (width < 768 && width > 480) {
        size = "medium";
      } else if (width <= 480) {
        size = "small";
      }

      if (size !== this.screenSize) {
        this.$store.dispatch("display/updateScreenSize", size);
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleScreenWidthChange);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleScreenWidthChange);
  },
};
</script>

<style lang="scss">
@import "./styles/config.scss";
</style>
