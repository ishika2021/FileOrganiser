<template>
  <ul class="breadcrumbs">
    <BreadcrumbItem
      v-for="(item, index) in currentBreadcrumb"
      :key="index"
      :item="item"
      :action="handleBreadcrumbClick"
    />
  </ul>
</template>

<script>
import BreadcrumbItem from "../../components/BreadcrumbItem";
import { mapGetters } from "vuex";
import { ConstantStore } from "@/database";
import getUpdatedBreadcrumbs from "./utils/functionHelpers";

export default {
  name: "Breadcrumbs",
  components: {
    BreadcrumbItem,
  },
  computed: {
    ...mapGetters({
      breadcrumbs: "breadcrumbs/breadcrumbs",
    }),
    currentBreadcrumb() {
      return this.breadcrumbs[this.$route.name.toLowerCase()];
    },
  },
  methods: {
    async handleBreadcrumbClick(breadcrumb) {
      const { nextCurrentFolderID, payload } = getUpdatedBreadcrumbs(
        this.currentBreadcrumb,
        breadcrumb,
        this.$route.name
      );

      // handles breadcrumb navigation in Trash view
      if (this.$route.name === "Trash") {
        this.$store.dispatch("views/updateTrashedContent", nextCurrentFolderID);
      } else {
        await ConstantStore.updateCurrentFolder(nextCurrentFolderID);
        this.$store.dispatch("data/updateCurrentFolder", nextCurrentFolderID);
      }

      this.$store.dispatch("breadcrumbs/updateSingleBreadcrumb", payload);
    },
  },
};
</script>
