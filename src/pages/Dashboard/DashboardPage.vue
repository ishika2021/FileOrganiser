<template>
  <Header />
  <BoardPage />
</template>

<script>
import Header from "../../components/Header/Header.vue";
import BoardPage from "../Board/BoardPage.vue";
import { mapGetters } from "vuex";
export default {
  name: "DashboardPage",
  components: {
    Header,
    BoardPage,
  },

  created() {
    const folderList = JSON.parse(localStorage.getItem("folders"));
    if (folderList) {
      this.$store.dispatch("folder/updateFolders", folderList);
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
