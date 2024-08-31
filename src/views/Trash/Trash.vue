<template>
  <BaseWrapper
    :files="trashedItems.files"
    :folders="trashedItems.folders"
    @folder-double-click="handleFolderClick"
  />
</template>

<script setup>
import BaseWrapper from "@/views/BaseWrapper";
import { useStore } from "vuex";
import { computed, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getNewBreadcrumb } from "@/utils/functionUtils/breadcrumbHelpers";

const store = useStore();
const route = useRoute();

const state = reactive({
  trashedItems: computed(() => store.getters["views/trashedItems"]),
  breadcrumbs: computed(() => {
    const breadcrumbs = store.getters["breadcrumbs/breadcrumbs"];
    const page = route.name.toLowerCase();
    return breadcrumbs[page];
  }),
});

const handleFolderClick = ($folder) => {
  const id = $folder.id;
  const payload = getNewBreadcrumb(state.breadcrumbs, $folder, route.name);

  store.dispatch("breadcrumbs/addBreadcrumb", payload);
  store.dispatch("views/updateTrashedContent", id);
};

const { trashedItems } = toRefs(state);
</script>
