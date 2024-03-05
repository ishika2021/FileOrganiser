<template>
  <div class="folder">
    <v-icon icon="mdi-folder" size="100" />
    <input
      class="input"
      v-model="modelValue"
      :disabled="isEdit"
      ref="focusInput"
      @keyup.enter="this.$emit('save-folder', modelValue)"
    />
  </div>
</template>

<script>
export default {
  name: "Folder",
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      modelValue: "",
    };
  },
  mounted() {
    this.$refs.focusInput.focus();
    this.modelValue = this.name;
  },
};
</script>

<style>
@import "./Folder.css";
</style>
