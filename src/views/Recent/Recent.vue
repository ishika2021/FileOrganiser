<template>
  <BaseWrapper :files="recentFiles" />
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, toRefs } from "vue";

import BaseWrapper from "@/views/BaseWrapper";

const store = useStore();

const state = reactive({
  recentFiles: computed(() => store.getters["views/recentFiles"]),
});

const { recentFiles } = toRefs(state);
</script>
