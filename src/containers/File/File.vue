<template>
  <div>
    <div class="file-cover" v-if="isCut || isRenamed"></div>
    <div class="file" @click="action($event, id)">
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
  action: {
    type: Function,
    default: () => {},
    required: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
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
});

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

const { id, type, imageSource, isCut, isRenamed } = toRefs(state);
</script>
