<template>
  <div class="action-menu">
    <Icon
      v-for="(menu, index) in actionMenu"
      :key="index"
      :name="menu.icon"
      class="icon"
      @click="menu.action"
      :class="menu.isActive ? '' : 'blur'"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import Icon from "@/components/Icon";
import { ActionStore } from "@/database";

const store = useStore();
const selectedItems = computed(() => store.getters["actions/selectedItems"]);
const isActive = computed(() => store.getters["actions/actionMenuVisibility"]);
const copiedObject = computed(() => store.getters["actions/copiedItems"]);
const cutObject = computed(() => store.getters["actions/cutItems"]);
const currentFolder = computed(() => store.getters["data/currentFolder"]);

const { updateCut, updateCopy } = ActionStore;
const showActionMenu = ref(false);

const trash = () => {
  const state = actionMenu.value.find(({ name }) => name === "Delete");
  if (state.isActive) {
    const payload = {
      parentID: currentFolder.value.id,
      toBeDeleted: selectedItems.value,
    };

    store.dispatch("actions/moveToTrash", payload);
    showActionMenu.value = false;
  }
};

const copy = () => {
  const state = actionMenu.value.find(({ name }) => name === "Copy");
  if (state.isActive) {
    const payload = {
      parentID: currentFolder.value.id,
      items: selectedItems.value,
    };
    updateCopy(payload);
    updateCut(null);
    store.dispatch("actions/updateCutItems", null); //both cut and copy can't have values at the same time
    store.dispatch("actions/updateCopiedItems", payload);
    store.dispatch("actions/updateTemporaryCutItems", []);

    showActionMenu.value = false;
  }
};

const cut = () => {
  const state = actionMenu.value.find(({ name }) => name === "Cut");
  if (state.isActive) {
    const payload = {
      parentID: currentFolder.value.id,
      items: selectedItems.value,
    };
    updateCopy(null);
    updateCut(payload);
    store.dispatch("actions/updateCopiedItems", null);
    store.dispatch("actions/updateCutItems", payload);
    store.dispatch("actions/updateTemporaryCutItems", selectedItems.value);
    showActionMenu.value = false;
  }
};

const paste = () => {
  const state = actionMenu.value.find(({ name }) => name === "Paste");
  if (state.isActive) {
    let items = [];
    let operation = "";
    let parentID = null;

    if (copiedObject.value) {
      items = copiedObject.value.items;
      parentID = copiedObject.value.parentID;
      operation = "copy";
    } else if (cutObject.value) {
      items = cutObject.value.items;
      parentID = cutObject.value.parentID;
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
    }
  }
};

const handleActionMenuVisibility = () => {
  const menu = actionMenu.value;
  if (showActionMenu.value) {
    menu.map((menuItem) => {
      if (menuItem.name === "Paste") {
        menuItem.isActive = false;
      } else {
        menuItem.isActive = true;
      }
    });
  } else if (copiedObject.value || cutObject.value) {
    menu.map((menuItem) => {
      if (menuItem.name === "Paste") {
        menuItem.isActive = true;
      } else {
        menuItem.isActive = false;
      }
    });
  } else {
    menu.map((menuItem) => (menuItem.isActive = false));
  }
};

onMounted(() => {
  showActionMenu.value = isActive.value;
});

watch(
  currentFolder,
  () => {
    handleActionMenuVisibility();
    store.dispatch("actions/updateTemporaryCutItems", []);
  },
  { deep: true }
);

watch(
  isActive,
  () => {
    showActionMenu.value = isActive.value;
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
  },
  {
    name: "Cut",
    icon: "cut",
    action: cut,
    isActive: false,
  },
  {
    name: "Paste",
    icon: "paste",
    action: paste,
    isActive: false,
  },
  {
    name: "Rename",
    icon: "rename",
    action: () => {},
    isActive: false,
  },
  {
    name: "Delete",
    icon: "delete",
    action: trash,
    isActive: false,
  },
]);
</script>
