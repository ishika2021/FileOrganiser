<template>
  <div class="empty-screen">
    <div class="content">
      <img
        :src="require(`../../assets/empty-screen.png`)"
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
export default {
  name: "EmptyScreen",
};
</script>
