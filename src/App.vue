<template>
  <div class="app">
    <div v-if="isLoading">Loading........</div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  initDB,
  addDataToDB,
  fetchDataFromDB,
} from "@/utils/functionUtils/indexedDB";
export default {
  name: "App",
  data() {
    return {
      isLoading: true,
    };
  },
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
  async created() {
    await initDB();
    const rootDirectory = await fetchDataFromDB("rootDirectory");
    const breadcrumbList = await fetchDataFromDB("breadcrumbs");
    const selectedFolderID = await fetchDataFromDB("currentFolderID");

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

      await addDataToDB(
        "breadcrumbs",
        JSON.parse(JSON.stringify(defaultBreadcrumb))
      );
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", defaultBreadcrumb);
    }

    if (selectedFolderID) {
      this.$store.dispatch("data/updateSelectedFolder", selectedFolderID);
    } else {
      this.$store.dispatch("data/updateSelectedFolder", "root");
      await addDataToDB("currentFolderID", "root");
    }
    this.isLoading = false;
  },
  watch: {
    rootDirectory: {
      handler: async function (prev, curr) {
        if (curr >= prev) {
          await addDataToDB("rootDirectory", JSON.parse(JSON.stringify(curr)));
          this.$store.dispatch("data/addNewFolder", false);
        }
      },
      deep: true,
    },
    breadcrumbs: {
      handler: async function (curr) {
        await addDataToDB("breadcrumbs", JSON.parse(JSON.stringify(curr)));
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "./styles/config.scss";
</style>
