<template>
  <Header />
  <BreadcrumbNav />
  <BoardPage />
</template>

<script>
import Header from "../../components/Header/Header.vue";
import BoardPage from "../Board/BoardPage.vue";
import BreadcrumbNav from "../BreadcrumbNav/BreadcrumbNav.vue";
import { mapGetters } from "vuex";

export default {
  name: "DashboardPage",
  components: {
    Header,
    BoardPage,
    BreadcrumbNav,
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
      this.$store.dispatch("folder/updateFolders", obj);
    }

    if (breadcrumbList) {
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", breadcrumbList);
    } else {
      const defaultBreadcrumb = [
        {
          title: "Home",
          path: "/",
          id: "00",
        },
      ];
      localStorage.setItem("breadcrumbs", JSON.stringify(defaultBreadcrumb));
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", defaultBreadcrumb);
    }

    if (selectedFolderID) {
      this.$store.dispatch("folder/updateSelectedFolder", selectedFolderID);
    } else {
      this.$store.dispatch("folder/updateSelectedFolder", "00");
      localStorage.setItem("selectedFolder", "00");
    }
  },
  computed: {
    ...mapGetters({
      rootDirectory: "folder/rootDirectory",
      breadcrumbs: "breadcrumbs/breadcrumbs",
      selectedFolder: "folder/selectedFolder",
    }),
  },
  watch: {
    rootDirectory: {
      handler: function (prev, curr) {
        if (curr >= prev) {
          localStorage.setItem("rootDirectory", JSON.stringify(curr));
          this.$store.dispatch("folder/addNewFolder", false);
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
