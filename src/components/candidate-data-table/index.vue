<template>
  <div class="table_container">
    <MessageAlert
    ref="MessageAlert"
      :showMessage="showMessage"
      :message="messageToast"
      :successReq="successReq"
      @closeToastMessage="closeToastMessage"
    />

    <Pagination class="md_flex" ref="Pagination" />
    <div class="full_container">
      <div class="table sm_960_block">
        <table>
          <thead>
            <tr>
              <th style="width: 10%">#</th>
              <th style="width: 30%">Name</th>
              <th style="width: 50%">E-mail</th>
              <th style="width: 5%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(candidate, i) in candidates" :key="i">
              <td>{{ candidate.id }}</td>
              <td>{{ candidate.first_name }}</td>
              <td class="user_image">
                <img :src="candidate.avatar" alt="icone" />
                <span>{{ candidate.email }}</span>
              </td>
              <td>
                <div class="actions_table">
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination class="sm_960" />
      <CardMobile class="md_block" ref="CardMobile" />
    </div>
    <MessageAlert
      :showMessage="showMessage"
      :message="messageToast"
      :successReq="successReq"
      @closeToastMessage="closeToastMessage"
      class="md_block"
    />
  </div>
</template>

<script>
import MessageAlert from "@/components/message-alert/index.vue";
import DeleteButton from "@/components/popups/alert-delete.vue";
import ActionUser from "@/components/popups/action-candidate.vue";
import CardMobile from "@/components/card-candidate-mobile/index.vue";
import Pagination from "@/components/pagination/index.vue";
import { mapGetters } from "vuex";
import Messages from "@/mixins/Messages.js";
export default {
  name: "UserDataTable",
  mixins: [Messages],
  components: {
    DeleteButton,
    ActionUser,
    MessageAlert,
    CardMobile,
    Pagination,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["candidates"]),
  },
};
</script>

<style scoped>
.table_container {
  width: 97%;
  min-height: 97%;
  background: #ffffff;
  overflow: scroll;
  overflow-x: hidden;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin: 0.5rem auto;
  padding: 1rem;
}

.table_empty_container {
  flex-direction: column;
  width: 35%;
  margin: auto;
}
.table_empty_container p {
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #626262;
}
.table_empty_container img {
  margin-bottom: 0.5rem;
}

.table {
  width: 100%;
  margin: auto;
}

table {
  border-collapse: collapse;
  height: max-content;
  margin: auto;
}
th,
td {
  border: 1px solid black;
  padding: 10px;
  overflow: hidden;
  text-align: start;
  border: none;
  border-bottom: 1px solid black;
}

th {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #0067a5;
}

.actions_table {
  display: flex;
  width: 80%;
  justify-content: space-between;
}

.user_image img {
  border-radius: 50%;
  width: 5%;
  margin-right: 10px;
}

.sm_960 {
  display: flex;
}

.sm_960_block {
  display: block;
}

.md_block {
  display: none;
}
.md_flex {
  display: none;
}

.full_container {
  max-width: 1700px;
  margin: auto;
}

@media screen and (min-width: 600px) and (max-width: 960px) {
  .md_block {
    display: none;
  }
  .sm_960 {
    display: flex;
  }
  .sm_960_block {
    display: block;
  }
  .md_flex {
    display: none;
  }

  .user_image img {
    width: 7% !important;
  }
}

@media screen and (max-width: 600px) {
  .md_flex {
    display: flex;
    margin-bottom: 1.5rem;
  }
  .md_block {
    display: block;
  }
  .sm_960_block {
    display: none;
  }
  .sm_960 {
    display: none;
  }
}

@media screen and (min-width: 960px) {
  .table_container {
    overflow-y: hidden;
  }
}
@media screen and (min-width: 1820px) {
  .full_container {
    max-width: 1600px;
  }
}
</style>