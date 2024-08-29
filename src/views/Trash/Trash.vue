<template>
  <BaseWrapper :files="trashedItems.files" :folders="trashedItems.folders" />
</template>

<script setup>
import BaseWrapper from "@/views/BaseWrapper";
import { useStore } from "vuex";
import { computed, reactive, toRefs } from "vue";

const store = useStore();

const state = reactive({
  trashedItems: computed(() => store.getters["views/trashedItems"]),
});

const { trashedItems } = toRefs(state);
</script>
