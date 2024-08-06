<template>
  <div class="action-menu">
    <Icon
      v-for="(menu, index) in actionMenu"
      :key="index"
      :name="menu.icon"
      class="icon"
      @click="menu.action"
      :class="isActive ? '' : 'blur'"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Icon from "@/components/Icon";

const store = useStore();
const selectedItems = computed(() => store.getters["actions/selectedItems"]);
const isActive = computed(() => store.getters["actions/actionMenuVisibility"]);
const copiedObject = computed(() => store.getters["actions/copiedItems"]);
const cutObject = computed(() => store.getters["actions/cutItems"]);
const currentFolder = computed(() => store.getters["data/currentFolder"]);

const trash = () => {
  const payload = {
    parentID: currentFolder.value.id,
    toBeDeleted: selectedItems.value,
  };

  store.dispatch("actions/moveToTrash", payload);
};

const copy = () => {
  const payload = {
    parentID: currentFolder.value.id,
    items: selectedItems.value,
  };

  store.dispatch("actions/updateCutItems", null); //both cut and copy can't have values at the same time
  store.dispatch("actions/updateCopiedItems", payload);
};

const cut = () => {
  const payload = {
    parentID: currentFolder.value.id,
    items: selectedItems.value,
  };

  store.dispatch("actions/updateCopiedItems", null);
  store.dispatch("actions/updateCutItems", payload);
};

const paste = () => {
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
  }

  if (items.length) {
    const payload = {
      items: items,
      operation: operation,
      parentID: parentID,
    };
    store.dispatch("actions/pasteItems", payload);
  }
};

const actionMenu = ref([
  {
    name: "Copy",
    icon: "copy",
    action: copy,
  },
  {
    name: "Cut",
    icon: "cut",
    action: cut,
  },
  {
    name: "Paste",
    icon: "paste",
    action: paste,
  },
  {
    name: "Rename",
    icon: "rename",
    action: () => {},
  },
  {
    name: "Delete",
    icon: "delete",
    action: trash,
  },
]);
</script>
