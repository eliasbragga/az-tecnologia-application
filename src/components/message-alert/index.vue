<template>
  <div
    data-jest="toast_container"
    :class="successReq ? 'success' : 'error'"
    class="toast"
    v-if="showMessage"
  >
    <div class="message_toast">
      <span>{{ message }}</span>
    </div>
    <div class="icon_toast">
      <span
        data-jest="close_toast"
        @click="closeToastMessage"
        class="close_icon"
        >x</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageAlert",
  props: {
    message: {
      required: true,
      type: String,
    },
    successReq: {
      required: false,
      type: Boolean,
    },
    showMessage: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    closeToastMessage() {
      this.$emit("closeToastMessage", false);
    },
  },
  watch: {
    showMessage(newValue) {
      if (newValue === true) {
        setTimeout(() => {
          this.closeToastMessage();
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.toast_container {
  display: flex;
  background: var(--error-color);
}
.toast {
  position: fixed;
  top: 3%;
  right: 3%;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 5px 6px var(--box-shadow);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  opacity: 1;
  visibility: visible;
  min-width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeOut 0.6s ease-in-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.success {
  background-color: var(--success-color);
}

.error {
  background-color: var(--error-color);
}

.message_toast {
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: var(--white-color);
  width: 90%;
}
.icon_toast {
  text-align: end;
  font-size: 17px;
  color: var(--white-color);
  font-style: normal;
  font-weight: 400;
  padding-left: 0.5rem;
  cursor: pointer;
}
</style>