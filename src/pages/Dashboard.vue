<template>
  <Header />
  <BoardPage />
</template>

<script>
import Header from "../components/Header/Header.vue";
import BoardPage from "./Board/BoardPage.vue";
export default {
  name: "Dashboard",
  components: {
    Header,
    BoardPage,
  },
};
</script>
