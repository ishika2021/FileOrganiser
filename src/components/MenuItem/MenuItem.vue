<template>
  <div class="menu-item">
    <div class="icon">
      <Icon :name="icon" :color="isActive ? '#11A37B' : ''" />
    </div>
    <span :style="isActive ? 'color:#11A37B' : ''">{{ label }}</span>
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
      required: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
