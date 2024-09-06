<template>
  <BaseWrapper
    :files="starredItems.files"
    :folders="starredItems.folders"
    @folder-double-click="handleFolderClick"
  />
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

import BaseWrapper from "@/views/BaseWrapper";
import { getNewBreadcrumb } from "@/utils/functionUtils/breadcrumbHelpers";

const route = useRoute();
const store = useStore();

const state = reactive({
  starredItems: computed(() => store.getters["starredView/starredItems"]),
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
  store.dispatch("starredView/updateStarredContent", id);
};

const { starredItems } = toRefs(state);
</script>
