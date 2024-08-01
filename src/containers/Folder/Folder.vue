<template>
  <div class="folder" v-bind="$attrs">
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
      :value="name"
      :disabled="isEdit"
      ref="focusInput"
      @keyup.enter="this.$emit('save-folder', name)"
    />
  </div>
</template>
<script setup>
import Icon from "@/components/Icon";
import { computed, onMounted, ref, defineProps, defineEmits } from "vue";
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
defineEmits(["save-folder"]);
const modelValue = ref("");
const focusInput = ref(null);
const name = computed(() => props.properties.name);
onMounted(() => {
  focusInput.value.focus();
  if (props.properties) {
    modelValue.value = props.properties.name;
  }
});
</script>
