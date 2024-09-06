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
import SkeletonLoader from "@/components/SkeletonLoader";
import {
  ConstantStore,
  BreadcrumbStore,
  DirectoryStore,
  ActionStore,
  ViewStore,
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
      await ViewStore.init();
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
    const [currentFolderID, screenSize, theme] =
      await ConstantStore.getAllConstants();
    const [copy, cut] = await ActionStore.getAllActions();
    const [recent, starred, trash] = await ViewStore.getAllViews();

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
    }

    //should stay before breadcrumbList so that it can be overriden if more than 1 breadcrumb exists for both views
    if (trash && trash.value) {
      this.$store.dispatch("views/updateTrash", trash.value);
    }

    if (starred && starred.value) {
      this.$store.dispatch("starredView/updateStarred", starred.value);
    }

    if (breadcrumbList) {
      const { trash, starred } = breadcrumbList;
      if (trash.length > 1) {
        // gets ID of folder that was open in the trash view before reload
        const lastFolderID = trash[trash.length - 1].id;
        this.$store.dispatch("views/updateTrashedContent", lastFolderID);
      }

      if (starred.length > 1) {
        const lastFolderID = starred[starred.length - 1].id;
        this.$store.dispatch("starredView/updateStarredContent", lastFolderID);
      }
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", breadcrumbList);
    } else {
      const obj = {
        title: "Home",
        path: "/",
        id: "root",
      };
      const defaultBreadcrumb = {
        folders: [obj],
        starred: [obj],
        trash: [obj],
      };

      await BreadcrumbStore.updateBreadcrumbs(
        JSON.parse(JSON.stringify(defaultBreadcrumb))
      );
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", defaultBreadcrumb);
    }

    if (currentFolderID) {
      this.$store.dispatch("data/updateCurrentFolder", currentFolderID.value);
    } else {
      this.$store.dispatch("data/updateCurrentFolder", "root");
      await ConstantStore.updateCurrentFolder("root");
    }

    if (recent && recent.value) {
      this.$store.dispatch("views/updateRecent", recent.value);
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
