<template>
  <div class="board">
    <div v-for="(folder, index) in currentFolder" :key="index">
      <Folder :folderDetails="folder" :action="handleFolderClick" />
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
  </div>
</template>

<script>
import Folder from "../../components/Folder/Folder.vue";
import { transformDuplicateFolderName } from "../../utils/functionUtils/folderHelpers.js";
import { mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "BoardPage",
  components: {
    Folder,
  },
  computed: {
    ...mapGetters({
      folders: "folder/folders",
      newFolder: "folder/isNewFolder",
      breadcrumbs: "breadcrumbs/breadcrumbs",
      selectedFolder: "folder/selectedFolder",
    }),
    currentFolder() {
      return this.selectedFolder;
    },
  },
  methods: {
    saveFolder($name) {
      const name = $name.length > 0 ? $name : "New Folder";
      const folderName = transformDuplicateFolderName(
        name,
        this.selectedFolder
      );
      const obj = {
        id: uuidv4(),
        name: folderName,
        children: [],
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

    handleFolderClick(folder) {
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
  },
};
</script>

<style>
@import "./styles.css";
</style>
