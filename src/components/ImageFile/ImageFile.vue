<template>
  <div class="image-icon-wrapper">
    <div class="image-icon">
      <img :src="imageSource" alt="file" height="100%" width="100%" />
      <input class="input" :value="title" :disabled="isEdit" ref="focusInput" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageFile",
  props: {
    file: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    imageSource() {
      return this.file.base64;
    },
    title() {
      return this.file.name;
    },
  },
};
</script>

<style>
@import "./styles.css";
</style>
