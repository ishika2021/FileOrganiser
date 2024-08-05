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
const copiedItems = computed(() => store.getters["actions/copiedItems"]);
const cutItems = computed(() => store.getters["actions/cutItems"]);

const trash = () => {
  const { parentID, selectedItemID } = selectedItems.value;
  const payload = {
    parent: parentID,
    toBeDeleted: selectedItemID,
  };
  store.dispatch("actions/moveToTrash", payload);
};

const copy = () => {
  const { selectedItemID } = selectedItems.value;
  store.dispatch("actions/updateCutItems", []);
  store.dispatch("actions/updateCopiedItems", selectedItemID);
};

const cut = () => {
  const { selectedItemID } = selectedItems.value;
  store.dispatch("actions/updateCopiedItems", []);
  store.dispatch("actions/updateCutItems", selectedItemID);
};

const paste = () => {
  let items, operation;
  const { parentID } = selectedItems.value;

  if (copiedItems.value.length) {
    items = copiedItems.value;
    operation = "copy";
  } else if (cutItems.value.length) {
    items = cutItems.value;
    operation = "cut";
  } else {
    items = [];
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
