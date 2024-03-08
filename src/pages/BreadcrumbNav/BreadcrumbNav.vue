<template>
  <ul class="breadcrumb">
    <Breadcrumbs
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :title="item.title"
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
};
</script>
<style>
@import "./styles.css";
</style>
