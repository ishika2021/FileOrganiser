<template>
  <v-snackbar v-model="showNotification" location="left">
    {{ message }}
    <template v-slot:actions>
      <Icon name="starred" @click="handleClose" />
    </template>
  </v-snackbar>
</template>

<script>
import Icon from "@/components/Icon";
import { mapGetters } from "vuex";

export default {
  name: "Notification",
  components: {
    Icon,
  },
  data() {
    return {
      showNotification: false,
      message: "",
      timeoutDuration: 2000,
    };
  },
  computed: {
    ...mapGetters({
      notification: "display/notification",
    }),
  },
  watch: {
    notification: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.showNotification = true;
          this.message = newVal.message;
          this.startTimeout();
        } else {
          this.showNotification = false;
        }
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.dispatch("display/updateNotification", null);
    },
    startTimeout() {
      setTimeout(() => {
        this.handleClose();
      }, this.timeoutDuration);
    },
  },
};
</script>
