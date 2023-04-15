<template>
  <div>
    <MessageAlert
      ref="messageAlert"
      :showMessage="showMessage ? true : false"
      :message="messageToast ? messageToast : ''"
      :successReq="successReq ? true : false"
      @closeToastMessage="closeToastMessage"
    />
    <div class="card_container" v-for="(candidate, i) in candidates" :key="i">
      <div style="width: 90%; gap: 10px; display: flex; flex-direction: column">
        <img
          class="avatar_candidate"
          :src="candidate.avatar"
          alt="foto do candidato"
        />
        <div class="group_card">
          <div class="info">
            <div class="icon_card">&#x1F194;</div>
            <span>{{ candidate.id }}</span>
          </div>
          <div class="info">
            <div class="icon_card">&#x1F464;</div>
            <span>{{ candidate.first_name }}</span>
          </div>
          <div class="info">
            <div class="icon_card">&#x1F4E8;</div>
            <div style="display: flex; align-items: center">
              <span :title="candidate.email">{{ candidate.email }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="button_container">
        <ActionUser
          ref="ActionUser"
          @messageToast="messageToastHandle"
          :edit="true"
          :id="candidate.id"
        />
        <DeleteButton
          ref="DeleteButton"
          @messageToast="messageToastHandle"
          :id="candidate.id"
          :name="candidate.first_name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MessageAlert from "@/components/message-alert/index.vue";
import DeleteButton from "@/components/popups/alert-delete.vue";
import ActionUser from "@/components/popups/action-candidate.vue";
import Messages from "@/mixins/Messages.js";
import { mapGetters } from "vuex";
export default {
  name: "CardCandidateMobile",
  mixins: [Messages],
  components: {
    DeleteButton,
    ActionUser,
    MessageAlert,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["candidates"]),
  },
};
</script>

<style scoped>
.card_container {
  border-radius: 5px;
  box-shadow: 2px 3px 4px var(--box-shadow);
  max-width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0.3rem 1rem;
  background: var(--background-card);
  margin-bottom: 1rem;
  position: relative;
}

.info {
  display: flex;
  justify-content: start;
  align-items: center;
  color: var(--color-black);
  font-weight: 400;
  text-transform: uppercase;
  width: 100% !important;
  margin-left: 1rem;
  gap: 10px;
  margin-bottom: 10px;
  overflow-x: hidden;
}

.info span {
  font-size: 10px;
}

.avatar_candidate {
  max-width: 60px;
  border-radius: 10px;
  margin: auto;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 2px 4px var(--strong-box-shadow);
}

.button_container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 1rem;
}

.icon_card {
  font-size: 15px;
  margin-right: 1rem;
}

.group_card {
  width: 100%;
  margin-top: 2.4rem;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .info span {
    font-size: 12px;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.322);
  }
}
</style>