<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      screenSize: "display/screenSize",
      rootDirectory: "data/rootDirectory",
      breadcrumbs: "breadcrumbs/breadcrumbs",
      selectedFolder: "data/selectedFolder",
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
  created() {
    const rootDirectory = JSON.parse(localStorage.getItem("rootDirectory"));
    const breadcrumbList = JSON.parse(localStorage.getItem("breadcrumbs"));
    const selectedFolderID = localStorage.getItem("selectedFolder");
    if (rootDirectory) {
      const obj = {
        folders: rootDirectory.children,
        files: rootDirectory.files,
      };
      this.$store.dispatch("data/updateFolders", obj);
    }

    if (breadcrumbList) {
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", breadcrumbList);
    } else {
      const defaultBreadcrumb = [
        {
          title: "Home",
          path: "/",
          id: "root",
        },
      ];
      localStorage.setItem("breadcrumbs", JSON.stringify(defaultBreadcrumb));
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", defaultBreadcrumb);
    }

    if (selectedFolderID) {
      this.$store.dispatch("data/updateSelectedFolder", selectedFolderID);
    } else {
      this.$store.dispatch("data/updateSelectedFolder", "root");
      localStorage.setItem("selectedFolder", "root");
    }
  },
  watch: {
    rootDirectory: {
      handler: function (prev, curr) {
        if (curr >= prev) {
          localStorage.setItem("rootDirectory", JSON.stringify(curr));
          this.$store.dispatch("data/addNewFolder", false);
        }
      },
      deep: true,
    },
    breadcrumbs: {
      handler: function (curr) {
        localStorage.setItem("breadcrumbs", JSON.stringify(curr));
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "./styles/config.scss";
</style>
