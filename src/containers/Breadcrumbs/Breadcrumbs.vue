<template>
  <ul class="breadcrumbs">
    <BreadcrumbItem
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :item="item"
      :action="handleBreadcrumbClick"
    />
  </ul>
</template>

<script>
import BreadcrumbItem from "../../components/BreadcrumbItem";
import { mapGetters } from "vuex";
import { addDataToDB } from "@/utils/functionUtils/indexedDB";
export default {
  name: "Breadcrumbs",
  components: {
    BreadcrumbItem,
  },
  computed: {
    ...mapGetters({
      breadcrumbs: "breadcrumbs/breadcrumbs",
    }),
  },
  methods: {
    async handleBreadcrumbClick(breadcrumb) {
      const currentBreadcrumbs = this.breadcrumbs;
      let titleIndex = 0;
      currentBreadcrumbs.map((item, index) => {
        if (item.id === breadcrumb.id) {
          titleIndex = index;
        }
      });

      const updatedBreadcrumbs = [...currentBreadcrumbs];
      updatedBreadcrumbs.splice(titleIndex + 1);
      const id = updatedBreadcrumbs[updatedBreadcrumbs.length - 1].id;
      // const lastActiveFolder = currentBreadcrumbs[++titleIndex];

      // localStorage.setItem("selectedFolder", id);
      await addDataToDB("currentFolderID", id);
      this.$store.dispatch("data/updateSelectedFolder", id);
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", updatedBreadcrumbs);
      // this.$store.dispatch("header/updateLastActiveFolder", lastActiveFolder.id);
    },
  },
};
</script>
