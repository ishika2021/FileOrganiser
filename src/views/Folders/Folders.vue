<template>
  <BaseWrapper
    :folders="unTrashedFolders"
    :files="unTrashedFiles"
    :folder-action="saveFolder"
    :file-action="handleItemSelected"
  />
</template>

<script setup>
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { computed } from "vue";
import { generateUniqueFolderName } from "@/utils/functionUtils/folderHelpers.js";

import BaseWrapper from "../BaseWrapper";

const store = useStore();
const selectedFolder = computed(() => store.getters["data/currentFolder"]);
const selectedFiles = computed(() => store.getters["data/selectedFiles"]);
const breadcrumbs = computed(() => store.getters["breadcrumbs/breadcrumbs"]);

//returns only the folders/files which aren't trashed
const unTrashedFolders = computed(() => {
  return selectedFolder.value.children.filter(({ trash }) => !trash);
});
const unTrashedFiles = computed(() => {
  return selectedFiles.value.filter(({ trash }) => !trash);
});

const saveFolder = ($name) => {
  const name = $name.length > 0 ? $name : "New Folder";
  const allSubFolderNames = selectedFolder.value.children
    .filter(({ trash }) => !trash)
    .map((folder) => folder.name);
  const folderName = generateUniqueFolderName(name, allSubFolderNames);

  const obj = {
    id: "D-" + uuidv4(),
    name: folderName,
    children: [],
    files: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    starred: false,
    trash: false,
    parentID: selectedFolder.value.id,
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
