<template>
  <div>
    <div class="project-name">File Organiser</div>
    <div class="header">
      <div class="menu-container">
        <Dropdown
          v-for="listItem in list"
          :key="listItem.id"
          :items="listItem.items"
          :title="listItem.label"
          :icon="listItem.icon"
        />
      </div>
      <div class="menu-container">
        <v-icon
          class="cursor-pointer"
          icon="mdi-delete-outline"
          @click="handleDelete"
        ></v-icon>
        <v-icon class="cursor-pointer" icon="mdi-rename-box"></v-icon>
        <v-icon class="cursor-pointer" icon="mdi-content-cut"></v-icon>
        <v-icon class="cursor-pointer" icon="mdi-content-paste"></v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "../Dropdown/Dropdown.vue";
import { mapGetters } from "vuex";
export default {
  name: "Header",
  components: {
    Dropdown,
  },
  data() {
    return {
      list: [
        {
          title: "Add Menu",
          label: "New",
          icon: "mdi-plus-circle",
          items: [
            {
              title: "New Folder",
              icon: "",
              action: this.addFolder,
              isUpload: false,
            },
            {
              title: "New File",
              icon: "",
              action: () => {},
              isUpload: true,
            },
          ],
        },
        {
          title: "View Menu",
          label: "View",
          icon: "mdi-view-headline",
          items: [
            {
              title: "List",
              icon: "",
            },
            {
              title: "Grid",
              icon: "",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      selectedItems: "header/selectedItems",
      selectedFolder: "folder/selectedFolder",
    }),
  },
  methods: {
    addFolder() {
      this.$store.dispatch("folder/addNewFolder", true);
    },
    handleDelete() {
      const payload = {
        parent: this.selectedFolder,
        toBeDeleted: this.selectedItems,
      };
      this.$store.dispatch("folder/delete", payload);
    },
  },
};
</script>

<style>
@import "./styles.css";
</style>
