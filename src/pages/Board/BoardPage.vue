<template>
  <div class="board">
    <div v-for="(folder, index) in folders" :key="index">
      <Folder :name="folder.name" />
    </div>
    <div>
      <Folder
        v-if="newFolder"
        :isEdit="false"
        :autoFocus="true"
        name="New Folder"
        @save-folder="saveFolder"
      />
    </div>
  </div>
</template>

<script>
import Folder from "../../components/Folder/Folder.vue";
import { mapGetters } from "vuex";
export default {
  name: "BoardPage",
  components: {
    Folder,
  },
  computed: {
    ...mapGetters({
      folders: "folder/folders",
      newFolder: "folder/isNewFolder",
    }),
  },
  methods: {
    saveFolder($data) {
      const obj = {
        name: $data,
        files: [],
      };
      this.$store.dispatch("folder/addFolder", obj);
    },
  },
};
</script>

<style>
@import "./styles.css";
</style>
