<template>
  <div>
    <div class="file-cover" v-if="isCut || isRenamed"></div>
    <div class="file" @dblclick="doubleClickAction($event, file)">
      <Icon
        v-if="itemAction"
        :name="itemAction"
        :class="`icon ${itemAction}`"
        @click="handleItemAction($event, itemAction)"
      />
      <img
        v-if="type === 'image'"
        :src="imageSource"
        alt="file"
        class="image-icon"
      />
      <Icon v-else :name="type" class="file-icon" />
      <input
        class="input"
        :class="isRenamed ? 'rename-input' : ''"
        v-model="modelValue"
        :disabled="!isRenamed"
        ref="focusRenameInput"
        @keyup.enter="
          this.$emit('rename-file', { name: modelValue, file: file })
        "
      />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineProps,
  reactive,
  toRefs,
  ref,
  onMounted,
  watch,
  nextTick,
} from "vue";
import Icon from "@/components/Icon";
import { useStore } from "vuex";

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

const store = useStore();

const state = reactive({
  id: computed(() => {
    return props.file.id;
  }),
  type: computed(() => {
    return props.file.type;
  }),
  imageSource: computed(() => {
    return props.file.base64;
  }),
  cutItems: computed(() => store.getters["actions/temporaryCutItems"]),
  isCut: computed(() => {
    return state.cutItems?.includes(state.id);
  }),
  renamedItems: computed(() => store.getters["actions/renamedItems"]),
  isRenamed: computed(() => {
    return state.renamedItems?.item === state.id;
  }),
  itemAction: computed(() => {
    if (props.file.trash) {
      return "restore";
    } else if (props.file.starred) {
      return "starred";
    } else {
      return null;
    }
  }),
});

const handleItemAction = ($event, type) => {
  if (type === "restore") {
    store.dispatch("views/restoreItem", props.file);
  } else if (type === "starred") {
    //  add starred logic
  }
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

const { type, imageSource, isCut, isRenamed, itemAction } = toRefs(state);
</script>
