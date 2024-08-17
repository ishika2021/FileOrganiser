<template>
  <Notification />
  <div class="app">
    <div v-if="isLoading"><SkeletonLoader /></div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Notification from "./components/Notification";
import { getNewFolder } from "@/views/Folders/utils/functionHelper";
import SkeletonLoader from "@/components/SkeletonLoader";
import {
  ConstantStore,
  BreadcrumbStore,
  DirectoryStore,
  ActionStore,
} from "@/database";
import { initDB } from "./database/config";

export default {
  name: "App",
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    Notification,
    SkeletonLoader,
  },
  computed: {
    ...mapGetters({
      screenSize: "display/screenSize",
      rootDirectory: "data/rootDirectory",
      breadcrumbs: "breadcrumbs/breadcrumbs",
    }),
  },
  methods: {
    async handleScreenWidthChange() {
      const width = window.innerWidth;
      let size = "full";
      if (width < 768 && width > 480) {
        size = "medium";
      } else if (width <= 480) {
        size = "small";
      }

      if (size !== this.screenSize) {
        this.$store.dispatch("display/updateScreenSize", size);
        await ConstantStore.updateScreenSize(size);
      }
    },
    async initializeDatabase() {
      await initDB();
      await ActionStore.init();
      await ConstantStore.init();
      await BreadcrumbStore.init();
      await DirectoryStore.init();
    },
    createDefaultFolders() {
      const folders = ["Document", "Images", "Important"];
      const currentFolder = {
        id: "root",
        children: [],
      };
      const result = [];
      folders.forEach((folder) => {
        const newFolder = getNewFolder(folder, currentFolder);
        result.push(newFolder);
      });
      return result;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleScreenWidthChange);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleScreenWidthChange);
  },
  async created() {
    await this.initializeDatabase();
    const rootDirectory = await DirectoryStore.getDirectories();
    const breadcrumbList = await BreadcrumbStore.getBreadcrumbs();
    const [selectedFolderID, screenSize, theme] =
      await ConstantStore.getAllConstants();
    const [copy, cut] = await ActionStore.getAllActions();

    if (copy && copy.value) {
      this.$store.dispatch("actions/updateCopiedItems", copy.value);
    }
    if (cut && cut.value) {
      this.$store.dispatch("actions/updateCutItems", cut.value);
    }

    if (theme && theme.value) {
      this.$store.dispatch("display/updateTheme", theme.value);
      document.documentElement.setAttribute("data-theme", theme.value);
    }

    if (screenSize && screenSize.value) {
      this.$store.dispatch("display/updateScreenSize", screenSize.value);
    }

    if (rootDirectory) {
      const obj = {
        folders: rootDirectory.children,
        files: rootDirectory.files,
      };

      this.$store.dispatch("data/updateFolders", obj);
    } else {
      // gives default folder for new user
      const children = this.createDefaultFolders();
      const obj = {
        folders: children,
        files: [],
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

      await BreadcrumbStore.updateBreadcrumbs(
        JSON.parse(JSON.stringify(defaultBreadcrumb))
      );
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", defaultBreadcrumb);
    }

    if (selectedFolderID) {
      this.$store.dispatch("data/updateSelectedFolder", selectedFolderID.value);
    } else {
      this.$store.dispatch("data/updateSelectedFolder", "root");
      await ConstantStore.updateCurrentFolder("root");
    }

    //shows skeleton loader longer
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  watch: {
    rootDirectory: {
      handler: async function (prev, curr) {
        if (curr >= prev) {
          await DirectoryStore.updateDirectories(
            JSON.parse(JSON.stringify(curr))
          );
          this.$store.dispatch("data/addNewFolder", false);
        }
      },
      deep: true,
    },
    breadcrumbs: {
      handler: async function (curr) {
        await BreadcrumbStore.updateBreadcrumbs(
          JSON.parse(JSON.stringify(curr))
        );
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "./styles/config.scss";
</style>
