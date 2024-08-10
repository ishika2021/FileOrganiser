<template>
  <div>
    <div class="folder-cover" v-if="isCut || isRenamed"></div>
    <div class="folder">
      <Icon
        name="folder-full"
        class="icon"
        @dblclick="doubleClickAction($event, folder)"
      />
      <input
        v-if="isCreated"
        class="input"
        v-model="inputfolderName"
        ref="focusInput"
        @keyup.enter="this.$emit('save-folder', inputfolderName)"
      />
      <input
        v-else
        class="input"
        :class="isRenamed ? 'rename-input' : ''"
        v-model="modelValue"
        :disabled="!isRenamed"
        ref="focusRenameInput"
        @keyup.enter="this.$emit('rename-folder', { name: modelValue, folder })"
      />
    </div>
  </div>
</template>
<script setup>
import Icon from "@/components/Icon";
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
import { useStore } from "vuex";
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

defineEmits(["save-folder", "rename-folder"]);

const modelValue = ref("");
const inputfolderName = ref(props.suggestedName);
const focusInput = ref(null);
const focusRenameInput = ref(null);

const store = useStore();

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
});

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

const { isCut, isRenamed } = toRefs(state);
</script>
