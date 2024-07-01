<template>
  <li class="breadcrumb-item">
    <Icon
      v-if="item.title !== 'Home'"
      name="right-arrow"
      class="icon"
      color="#A6A8A8"
    />
    <span @click="action(item)" :class="item.title === 'Home' ? 'bold' : ''">{{
      item.title
    }}</span>
    <span v-if="item.title === 'Home'">
      <Icon name="right-arrow" class="icon" color="#595C5B" /> {{ currentPage }}
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
  },
};
</script>
