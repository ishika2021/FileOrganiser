<template>
  <div
    :class="
      !isAllowed
        ? 'not-allowed menu-item'
        : isDropdown
        ? 'dropdown-menu-item'
        : 'menu-item'
    "
    @click="action()"
  >
    <Icon
      :name="icon"
      :color="!isDropdown && isActive ? '#11A37B' : ''"
      class="icon"
    />
    <slot name="label" />
    <span
      v-if="!this.$slots.label"
      :style="!isDropdown && isActive ? 'color:#11A37B' : ''"
      class="text"
    >
      {{ label }}
    </span>
  </div>
</template>

<script>
import Icon from "../Icon/Icon.vue";
export default {
  name: "MenuItem",
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      required: true,
      default: "",
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDropdown: {
      type: Boolean,
      default: false,
    },
    action: {
      type: Function,
      required: false,
      default: () => {},
    },
    isAllowed: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
