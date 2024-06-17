<template>
  <div
    class="board"
    v-drag-select="{ getSelectedItems: handleSelectedFolders }"
    @click="handleBoardClick"
    ref="scrollContainer"
  >
    <div v-for="(folder, index) in currentSubFolders" :key="index">
      <div
        :class="lastActiveFolder === folder.id ? 'last-folder-selected' : ''"
        :key="folder.id"
      >
        <Folder
          :folderDetails="folder"
          :singleClickAction="handleItemSelected"
          :doubleClickAction="handleFolderDoubleClick"
          class="selectable"
          :data-id="folder.id"
        />
      </div>
    </div>
    <div>
      <Folder
        v-if="newFolder"
        :isEdit="false"
        :autoFocus="true"
        name="New Folder"
        :isCreated="true"
        @save-folder="saveFolder"
      />
    </div>
    <div v-for="(file, index) in selectedFiles" :key="index">
      <div :class="selected === file.id ? 'folder-selected' : ''">
        <ImageFile
          :file="file"
          :action="handleItemSelected"
          class="selectable"
          :data-id="file.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Folder from "../../components/Folder/Folder.vue";
import ImageFile from "../../components/ImageFile/ImageFile.vue";
import { transformDuplicateFolderName } from "../../utils/functionUtils/folderHelpers.js";
import { mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "BoardPage",
  components: {
    Folder,
    ImageFile,
  },
  data() {
    return {
      selected: null,
      currentFolderList: [],
    };
  },
  computed: {
    ...mapGetters({
      newFolder: "folder/isNewFolder",
      breadcrumbs: "breadcrumbs/breadcrumbs",
      selectedFolder: "folder/selectedFolder",
      selectedFiles: "folder/selectedFiles",
      lastActiveFolder: "header/lastActiveFolder",
    }),
    currentSubFolders() {
      return this.selectedFolder.children;
    },
  },
  methods: {
    saveFolder($name) {
      const name = $name.length > 0 ? $name : "New Folder";
      const selectedFolder = this.selectedFolder || {};

      const folderName = transformDuplicateFolderName(name, selectedFolder);
      const obj = {
        id: "D-" + uuidv4(),
        name: folderName,
        children: [],
        files: [],
      };

      if (this.breadcrumbs.length <= 1) {
        const payload = {
          folder: obj,
          parent: "00",
        };
        this.$store.dispatch("folder/addFolder", payload);
        this.$store.dispatch("folder/updateSelectedFolder", "00");
      } else {
        const id = this.breadcrumbs[this.breadcrumbs.length - 1].id;
        const payload = {
          folder: obj,
          parent: id,
        };
        this.$store.dispatch("folder/addFolder", payload);
        this.$store.dispatch("folder/updateSelectedFolder", id);
      }
    },
    handleItemSelected($event) {
      $event.stopPropagation();
    },

    handleFolderDoubleClick($event, folder) {
      $event.stopPropagation();
      const lastTitlePath = this.breadcrumbs[this.breadcrumbs.length - 1].path;
      const path =
        lastTitlePath === "/"
          ? "/" + folder.name
          : lastTitlePath + "/" + folder.name;
      const obj = {
        title: folder.name,
        path: path,
        id: folder.id,
      };
      this.$store.dispatch("breadcrumbs/addBreadcrumb", obj);
      this.$store.dispatch("folder/updateSelectedFolder", folder.id);
      localStorage.setItem("selectedFolder", folder.id);
    },
    handleBoardClick(e) {
      e.stopPropagation();
      this.$store.dispatch("header/updateLastActiveFolder", null);
    },
    handleSelectedFolders(selectedFolderIds) {
      this.$store.dispatch("header/updateSelectedItem", selectedFolderIds);
    },
  },
  watch: {
    selectedFolder: {
      handler(val) {
        this.currentFolderList = [...val.children];
      },
      deep: true,
    },
  },
};
</script>

<style>
@import "./styles.css";
</style>
