<template>
  <div :class="`button button-${size} button-${type}`">
    <div class="icon">
      <Icon :name="icon" :color="color" />
    </div>
    <div class="btn-label">
      <span :style="`{color:${color}}`">{{ label }}</span>
      <div v-if="hasList" class="icon down">
        <Icon name="down" :color="color" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  name: "Button",
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "primary",
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
    size: {
      type: String,
      required: false,
      default: "medium",
    },
    hasList: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    color() {
      if (this.type === "primary") {
        return "#2DBD96";
      } else if (this.type === "secondary") {
        return "#ffffff";
      } else if (this.type === "danger") {
        return "#f7685b";
      }
      return "";
    },
  },
};
</script>
