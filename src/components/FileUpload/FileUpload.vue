<template>
  <div class="file-upload">
    <MenuItem icon="folder" :isDropdown="true">
      <template v-slot:label>
        <label for="file-upload">
          {{ title }}
        </label>
        <input
          type="file"
          id="file-upload"
          multiple
          @change="handleChange($event)"
        />
      </template>
    </MenuItem>
  </div>
</template>

<script>
import { fileConverter } from "../../utils/functionUtils/fileHelpers.js";
import MenuItem from "@/components/MenuItem";
import { mapGetters } from "vuex";

export default {
  name: "FileUpload",
  components: {
    MenuItem,
  },
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      selectedFiles: "data/selectedFiles",
      currentFolder: "data/currentFolder",
    }),
  },
  methods: {
    async handleChange(e) {
      const files = e.target.files;
      const convertedFiles = await fileConverter(
        files,
        this.selectedFiles,
        this.currentFolder.id
      );
      this.$store.dispatch("data/addNewFiles", convertedFiles);
    },
  },
};
</script>
