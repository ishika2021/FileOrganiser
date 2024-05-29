<template>
  <div>
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn color="purple-lighten-5" :prepend-icon="icon" v-bind="props">
          {{ title }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title v-if="item.isUpload" class="cursor-pointer">
            <FileUpload :title="item.title" />
          </v-list-item-title>
          <v-list-item-title v-else class="cursor-pointer" @click="item.action">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import FileUpload from "../FileUpload/FileUpload.vue";
export default {
  name: "Dropdown",
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
    icon: {
      type: String,
      default: "",
      required: true,
    },
    isUpload: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    FileUpload,
  },
};
</script>

<style>
@import "./styles.css";
</style>
