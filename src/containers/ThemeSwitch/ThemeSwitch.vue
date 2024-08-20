<template>
  <div class="theme-switch" @click="handleThemeChange">
    <Icon v-if="theme === 'dark'" name="dark" tooltip="Dark Mode" />
    <Icon v-else name="light" tooltip="Light Mode" />
  </div>
</template>

<script setup>
import Icon from "@/components/Icon";
import { ConstantStore } from "@/database";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const theme = computed(() => {
  return store.getters["display/theme"];
});

const handleThemeChange = async () => {
  theme.value === "light"
    ? store.dispatch("display/updateTheme", "dark")
    : store.dispatch("display/updateTheme", "light");
  document.documentElement.setAttribute("data-theme", theme.value);
  await ConstantStore.updateTheme(theme.value);
};
</script>
