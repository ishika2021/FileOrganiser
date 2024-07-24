<template>File</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  file: {
    type: Object,
    default: () => {},
    required: true,
  },
  action: {
    type: Function,
    default: () => {},
    required: true,
  },
});
</script>
