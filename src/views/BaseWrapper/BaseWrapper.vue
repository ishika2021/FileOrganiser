<template>
  <div class="base-wrapper">
    <div class="action-menu-container">
      <ActionMenu />
    </div>
    <div
      id="mainContainer"
      class="main-conatainer"
      @click="handleBoardClick"
      ref="scrollContainer"
    >
      <div class="folder-container">
        <div v-for="(folder, index) in folders" :key="index">
          <div
            :class="
              lastActiveFolder === folder.id ? 'last-folder-selected' : ''
            "
            :key="folder.id"
          >
            <Folder
              :folder="folder"
              :doubleClickAction="handleFolderDoubleClick"
              class="selectable"
              :data-id="folder.id"
              @rename-folder="renameFolder"
            />
          </div>
        </div>
        <div v-if="newFolder">
          <Folder
            :isCreated="true"
            @save-folder="folderAction"
            :suggestedName="suggestedName"
          />
        </div>
        <div v-for="(file, index) in files" :key="index">
          <div :class="selected === file.id ? 'folder-selected' : ''">
            <File
              :file="file"
              class="selectable"
              :data-id="file.id"
              :isEdit="false"
              @rename-file="renameFile"
              :doubleClickAction="handleFileDoubleClick"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref, watch, defineProps } from "vue";

import ActionMenu from "@/containers/ActionMenu";
import Folder from "@/containers/Folder";
import File from "@/containers/File";
import { useSelectable } from "@/composables/useSelectable";
import { ConstantStore } from "@/database";
import { getRecentFilePayload } from "./utils/helperFunctions";

const props = defineProps({
  folders: {
    type: Array,
    default: () => [],
    required: false,
  },
  files: {
    type: Array,
    default: () => [],
    required: false,
  },
  folderAction: {
    type: Function,
    default: () => {},
    required: false,
  },
  fileAction: {
    type: Function,
    default: () => {},
    required: false,
  },
  renameFolder: {
    type: Function,
    default: () => {},
    required: false,
  },
  renameFile: {
    type: Function,
    default: () => {},
    required: false,
  },
  getFolderNamesuggestion: {
    type: Function,
    default: () => {},
    required: false,
  },
});
const store = useStore();
const route = useRoute();
const selected = ref(null);
const suggestedName = ref("");

const newFolder = computed(() => store.getters["data/isNewFolder"]);
const breadcrumbs = computed(() => store.getters["breadcrumbs/breadcrumbs"]);
const currentFolder = computed(() => store.getters["data/currentFolder"]);
const lastActiveFolder = computed(
  () => store.getters["actions/lastActiveFolder"]
);

const handleFolderDoubleClick = async ($event, folder) => {
  $event.stopPropagation();
  const page = route.name.toLowerCase();
  const breadcrumb = breadcrumbs.value[page];
  const lastTitlePath = breadcrumb[breadcrumb.length - 1].path;
  const path =
    lastTitlePath === "/"
      ? "/" + folder.name
      : lastTitlePath + "/" + folder.name;
  const obj = {
    title: folder.name,
    path: path,
    id: folder.id,
  };

  const payload = {
    page: route.name.toLowerCase(),
    breadcrumb: obj,
  };

  await ConstantStore.updateCurrentFolder(folder.id);
  store.dispatch("breadcrumbs/addBreadcrumb", payload);
  store.dispatch("data/updateCurrentFolder", folder.id);
};

const handleSelectedFolder = (selectedItemIDs) => {
  if (!selectedItemIDs.length) {
    handleActionMenuVisibility(false);
    return;
  }

  store.dispatch("actions/updateSelectedItem", selectedItemIDs);
};

const handleActionMenuVisibility = (state) => {
  store.dispatch("actions/updateActionMenuVisibility", state);
};

const handleBoardClick = (e) => {
  e.stopPropagation();
  store.dispatch("actions/updateLastActiveFolder", null);
  store.dispatch("actions/updateRenamedItems", {}); //disables rename input
  store.dispatch("data/addNewFolder", false); //removes the new unsaved folder
};

const handleFileDoubleClick = ($event, file) => {
  // Add file to recent files
  $event.stopPropagation();
  const updatedFile = getRecentFilePayload(file);
  store.dispatch("views/addToRecent", updatedFile);
};

watch(
  currentFolder,
  () => {
    // load the composable for drag-select on change of currentFolder
    useSelectable(
      handleSelectedFolder,
      currentFolder,
      handleActionMenuVisibility
    );
  },
  { deep: true, immediate: true }
);

watch(newFolder, () => {
  // reflects folder name suggestion on adding a new folder
  const result = props.getFolderNamesuggestion(
    "New Folder",
    currentFolder.value.children
  );
  suggestedName.value = result;
});
</script>
