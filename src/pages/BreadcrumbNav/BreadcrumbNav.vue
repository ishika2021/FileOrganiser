<template>
  <ul class="breadcrumb">
    <Breadcrumbs
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :breadcrumb="item"
      :action="handleBreadcrumbClick"
    />
  </ul>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.vue";
import { mapGetters } from "vuex";
export default {
  name: "BreadcrumbNav",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapGetters({
      breadcrumbs: "breadcrumbs/breadcrumbs",
    }),
  },
  methods: {
    handleBreadcrumbClick(breadcrumb) {
      const currentBreadcrumbs = this.breadcrumbs;
      let titleIndex = 0;
      currentBreadcrumbs.map((item, index) => {
        if (item.id === breadcrumb.id) {
          titleIndex = index;
        }
      });

      currentBreadcrumbs.splice(titleIndex + 1);
      const id = currentBreadcrumbs[currentBreadcrumbs.length - 1].id;
      localStorage.setItem("selectedFolder", id);
      this.$store.dispatch("folder/updateSelectedFolder", id);
    },
  },
};
</script>
<style>
@import "./styles.css";
</style>
