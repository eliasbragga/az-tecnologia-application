<template>
  <div>
    <button
      data-jest="button_open_dialog"
      @click="dialog = true"
      class="delete_button"
    >
      <span>🗑️</span>
    </button>
    <div v-if="dialog">
      <div class="overlay"></div>
      <div class="card">
        <div class="title_card">
          <span
            data-jest="close_dialog_icon"
            @click="closeDialog"
            class="close_dialog"
            >&times;</span
          >
          <p>Exclusão Candidato</p>
        </div>
        <div class="data_container">
          <img src="@/assets/alert-icon.png" alt="icone de alerta" />
          <p>
            Você tem certeza que quer excluir
            <span class="user_name">'{{ name }}'</span>
          </p>
        </div>
        <hr />
        <div class="button_container">
          <button
            data-jest="button_closeDialog"
            :disabled="loadingField"
            @click="closeDialog"
            class="button_action cancel_button_color"
          >
            Cancelar
          </button>
          <button
            data-jest="button_handleClick"
            :disabled="loadingField"
            @click="handleClick"
            class="button_action delete_button_color"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteCandidate } from "@/services/candidates";
export default {
  name: "ActionUser",
  props: {
    id: {
      required: false,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
  },
  data: () => ({
    dialog: false,
    loadingField: false,
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
    },

    async handleClick() {
      try {
        this.loadingField = true;
        const response = await deleteCandidate(this.id);
        this.closeDialog();
        // emitindo funcao para componente de tabela
        this.$emit("messageToast", {
          messageToast: "Exclusão realizada com sucesso",
          successReq: true,
          showMessage: true,
        });
      } catch (error) {
        this.showMessage = true;
        console.log(error);
      } finally {
        this.loadingField = false;
      }
    },
  },
};
</script>
  
  <style scoped>
.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.123);
  width: 400px;
  z-index: 9999;
  border-radius: 6px;
  box-shadow: 0px 3px 6px;
  padding-bottom: 1.5rem;
  animation: fadeOut 0.3s ease forwards;
}

@keyframes fadeOut {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Estilos para o botão de fechar */
.close_dialog {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 25px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  font-weight: 200;
  margin-top: 5px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.title_card {
  text-align: start;
  border-radius: 6px 6px 0px 0px;
  padding: 1rem 1.5rem;
  background: #0067a5;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: white;
}

.data_container {
  width: 80%;
  margin: auto;
  padding: 1rem;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.data_container p {
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
}

.button_action {
  padding: 8px 20px;
  height: 38px;
  border-radius: 4px;
  border: none;
  color: #ffffff;
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-top: 0.5rem;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
}

.button_container {
  display: flex;
  justify-content: center;
  padding: 0px 1rem;
}
.cancel_button_color {
  background: #0067a5;
  transition: 0.3s;
}
.cancel_button_color:hover {
  transition: 0.3s;
  background: #005081;
}
.cancel_button_color:hover:active {
  background: #003a5e;
}
.delete_button_color {
  background: transparent;
  border: 1px solid #949494 !important;
  color: #949494;
  transition: 0.3s;
}

.delete_button_color:hover {
  transition: 0.3s;
  background: #dddddd;
  border: 1px solid #949494 !important;
  color: #949494;
}
.delete_button_color:hover:active {
  background: #979797;
}

.user_name {
  font-weight: 700;
}

hr {
  margin: 1rem 0px;
  border: 1px solid rgba(0, 0, 0, 0.11);
}

.delete_button {
  border: none;
  background: transparent;
  cursor: pointer;
}

@media screen and (max-width: 960px) {
  .card {
    max-width: 90%;
  }
}
</style>