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
import Messages from "@/mixins/Messages.js";
export default {
  name: "ButtonAddCadidate",
  mixins: [Messages],
  components: {
    ActionUser,
    MessageAlert,
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
</style>