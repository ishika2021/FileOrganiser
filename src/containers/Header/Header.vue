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
        <Dropdown
          v-for="(button, index) in buttons"
          :key="index"
          :button="button"
          :menu="button.menu"
          :visible="button.visible"
        />
      </div>
    </section>
  </nav>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import Breadcrumbs from "@/containers/Breadcrumbs";
import Dropdown from "@/components/Dropdown";
import FileUpload from "@/components/FileUpload/FileUpload";
import MenuItem from "@/components/MenuItem";
export default {
  name: "Header",
  components: {
    SearchBar,
    Button,
    Breadcrumbs,
    Dropdown,
    FileUpload,
    MenuItem,
  },
  computed: {
    pageTitle() {
      return this.$route.name;
    },
    buttons() {
      const route = this.$route.name;
      return [
        {
          icon: "sort",
          label: "Sort",
          hasList: true,
          buttonStyle: "primary",
          size: "medium",
          menu: [],
          visible: route !== "Dashboard",
        },
        {
          icon: "grid",
          label: "View",
          hasList: true,
          buttonStyle: "primary",
          size: "medium",
          menu: [],
          visible: route !== "Dashboard",
        },
        {
          icon: "plus",
          label: "Create New",
          hasList: true,
          buttonStyle: "secondary",
          size: "full",
          menu: [
            {
              text: "Folder",
              component: MenuItem,
              props: {
                icon: "folder",
                label: "Folder",
                isDropdown: true,
                action: this.addFolder,
              },
            },
            {
              text: "File",
              component: FileUpload,
              props: { title: "File" },
            },
          ],
          visible: route === "Folders",
        },
      ];
    },
  },
  methods: {
    handleSearchInput(val) {
      console.log("=>", val);
    },
    addFolder() {
      this.$store.dispatch("data/addNewFolder", true);
    },
  },
};
</script>
