<template>
  <span v-if="title !== 'Home'"> > </span>
  <li>
    <span>
      <v-icon :icon="icon"></v-icon>
      <span>{{ title }}</span>
    </span>
  </li>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
  computed: {
    icon() {
      return this.title === "Home" ? "mdi-home" : "mdi-folder";
    },
  },
};
</script>
