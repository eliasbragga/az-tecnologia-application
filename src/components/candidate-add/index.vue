<template>
  <div class="table_container">
    <MessageAlert
      :showMessage="showMessage ? true : false"
      :message="messageToast ? messageToast : ''"
      :successReq="successReq ? true : false"
      @closeToastMessage="closeToastMessage"
    />
    <div class="table_empty_container">
      <img src="@/assets/Vector (5).png" alt="icone no centro da tela vazia" />
      <p data-jest="text_empyt_candidate">
        Você nao possui nenhum candidato adicionado recentemente, clique no
        botão
        <span class="button_add_span">Adicionar</span> para começar.
      </p>
    </div>
  </div>
</template>

<script>
import MessageAlert from "@/components/message-alert/index.vue";
import Messages from "@/mixins/Messages.js";
export default {
  name: "AddCandidate",
  mixins: [Messages],
  components: { MessageAlert },
  data: () => ({}),
};
</script>

<style scoped>
.table_container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 100vh;
  background: var(--white-color);
  overflow: hidden;
  overflow-x: hidden;
  box-shadow: 0px 4px 4px var(--box-shadow);
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
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: var(--light-grey);
}
.table_empty_container img {
  margin-bottom: 0.5rem;
}

.button_add_span {
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: var(--primary-color);
}


@media screen and (min-width: 600px) and (max-width: 900px) {
  .table_empty_container {
    width: 60%;
  }
}
@media screen and (max-width: 600px) {
  .table_empty_container {
    width: 90%;
  }
}
</style>