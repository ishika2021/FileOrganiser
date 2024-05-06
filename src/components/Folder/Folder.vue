<template>
  <div class="folder">
    <v-icon icon="mdi-folder" size="100" @click="action(folderDetails)" />
    <input
      v-if="isCreated"
      class="input"
      v-model="modelValue"
      :disabled="isEdit"
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

<script>
export default {
  name: "Folder",
  props: {
    folderDetails: {
      type: Object,
      required: true,
      default: () => {},
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
    action: {
      type: Function,
      default: () => {},
      required: true,
    },
    isCreated: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      modelValue: "",
    };
  },
  mounted() {
    this.$refs.focusInput.focus();
    if (this.folderDetails) {
      this.modelValue = this.folderDetails.name;
    }
  },
  computed: {
    name() {
      return this.folderDetails?.name;
    },
  },
};
</script>

<style>
@import "./Folder.css";
</style>
