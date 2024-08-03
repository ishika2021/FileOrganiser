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
const currentFolder = computed(() => store.getters["data/currentFolder"]);

const deleteItem = () => {
  const payload = {
    parent: currentFolder.value,
    toBeDeleted: selectedItems.value,
  };
  store.dispatch("actions/moveToTrash", payload);
};

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
    action: deleteItem,
  },
]);
</script>
