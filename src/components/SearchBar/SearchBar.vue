<template>
  <div class="search-bar">
    <div class="icon">
      <Icon name="search" />
    </div>
    <div class="separator"></div>
    <div class="input">
      <input
        type="text"
        placeholder="Search..."
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
<script>
import Icon from "../Icon";
export default {
  name: "SearchBar",
  emit: ["update:modelValue"],
  components: {
    Icon,
  },
  data() {
    return {
      modelValue: "",
    };
  },
};
</script>
