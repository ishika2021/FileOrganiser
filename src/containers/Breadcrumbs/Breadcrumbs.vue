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
// import { mapGetters } from "vuex";
export default {
  name: "Breadcrumbs",
  components: {
    BreadcrumbItem,
  },
  // computed: {
  //   ...mapGetters({
  //     breadcrumbs: "breadcrumbs/breadcrumbs",
  //   }),
  // },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          path: "/",
          id: "00",
        },
      ],
    };
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

      const updatedBreadcrumbs = [...currentBreadcrumbs];
      updatedBreadcrumbs.splice(titleIndex + 1);
      const id = updatedBreadcrumbs[updatedBreadcrumbs.length - 1].id;
      const lastActiveFolder = currentBreadcrumbs[++titleIndex];

      localStorage.setItem("selectedFolder", id);
      this.$store.dispatch("folder/updateSelectedFolder", id);
      this.$store.dispatch("breadcrumbs/updateBreadcrumbs", updatedBreadcrumbs);
      this.$store.dispatch(
        "header/updateLastActiveFolder",
        lastActiveFolder.id
      );
    },
  },
};
</script>
