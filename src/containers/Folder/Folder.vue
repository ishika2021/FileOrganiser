<template>
  <div v-bind="$attrs">
    <div class="folder-cover" v-if="isCut || isRenamed"></div>
    <div class="folder">
      <Icon
        name="folder-full"
        class="icon"
        @dblclick="doubleClickAction($event, properties)"
      />
      <input
        v-if="isCreated"
        class="input"
        v-model="modelValue"
        ref="focusInput"
        @keyup.enter="this.$emit('save-folder', modelValue)"
      />
      <input
        v-else
        class="input"
        :class="isRenamed ? 'rename-input' : ''"
        v-model="modelValue"
        :disabled="!isRenamed"
        ref="focusInput"
        @keyup.enter="
          this.$emit('rename-folder', { name: modelValue, folder: properties })
        "
      />
    </div>
  </div>
</template>
<script setup>
import Icon from "@/components/Icon";
import { computed, onMounted, ref, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
const props = defineProps({
  properties: {
    type: Object,
    required: true,
    default: () => {},
  },
  isEdit: {
    type: Boolean,
    default: true,
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
});
defineEmits(["save-folder", "rename-folder"]);
const modelValue = ref("");
const focusInput = ref(null);

const store = useStore();
const cutItems = computed(() => store.getters["actions/temporaryCutItems"]);
const renamedItems = computed(() => store.getters["actions/renamedItems"]);
const isCut = computed(() => {
  if (cutItems.value?.includes(props.properties?.id)) {
    return true;
  }
  return false;
});
const isRenamed = computed(() => {
  if (renamedItems.value?.item === props.properties?.id) {
    return true;
  }
  return false;
});
onMounted(() => {
  focusInput.value.focus();
  if (props.properties) {
    modelValue.value = props.properties.name;
  }
});
</script>
