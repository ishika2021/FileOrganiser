<template>
  <div class="action-menu">
    <Icon
      v-for="(menu, index) in actionMenu"
      :key="index"
      :name="menu.icon"
      class="icon"
      @click="menu.action"
      :class="menu.isActive ? '' : 'blur'"
      :tooltip="menu.tooltip"
    >
    </Icon>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Icon from "@/components/Icon";
import { ActionStore } from "@/database";
import { getMenuItemState, handleActionMenu } from "./utils/functionHelpers";

const store = useStore();
const route = useRoute();

const state = reactive({
  selectedItems: computed(() => store.getters["actions/selectedItems"]),
  menuVisibilityStatus: computed(
    () => store.getters["actions/actionMenuVisibility"]
  ),
  copiedObject: computed(() => store.getters["actions/copiedItems"]),
  cutObject: computed(() => store.getters["actions/cutItems"]),
  currentFolder: computed(() => store.getters["data/currentFolder"]),
  currentView: computed(() => route.name),
});

const { updateCut, updateCopy } = ActionStore;
const showActionMenu = ref(false);

const trash = () => {
  const isActive = getMenuItemState(actionMenu.value, "Delete");

  if (isActive) {
    const payload = {
      parentID: state.currentFolder.id,
      toBeDeleted: state.selectedItems,
    };

    store.dispatch("actions/moveToTrash", payload);
    store.dispatch(
      "starredView/removeDeletedStarredContent",
      state.selectedItems
    ); //Removes the file from starred view and state
    store.dispatch("views/removeDeletedRecentFiles", state.selectedItems); //Removes the file from recent view and state
    showActionMenu.value = false;
    setNotification("Item deleted");
  }
};

const copy = () => {
  const isActive = getMenuItemState(actionMenu.value, "Copy");

  if (isActive) {
    const payload = {
      parentID: state.currentFolder.id,
      items: state.selectedItems,
    };

    updateCopy(payload);
    updateCut(null);
    store.dispatch("actions/updateCutItems", null); //both cut and copy can't have values at the same time
    store.dispatch("actions/updateCopiedItems", payload);
    store.dispatch("actions/updateTemporaryCutItems", []);

    showActionMenu.value = false;
    setNotification("Item copied");
  }
};

const cut = () => {
  const isActive = getMenuItemState(actionMenu.value, "Cut");

  if (isActive) {
    const payload = {
      parentID: state.currentFolder.id,
      items: state.selectedItems,
    };

    updateCopy(null);
    updateCut(payload);
    store.dispatch("actions/updateCopiedItems", null);
    store.dispatch("actions/updateCutItems", payload);
    store.dispatch("actions/updateTemporaryCutItems", state.selectedItems);

    showActionMenu.value = false;
    setNotification("Item cut");
  }
};

const paste = () => {
  const isActive = getMenuItemState(actionMenu.value, "Paste");

  if (isActive) {
    let items = [];
    let operation = "";
    let parentID = null;

    const copy = state.copiedObject;
    const cut = state.cutObject;

    if (copy) {
      items = copy.items;
      parentID = copy.parentID;
      operation = "copy";
    } else if (cut) {
      items = cut.items;
      parentID = cut.parentID;
      operation = "cut";
      updateCut(null);
      store.dispatch("actions/updateCutItems", null);
      store.dispatch("actions/updateTemporaryCutItems", []);
    }

    if (items.length) {
      const payload = {
        items: items,
        operation: operation,
        parentID: parentID,
      };

      store.dispatch("actions/pasteItems", payload);
      showActionMenu.value = false;
      setNotification("Item pasted");
    }
  }
};

const rename = () => {
  const isActive = getMenuItemState(actionMenu.value, "Rename");

  if (isActive) {
    if (state.selectedItems.length <= 1) {
      const payload = {
        parentID: state.currentFolder.id,
        item: state.selectedItems[0],
      };

      store.dispatch("actions/updateRenamedItems", payload);
    } else {
      setNotification("Multiple items can't be renamed together", "error");
    }
  }
};

const handleActionMenuVisibility = () => {
  const menu = actionMenu.value;
  const isCutCopy = state.copiedObject || state.cutObject ? true : false;
  handleActionMenu(menu, showActionMenu.value, isCutCopy, state.currentView);
};

const setNotification = (message, type = "default") => {
  const notification = {
    type: type,
    message: message,
  };
  store.dispatch("display/updateNotification", notification);
};

onMounted(() => {
  showActionMenu.value = state.menuVisibilityStatus;
  handleActionMenuVisibility(); //Show menu visibility according to views
});

watch(
  () => state.currentFolder,
  () => {
    handleActionMenuVisibility();
    store.dispatch("actions/updateTemporaryCutItems", []);
  },
  { deep: true }
);

watch(
  () => state.menuVisibilityStatus,
  () => {
    showActionMenu.value = state.menuVisibilityStatus;
  },
  { deep: true }
);

watch(showActionMenu, () => {
  handleActionMenuVisibility();
});

const actionMenu = ref([
  {
    name: "Copy",
    icon: "copy",
    action: copy,
    isActive: false,
    tooltip: "Copy",
  },
  {
    name: "Cut",
    icon: "cut",
    action: cut,
    isActive: false,
    tooltip: "Cut",
  },
  {
    name: "Paste",
    icon: "paste",
    action: paste,
    isActive: false,
    tooltip: "Paste",
  },
  {
    name: "Rename",
    icon: "rename",
    action: rename,
    isActive: false,
    tooltip: "Rename",
  },
  {
    name: "Delete",
    icon: "delete",
    action: trash,
    isActive: false,
    tooltip: "Delete",
  },
]);
</script>
