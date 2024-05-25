<template>
  <label for="file-upload" class="custom-file-upload">
    {{ title }}
  </label>
  <input type="file" id="file-upload" multiple @change="handleChange($event)" />
</template>

<script>
export default {
  name: "FileUpload",
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    async handleChange(e) {
      const files = e.target.files;
      const fileUploadPromises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileUploadPromises.push(this.toBase64(file));
      }
      const filePaths = await Promise.all(fileUploadPromises);
      this.$store.dispatch("folder/addNewFiles", filePaths);
    },
    toBase64(file) {
      const obj = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModifiedDate,
      };
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          obj["base64"] = reader.result;
          resolve(obj);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    },
  },
};
</script>

<style>
@import "./styles.css";
</style>
