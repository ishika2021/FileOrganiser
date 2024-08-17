<template>
  <div>
    <slot />
    <v-tooltip
      activator="parent"
      location="bottom"
      content-class="custom-tooltip"
    >
      <slot name="tooltip-content" />
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
};
</script>
