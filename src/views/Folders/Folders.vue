<template>
  <BaseWrapper
    :folders="unTrashedFolders"
    :files="unTrashedFiles"
    :folder-action="saveFolder"
    :file-action="handleItemSelected"
    :renameFolder="renameFolder"
    :renameFile="renameFile"
    :getFolderNamesuggestion="getNewFolderName"
  />
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, toRefs } from "vue";

import BaseWrapper from "../BaseWrapper";
import {
  getNewFolder,
  getNewFolderName,
  getNewFileName,
} from "./utils/functionHelper";

const store = useStore();

const state = reactive({
  currentFolder: computed(() => store.getters["data/currentFolder"]),
  selectedFiles: computed(() => store.getters["data/selectedFiles"]),
  breadcrumbs: computed(() => store.getters["breadcrumbs/breadcrumbs"]),
  unTrashedFolders: computed(() => {
    return state.currentFolder.children?.filter(({ trash }) => !trash);
  }), //returns only the folders/files which aren't trashed
  unTrashedFiles: computed(() => {
    return state.selectedFiles?.filter(({ trash }) => !trash);
  }),
});

const saveFolder = ($name) => {
  const newFolder = getNewFolder($name, state.currentFolder);
  const parentID = state.breadcrumbs[state.breadcrumbs.length - 1].id;

  const payload = {
    folder: newFolder,
    parent: parentID,
  };
  store.dispatch("data/addFolder", payload);
  setNotification("Folder is created successfully");
};

const renameFolder = (obj) => {
  if (obj.name !== obj.folder.name) {
    const folderName = getNewFolderName(obj.name, state.currentFolder.children);
    obj.folder.name = folderName;
  }
  store.dispatch("actions/updateRenamedItems", null);
  setNotification("Folder is renamed successfully");
};

const renameFile = (obj) => {
  if (obj.name !== obj.file.name) {
    const fileName = getNewFileName(obj.name, state.currentFolder.files);
    obj.file.name = fileName;
  }
  store.dispatch("actions/updateRenamedItems", null);
  setNotification("File is renamed successfully");
};

const handleItemSelected = ($event) => {
  $event.stopPropagation();
};

const setNotification = (message, type = "default") => {
  const notification = {
    type: type,
    message: message,
  };
  store.dispatch("display/updateNotification", notification);
};

const { unTrashedFolders, unTrashedFiles } = toRefs(state);
</script>
