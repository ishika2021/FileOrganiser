<template>
  <div
    class="base-wrapper"
    v-drag-select="{ getSelectedItems: handleSelectedFolder }"
    @click="handleBoardClick"
    ref="scrollContainer"
  >
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
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import ActionMenu from "../../components/ActionMenu";
import Folder from "@/containers/Folder";
import ImageFile from "@/components/ImageFile/ImageFile.vue";
import { computed, ref } from "vue";
import { transformDuplicateFolderName } from "@/utils/functionUtils/folderHelpers.js";
import { v4 as uuidv4 } from "uuid";
const store = useStore();
const actionMenu = ref([
  {
    name: "Copy",
    icon: "copy",
    action: () => {},
  },
  {
    name: "Cut",
    icon: "cut",
    action: () => {},
  },
  {
    name: "Paste",
    icon: "paste",
    action: () => {},
  },
  {
    name: "Rename",
    icon: "rename",
    action: () => {},
  },
  {
    name: "Delete",
    icon: "delete",
    action: () => {},
  },
]);
const selected = ref(null);

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

const handleFolderDoubleClick = ($event, folder) => {
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
  localStorage.setItem("selectedFolder", folder.id);
};

const handleSelectedFolder = (selectedFolderIds) => {
  console.log("SELECTED_FILES:", selectedFolderIds);
};
const handleBoardClick = (e) => {
  e.stopPropagation();
  store.dispatch("header/updateLastActiveFolder", null);
};
</script>
