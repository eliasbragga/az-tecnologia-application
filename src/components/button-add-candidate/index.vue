<template>
  <div class="button_container">
    <ActionUser @messageToast="messageToastHandle" :edit="false" />
    <MessageAlert
      :showMessage="showMessage"
      :message="messageToast"
      :successReq="successReq"
      @closeToastMessage="closeToastMessage"
    />
  </div>
</template>

<script>
import MessageAlert from "@/components/message-alert/index.vue";
import ActionUser from "@/components/popups/action-candidate.vue";
import MyMixin from "@/mixins/MyMixin.js";
export default {
  name: "ButtonAddCadidate",
  mixins: [MyMixin],
  components: {
    ActionUser,
    MessageAlert,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    handleClick() {
      this.dialog = true;
    },

    closeDialog(event) {
      this.dialog = event;
    },
  },
  
};
</script>

<style scoped>
.button_container {
  height: 70px;
  background: #f5f8f9;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 2rem;
}

button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 1rem;
  border-radius: 5px;
  transition: 0.2s;
}
button:hover {
  border: none;
  background: #e5e8e9;
  cursor: pointer;
}

button span {
  font-family: "Open Sans";
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #0067a5;
  margin-left: 5px;
}
</style>