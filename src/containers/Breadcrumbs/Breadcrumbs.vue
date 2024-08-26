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
      const currentBreadcrumbs = this.currentBreadcrumb;
      let titleIndex = 0;
      currentBreadcrumbs.map((item, index) => {
        if (item.id === breadcrumb.id) {
          titleIndex = index;
        }
      });

      const updatedBreadcrumbs = [...currentBreadcrumbs];
      updatedBreadcrumbs.splice(titleIndex + 1);
      const id = updatedBreadcrumbs[updatedBreadcrumbs.length - 1].id;
      const payload = {
        page: this.$route.name.toLowerCase(),
        breadcrumb: updatedBreadcrumbs,
      };
      await ConstantStore.updateCurrentFolder(id);
      this.$store.dispatch("data/updateCurrentFolder", id);
      this.$store.dispatch("breadcrumbs/updateSingleBreadcrumb", payload);
    },
  },
};
</script>
