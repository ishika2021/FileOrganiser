<template>
  <div class="file" @click="action($event, id)">
    <img
      v-if="type === 'image'"
      :src="imageSource"
      alt="file"
      class="image-icon"
    />
    <Icon v-else :name="type" class="file-icon" />
    <input class="input" :value="title" :disabled="!isEdit" ref="focusInput" />
  </div>
</template>

<script setup>
import { computed, defineProps, reactive, toRefs } from "vue";
import Icon from "@/components/Icon";
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
  title: computed(() => {
    return props.file.name;
  }),
});

const { id, type, imageSource, title } = toRefs(state);
</script>
