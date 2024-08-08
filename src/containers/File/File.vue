<template>
  <div>
    <div class="file-cover" v-if="isCut"></div>
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
        :value="title"
        :disabled="!isEdit"
        ref="focusInput"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, reactive, toRefs } from "vue";
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
  title: computed(() => {
    return props.file.name;
  }),
  cutItems: computed(() => store.getters["actions/temporaryCutItems"]),
  isCut: computed(() => {
    if (state.cutItems?.includes(state.id)) {
      return true;
    }
    return false;
  }),
});

const { id, type, imageSource, title, isCut } = toRefs(state);
</script>
