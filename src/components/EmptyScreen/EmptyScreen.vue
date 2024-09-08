<template>
  <div class="empty-screen">
    <div class="content">
      <img
        :src="emptyScreenImg"
        alt="Page is under construction"
        height="100%"
        width="100%"
        class="image"
      />
      <span class="text">Coming Soon...</span>
    </div>
  </div>
</template>

<script>
import emptyScreenImg from "@/assets/empty-screen.png";
export default {
  name: "EmptyScreen",
  data() {
    return {
      emptyScreenImg,
    };
  },
};
</script>
