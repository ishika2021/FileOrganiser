<template>
  <div class="file-upload">
    <label for="file-upload">
      <MenuItem icon="file-outline" :isDropdown="true">
        <template v-slot:label>
          <div class="title">
            {{ title }}
            <input
              type="file"
              id="file-upload"
              multiple
              :accept="acceptedFileTypes"
              @change="handleChange($event)"
            />
          </div>
        </template>
      </MenuItem>
    </label>
  </div>
</template>

<script>
import { fileConverter } from "@/utils/functionUtils/fileHelpers";
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
    unTrashedFiles() {
      return this.selectedFiles.filter(({ trash }) => !trash);
    },
    acceptedFileTypes() {
      return ".png,.jpg,.xlsx,.pdf,.txt,.docx";
    },
  },
  methods: {
    async handleChange(e) {
      this.setNotification();
      const files = e.target.files;
      const convertedFiles = await fileConverter(
        files,
        this.unTrashedFiles,
        this.currentFolder.id
      );
      this.$store.dispatch("data/addNewFiles", convertedFiles);
    },

    setNotification() {
      const notification = {
        type: "loading",
        message: "File upload may take time",
      };
      this.$store.dispatch("display/updateNotification", notification);
    },
  },
};
</script>
