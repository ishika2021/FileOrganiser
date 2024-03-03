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
        <v-icon class="icon" icon="mdi-delete-outline"></v-icon>
        <v-icon class="icon" icon="mdi-rename-box"></v-icon>
        <v-icon class="icon" icon="mdi-content-cut"></v-icon>
        <v-icon class="icon" icon="mdi-content-paste"></v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "../Dropdown/Dropdown.vue";
export default {
  name: "Header",
  components: {
    Dropdown,
  },
  data: () => ({
    list: [
      {
        title: "Add Menu",
        label: "New",
        icon: "mdi-plus-circle",
        items: [
          {
            title: "New Folder",
            icon: "",
          },
          {
            title: "New File",
            icon: "",
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
  }),
};
</script>

<style>
@import "./styles.css";
</style>
