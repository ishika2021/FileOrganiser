<template>
  <BaseWrapper
    :folders="updatedFolders"
    :files="updatedFiles"
    :folder-action="saveFolder"
    :file-action="handleItemSelected"
  />
</template>

<script setup>
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { computed } from "vue";
import { transformDuplicateFolderName } from "@/utils/functionUtils/folderHelpers.js";

import BaseWrapper from "../BaseWrapper";

const store = useStore();
const selectedFolder = computed(() => store.getters["data/currentFolder"]);
const selectedFiles = computed(() => store.getters["data/selectedFiles"]);
const breadcrumbs = computed(() => store.getters["breadcrumbs/breadcrumbs"]);

//returns only the folders/files which aren't trashed
const updatedFolders = computed(() => {
  return selectedFolder.value.children.filter(({ trash }) => !trash);
});
const updatedFiles = computed(() => {
  return selectedFiles.value.filter(({ trash }) => !trash);
});

const saveFolder = ($name) => {
  const name = $name.length > 0 ? $name : "New Folder";
  const selectedFolderObj = selectedFolder.value || {};

  const folderName = transformDuplicateFolderName(name, selectedFolderObj);
  const obj = {
    id: "D-" + uuidv4(),
    name: folderName,
    children: [],
    files: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    starred: false,
    trash: false,
    parentID: selectedFolderObj.id,
  };

  if (breadcrumbs.value.length <= 1) {
    const payload = {
      folder: obj,
      parent: "root",
    };
    store.dispatch("data/addFolder", payload);
    store.dispatch("data/updateSelectedFolder", "root");
  } else {
    const id = breadcrumbs.value[breadcrumbs.value.length - 1].id;
    const payload = {
      folder: obj,
      parent: id,
    };
    store.dispatch("data/addFolder", payload);
    store.dispatch("data/updateSelectedFolder", id);
  }
};

const handleItemSelected = ($event) => {
  $event.stopPropagation();
};
</script>
