<template>
  <li class="breadcrumb-item">
    <Icon
      v-if="item.id !== 'root'"
      name="right-arrow"
      class="icon"
      color="#A6A8A8"
    />
    <span @click="action(item)" :class="item.id === 'root' ? 'bold' : ''">
      {{ title }}
    </span>
  </li>
</template>

<script>
import Icon from "../Icon";
export default {
  name: "BreadcrumbItem",
  components: { Icon },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
    action: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
  computed: {
    currentPage() {
      return this.$route.name;
    },
    title() {
      // truncate the long breadcrumbs
      const text = this.item.title;
      if (text.length > 10) {
        return text.substr(0, 10) + "\u2026";
      }
      return text;
    },
  },
};
</script>
