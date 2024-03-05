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
          <v-list-item-title class="cursor-pointer" @click="item.action">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    items: {
      type: Array,
      defalut: () => [],
      required: true,
    },
    title: {
      type: String,
      defalut: "",
      required: true,
    },
    icon: {
      type: String,
      defalut: "",
      required: true,
    },
  },
};
</script>

<style>
@import "./styles.css";
</style>
