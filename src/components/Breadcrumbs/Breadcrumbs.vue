<template>
  <span v-if="title !== 'Home'"> > </span>
  <li>
    <span @click="action(title)">
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
    action: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
  computed: {
    icon() {
      return this.title === "Home" ? "mdi-home" : "mdi-folder";
    },
  },
};
</script>
