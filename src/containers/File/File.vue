<template>
  <div>
    <div class="file-cover" v-if="isCut || isRenamed"></div>
    <div class="file" @dblclick="doubleClickAction($event, file)">
      <div class="item-action" v-if="isTrashed">
        <Icon
          name="restore"
          class="icon restore"
          tooltip="Restore item"
          @click="this.$emit('item-restored', file)"
        />
        <Icon
          name="delete"
          class="icon permanent-delete"
          tooltip="Delete Permanently"
          @click="this.$emit('item-trashed-permanently', file)"
        />
      </div>
      <Icon
        v-if="!isTrashView"
        :name="starredIcon ? 'starred' : 'starred-outline'"
        :color="starredIcon ? '#fdb93e' : ''"
        :class="starredIcon ? 'starred-icon' : 'starred-icon starred-outline'"
        @click="this.$emit('starred-action', props.file)"
      />
      <img
        v-if="type === 'image'"
        :src="imageSource"
        alt="file"
        class="image-icon"
      />
      <Icon v-else :name="type" class="file-icon" />
      <Input
        :modelValue="file.name"
        :isEdit="isRenamed"
        @update:modelValue="handleFileRename"
        :fileExtension="file.extension"
      />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineProps,
  defineEmits,
  reactive,
  toRefs,
  ref,
  onMounted,
  watch,
  nextTick,
} from "vue";
import Icon from "@/components/Icon";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Input from "@/components/Input";

const emit = defineEmits([
  "item-restored",
  "item-trashed-permanently",
  "rename-file",
  "starred-action",
]);

const props = defineProps({
  file: {
    type: Object,
    default: () => {},
    required: true,
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
});

const modelValue = ref("");
const focusRenameInput = ref(null);
const item = reactive({ isStarred: props.file?.starred });

const store = useStore();
const route = useRoute();

const state = reactive({
  id: computed(() => {
    return props.file?.id;
  }),
  type: computed(() => {
    return props.file?.type;
  }),
  imageSource: computed(() => {
    return props.file?.base64;
  }),
  cutItems: computed(() => store.getters["actions/temporaryCutItems"]),
  isCut: computed(() => {
    return state.cutItems?.includes(state.id);
  }),
  renamedItems: computed(() => store.getters["actions/renamedItems"]),
  isRenamed: computed(() => {
    return state.renamedItems?.item === state.id;
  }),
  isTrashed: computed(() => props.file?.trash),
  isTrashView: computed(() => route.name === "Trash"),
  starredIcon: computed(() => item.isStarred),
});

const handleFileRename = ($value) => {
  emit("rename-file", { name: $value, file: props.file });
};

onMounted(() => {
  if (props.file) {
    modelValue.value = props.file.name;
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
  () => props.file?.starred,
  (newVal) => {
    item.isStarred = newVal;
  },
  { immediate: true }
);

const {
  type,
  imageSource,
  isCut,
  isRenamed,
  starredIcon,
  isTrashView,
  isTrashed,
} = toRefs(state);
</script>
