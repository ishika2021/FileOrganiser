<template>
  <div class="action-menu">
    <Icon 
      v-for="(obj, index) in menu" 
      :key="index" 
      :name="obj.icon" 
      class="icon" 
    />
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  name: "ActionMenu",
  components: {
    Icon,
  },
  props: {
    menu: {
      type: Array,
      required: true,
      default: () => { },
    },
  },
};
</script>
