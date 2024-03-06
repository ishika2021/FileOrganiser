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
    const folderList = JSON.parse(localStorage.getItem("folders"));
    const breadcrumbList = JSON.parse(localStorage.getItem("breadcrumbs"));
    if (folderList) {
      this.$store.dispatch("folder/updateFolders", folderList);
    }

    if (breadcrumbList) {
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", breadcrumbList);
    } else {
      const defaultBreadcrumb = [
        {
          title: "Home",
          path: "/",
        },
      ];
      localStorage.setItem("breadcrumbs", JSON.stringify(defaultBreadcrumb));
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", defaultBreadcrumb);
    }
  },
  computed: {
    ...mapGetters({
      folders: "folder/folders",
    }),
  },
  watch: {
    folders: {
      handler: function (prev, curr) {
        if (curr >= prev) {
          localStorage.setItem("folders", JSON.stringify(curr));
          this.$store.dispatch("folder/addNewFolder", false);
        }
      },
      deep: true,
    },
  },
};
</script>
