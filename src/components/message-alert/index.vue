<template>
  <div :class="successReq ? 'success' : 'error'" class="toast" v-if="showMessage">
    <div class="message_toast">
      <span>{{ message }}</span>
    </div>
    <div class="icon_toast">
      <span @click="closeToastMessage" class="close_icon">x</span>
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
      type: Boolean
    },
    showMessage: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    dialog: true,
  }),
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
    success() {
        this.closeToastMessage();
    }
  },
};
</script>

<style scoped>
.toast_container {
  display: flex;
  background: red;
}
.toast {
  position: fixed;
  top: 3%;
  right: 3%;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.212);
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
  background-color: #53a653;
}

.error {
  background-color: red;
}

.message_toast {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  width: 90%;
}
.icon_toast {
  text-align: end;
  font-size: 17px;
  color: #ffffff;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  padding-left: 0.5rem;
  cursor: pointer;
}
</style>