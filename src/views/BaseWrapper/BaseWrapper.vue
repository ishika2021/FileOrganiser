<template>
  <div class="base-wrapper" @click="handleBoardClick" ref="scrollContainer">
    <ActionMenu :menu="actionMenu" />
    <div class="folder-container">
      <div v-for="(folder, index) in currentSubFolders" :key="index">
        <div
          :class="lastActiveFolder === folder.id ? 'last-folder-selected' : ''"
          :key="folder.id"
        >
          <Folder
            :properties="folder"
            :singleClickAction="handleItemSelected"
            :doubleClickAction="handleFolderDoubleClick"
            class="selectable"
            :data-id="folder.id"
          />
        </div>
      </div>
      <div v-if="newFolder">
        <Folder
          :isEdit="false"
          :autoFocus="true"
          name="New Folder"
          :isCreated="true"
          @save-folder="saveFolder"
        />
      </div>
      <div v-for="(file, index) in selectedFiles" :key="index">
        <div :class="selected === file.id ? 'folder-selected' : ''">
          <File
            :file="file"
            :action="handleItemSelected"
            class="selectable"
            :data-id="file.id"
            :isEdit="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import ActionMenu from "../../components/ActionMenu";
import Folder from "@/containers/Folder";
import File from "@/containers/File";
import { computed, ref, watch } from "vue";
import { transformDuplicateFolderName } from "@/utils/functionUtils/folderHelpers.js";
import { v4 as uuidv4 } from "uuid";
import { addDataToDB } from "@/utils/functionUtils/indexedDB";
import { useSelectable } from "@/composables/useSelectable";
import { menu } from "./utils/menu";
const store = useStore();
const actionMenu = ref(menu);
const selected = ref(null);
const currentFolderList = ref([]);

const newFolder = computed(() => store.getters["data/isNewFolder"]);
const breadcrumbs = computed(() => store.getters["breadcrumbs/breadcrumbs"]);
const selectedFolder = computed(() => store.getters["data/currentFolder"]);
const selectedFiles = computed(() => store.getters["data/selectedFiles"]);
const lastActiveFolder = computed(
  () => store.getters["header/lastActiveFolder"]
);
const currentSubFolders = computed(() => selectedFolder.value.children);

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

const handleFolderDoubleClick = async ($event, folder) => {
  $event.stopPropagation();
  const lastTitlePath = breadcrumbs.value[breadcrumbs.value.length - 1].path;
  const path =
    lastTitlePath === "/"
      ? "/" + folder.name
      : lastTitlePath + "/" + folder.name;
  const obj = {
    title: folder.name,
    path: path,
    id: folder.id,
  };
  store.dispatch("breadcrumbs/addBreadcrumb", obj);
  store.dispatch("data/updateSelectedFolder", folder.id);
  await addDataToDB("currentFolderID", folder.id);
};

const handleSelectedFolder = (selectedFolderIds) => {
  console.log("SELECTED_FILES:", selectedFolderIds);
};

const handleBoardClick = (e) => {
  e.stopPropagation();
  store.dispatch("header/updateLastActiveFolder", null);
};

const handleItemSelected = ($event) => {
  $event.stopPropagation();
};

watch(
  selectedFolder,
  (val) => {
    currentFolderList.value = val.children;

    // load the composable for drag-select on change of currentFolderList
    useSelectable(handleSelectedFolder, currentFolderList);
  },
  { deep: true, immediate: true }
);
</script>
