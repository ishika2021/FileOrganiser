<template>
  <div class="base-wrapper" @click="handleBoardClick" ref="scrollContainer">
    <ActionMenu />
    <div class="folder-container">
      <div v-for="(folder, index) in folders" :key="index">
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
          @save-folder="folderAction"
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
          />
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
import { addDataToDB } from "@/utils/functionUtils/indexedDB";
import { useSelectable } from "@/composables/useSelectable";

defineProps({
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
});
const store = useStore();
const selected = ref(null);
const currentFolderList = ref([]);

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
  store.dispatch("breadcrumbs/addBreadcrumb", obj);
  store.dispatch("data/updateSelectedFolder", folder.id);
  await addDataToDB("currentFolderID", folder.id);
};

const handleSelectedFolder = (selectedItemIDs) => {
  if (!selectedItemIDs.length) {
    handleActionMenuVisibility(false);
  }
  const payload = {
    parentID: selectedFolder.value.id,
    selectedItemID: selectedItemIDs,
  };
  store.dispatch("actions/updateSelectedItem", payload);
};

const handleActionMenuVisibility = (state) => {
  store.dispatch("actions/updateActionMenuVisibility", state);
};

const handleBoardClick = (e) => {
  e.stopPropagation();
  store.dispatch("actions/updateLastActiveFolder", null);
};

watch(
  selectedFolder,
  (val) => {
    currentFolderList.value = val.children;

    // load the composable for drag-select on change of currentFolderList
    useSelectable(
      handleSelectedFolder,
      currentFolderList,
      handleActionMenuVisibility
    );
  },
  { deep: true, immediate: true }
);
</script>
