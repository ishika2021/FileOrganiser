<template>
  <div>
    <div class="folder-cover" v-if="isCut || isRenamed"></div>
    <div class="folder">
      <div class="item-action" v-if="isTrashed">
        <Icon
          name="restore"
          class="icon restore"
          tooltip="Restore item"
          @click="emit('item-restored', folder)"
        />
        <Icon
          name="delete"
          class="icon permanent-delete"
          tooltip="Delete Permanently"
          @click="emit('item-trashed-permanently', folder)"
        />
      </div>
      <Icon
        v-if="!isTrashView"
        :name="starredIcon ? 'starred' : 'starred-outline'"
        :color="starredIcon ? '#fdb93e' : ''"
        :class="starredIcon ? 'starred-icon' : 'starred-icon starred-outline'"
        @click="emit('starred-action', props.folder)"
      />
      <Icon
        name="folder-full"
        class="icon"
        @dblclick="doubleClickAction($event, folder)"
      />
      <Input
        v-if="isCreated"
        :modelValue="inputfolderName"
        :isEdit="isCreated"
        @update:modelValue="handleFolderSave"
      />
      <Input
        v-else
        :modelValue="folder.name"
        :isEdit="isRenamed"
        @update:modelValue="handleFolderRename"
      />
    </div>
  </div>
</template>
<script setup>
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import {
  computed,
  onMounted,
  ref,
  defineProps,
  defineEmits,
  reactive,
  toRefs,
  watch,
  nextTick,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const emit = defineEmits([
  "save-folder",
  "rename-folder",
  "item-restored",
  "item-trashed-permanently",
  "starred-action",
]);

const props = defineProps({
  folder: {
    type: Object,
    required: true,
    default: () => {},
  },
  singleClickAction: {
    type: Function,
    default: () => {},
    required: true,
  },
  doubleClickAction: {
    type: Function,
    default: () => {},
    required: true,
  },
  isCreated: {
    type: Boolean,
    default: false,
    required: false,
  },
  suggestedName: {
    type: String,
    default: "",
    required: false,
  },
});

const modelValue = ref("");
const inputfolderName = ref(props.suggestedName);
const focusInput = ref(null);
const focusRenameInput = ref(null);
const item = reactive({ isStarred: props.folder?.starred });

const store = useStore();
const route = useRoute();

const state = reactive({
  cutItems: computed(() => store.getters["actions/temporaryCutItems"]),
  renamedItems: computed(() => store.getters["actions/renamedItems"]),
  isCut: computed(() => {
    return state.cutItems?.includes(props.folder?.id);
  }),
  isRenamed: computed(() => {
    if (props.folder) {
      // both become undefined on creating a new folder and make folder-cover visible
      return state.renamedItems?.item === props.folder?.id;
    }
    return false;
  }),
  isTrashed: computed(() => props.folder?.trash),
  isTrashView: computed(() => route.name === "Trash"),
  starredIcon: computed(() => item.isStarred),
});

const handleFolderRename = ($value) => {
  emit("rename-folder", { name: $value, folder: props.folder });
};

const handleFolderSave = ($value) => {
  emit("save-folder", $value);
};

onMounted(() => {
  nextTick(() => {
    if (focusInput.value) {
      focusInput.value.focus();
    }
  });
  if (props.folder) {
    modelValue.value = props.folder.name;
  }
});

watch(
  () => state.isRenamed,
  () => {
    nextTick(() => {
      if (focusRenameInput.value) {
        focusRenameInput.value.focus();
      }
    });
  }
);

watch(
  () => props.folder?.starred,
  (newVal) => {
    item.isStarred = newVal;
  },
  { immediate: true }
);

const { isCut, isRenamed, starredIcon, isTrashView, isTrashed } = toRefs(state);
</script>
