<template>
  <ul class="breadcrumb">
    <li>
      <span>
        <v-icon :icon="icon"></v-icon>
        <span>{{ title }}</span>
      </span>
    </li>
  </ul>
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
