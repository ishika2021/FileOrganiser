<template>
  <nav class="header">
    <section class="sub-header-1">
      <div class="search">
        <SearchBar @update:modelValue="handleSearchInput($event)" />
      </div>
      <div class="theme">
        <ThemeSwitch />
      </div>
    </section>
    <section class="sub-header-2">
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
        <Button
          v-if="pageTitle === 'Trash'"
          icon="restore"
          type="danger"
          label="Restore All"
          size="full"
          @click="handleRestoreAll"
        />
      </div>
    </section>
  </nav>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/containers/Breadcrumbs";
import Dropdown from "@/components/Dropdown";
import FileUpload from "@/components/FileUpload/FileUpload";
import MenuItem from "@/components/MenuItem";
import ThemeSwitch from "@/containers/ThemeSwitch";
import Button from "@/components/Button/Button.vue";
export default {
  name: "Header",
  components: {
    SearchBar,
    Breadcrumbs,
    Dropdown,
    ThemeSwitch,
    Button,
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
          type: "primary",
          size: "medium",
          menu: [],
          visible: route !== "Dashboard",
        },
        {
          icon: "grid",
          label: "View",
          hasList: true,
          type: "primary",
          size: "medium",
          menu: [],
          visible: route !== "Dashboard",
        },
        {
          icon: "plus",
          label: "Create New",
          hasList: true,
          type: "secondary",
          size: "full",
          menu: [
            {
              text: "Folder",
              component: MenuItem,
              props: {
                icon: "folder-outline",
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
    handleRestoreAll() {
      this.$store.dispatch("views/restoreAllItems");
    },
  },
};
</script>
