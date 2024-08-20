<template>
  <v-snackbar v-model="showNotification" location="left">
    {{ message }}
    <template v-slot:actions>
      <Icon name="close" @click="handleClose" />
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
      timeoutDuration: 3000,
    };
  },
  computed: {
    ...mapGetters({
      notification: "display/notification",
    }),
    color() {
      const type = this.notification?.type;
      switch (type) {
        case "error":
          return "#f7685b";
        case "default":
          return "#2dbd96";
      }
      return "";
    },
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
    setNotificationType() {
      this.$nextTick(() => {
        const snackbar = document.querySelector(".v-snackbar__wrapper");
        if (snackbar) {
          snackbar.style.borderRight = `8px solid ${this.color}`;
        }
      });
    },
  },
  updated() {
    this.setNotificationType();
  },
};
</script>
