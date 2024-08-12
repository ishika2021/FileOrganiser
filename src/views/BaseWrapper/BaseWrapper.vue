<template>
  <div class="base-wrapper">
    <ActionMenu />
    <div id="mainContainer" @click="handleBoardClick" ref="scrollContainer">
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
              :singleClickAction="fileAction"
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
              :action="fileAction"
              class="selectable"
              :data-id="file.id"
              :isEdit="false"
              @rename-file="renameFile"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, watch, defineProps } from "vue";

import ActionMenu from "@/containers/ActionMenu";
import Folder from "@/containers/Folder";
import File from "@/containers/File";
import { useSelectable } from "@/composables/useSelectable";
import { ConstantStore } from "@/database";

const props = defineProps({
  folders: {
    type: Array,
    default: () => [],
    required: true,
  },
  files: {
    type: Array,
    default: () => [],
    required: true,
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
const selected = ref(null);
const suggestedName = ref("");

const newFolder = computed(() => store.getters["data/isNewFolder"]);
const breadcrumbs = computed(() => store.getters["breadcrumbs/breadcrumbs"]);
const selectedFolder = computed(() => store.getters["data/currentFolder"]);
const lastActiveFolder = computed(
  () => store.getters["actions/lastActiveFolder"]
);

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

  await ConstantStore.updateCurrentFolder(folder.id);
  store.dispatch("breadcrumbs/addBreadcrumb", obj);
  store.dispatch("data/updateSelectedFolder", folder.id);
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
  store.dispatch("actions/updateRenamedItems", {}); //to disable rename input
};

watch(
  selectedFolder,
  () => {
    // load the composable for drag-select on change of currentFolder
    useSelectable(
      handleSelectedFolder,
      selectedFolder,
      handleActionMenuVisibility
    );
  },
  { deep: true, immediate: true }
);

watch(newFolder, () => {
  // To show folder name suggestion on adding a new folder
  const result = props.getFolderNamesuggestion(
    "New Folder",
    selectedFolder.value.children
  );
  suggestedName.value = result;
});
</script>
