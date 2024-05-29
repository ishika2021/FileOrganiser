<template>
  <span v-if="breadcrumb.title !== 'Home'"> > </span>
  <li>
    <span @click="action(breadcrumb)">
      <v-icon :icon="icon"></v-icon>
      <span>{{ breadcrumb.title }}</span>
    </span>
  </li>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    breadcrumb: {
      type: Object,
      required: true,
      default: () => {},
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
