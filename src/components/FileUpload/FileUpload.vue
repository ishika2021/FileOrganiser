<template>
  <label for="file-upload" class="custom-file-upload">
    {{ title }}
  </label>
  <input type="file" id="file-upload" multiple @change="handleChange($event)" />
</template>

<script>
import { fileConverter } from "../../utils/functionUtils/fileHelpers.js";
import { mapGetters } from "vuex";

export default {
  name: "FileUpload",
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      selectedFiles: "folder/selectedFiles",
    }),
  },
  methods: {
    async handleChange(e) {
      const files = e.target.files;
      const convertedFiles = await fileConverter(files, this.selectedFiles);
      this.$store.dispatch("folder/addNewFiles", convertedFiles);
    },
  },
};
</script>

<style>
@import "./styles.css";
</style>
