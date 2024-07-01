<template>
  <nav class="header">
    <section class="search">
      <SearchBar @update:modelValue="handleSearchInput($event)" />
    </section>
    <section class="page-head">
      <div class="page-information">
        <div class="breadcrumbs">
          <Breadcrumbs />
        </div>
        <span class="title">{{ pageTitle }}</span>
      </div>

      <div class="action-buttons">
        <Button
          icon="sort"
          label="Sort"
          :hasList="true"
          :size="iconSize || 'medium'"
        />
        <Button
          icon="grid"
          label="View"
          :hasList="true"
          :size="iconSize || 'medium'"
        />
        <Button
          icon="plus"
          label="Create New"
          :hasList="true"
          buttonStyle="secondary"
          :size="iconSize || 'full'"
        />
      </div>
    </section>
  </nav>
</template>

<script>
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Breadcrumbs from "../../containers/Breadcrumbs";
import { mapGetters } from "vuex";
export default {
  name: "Header",
  components: {
    SearchBar,
    Button,
    Breadcrumbs,
  },
  computed: {
    ...mapGetters({
      screenSize: "display/screenSize",
    }),
    pageTitle() {
      return this.$route.name;
    },
    iconSize() {
      if (this.screenSize === "medium" || this.screenSize === "small") {
        return "small";
      }
      return "";
    },
  },
  methods: {
    handleSearchInput(val) {
      console.log("=>", val);
    },
  },
};
</script>
