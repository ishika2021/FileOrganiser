<template>
  <ul class="breadcrumb">
    <Breadcrumbs
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :title="item.title"
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
      folders: "folder/folders",
    }),
  },
  methods: {
    handleBreadcrumbClick(breadcrumb) {
      const currentBreadcrumbs = this.breadcrumbs;
      let titleIndex = 0;
      currentBreadcrumbs.map((item, index) => {
        if (item.title === breadcrumb) {
          titleIndex = index;
        }
      });

      currentBreadcrumbs.splice(titleIndex + 1);
      const title = currentBreadcrumbs[currentBreadcrumbs.length - 1].title;
      // const currentFolder = getCurrentFolder(currentBreadcrumbs[currentBreadcrumbs.length-1].title,this.folders)
      this.$store.dispatch("folder/updateSelectedFolder", title);
    },
  },
};
</script>
<style>
@import "./styles.css";
</style>
