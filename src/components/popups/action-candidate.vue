<template>
  <div>
    <button
      data-jest="button_open_dialog_create"
      @click="openDialog"
      v-if="!edit"
      :class="widthWindow <= 960 ? 'button_add_user_mobile' : 'button_add_user'"
    >
      <img src="@/assets/plus-icon.png" alt="icone de mais do botao" />
      <span>Adicionar</span>
    </button>
    <button @click="getCandidate" v-else class="edit_button">
      <span>✏️</span>
    </button>
    <div class="card_visualization" v-if="dialog">
      <div class="overlay"></div>
      <div class="card">
        <div class="title_card">
          <span
            data-jest="close_dialog_icon"
            @click="closeDialog"
            class="close_dialog"
            >&times;</span
          >
          <p>{{ id ? "Editar Candidato" : "Adicionar Candidato" }}</p>
        </div>
        <div class="data_container">
          <form>
            <div class="input_container">
              <label for="usuario">Nome <span class="asterisk">*</span></label>
              <input
                data-jest="input_user_name"
                v-model="form.name"
                :disabled="loadingField"
                autocomplete="off"
                placeholder="Informe nome"
                name="usuario"
                type="text"
                required
              />
            </div>
            <div class="input_container">
              <label for="senha">Vaga <span class="asterisk">*</span></label>
              <input
                data-jest="input_user_job"
                v-model="form.job"
                :disabled="loadingField"
                placeholder="Informe vaga"
                name="senha"
                type="text"
                required
                autocomplete="off"
              />
            </div>
          </form>
        </div>
        <hr />
        <div class="button_container">
          <button
            @click="closeDialog"
            class="button_send back_button_color"
            data-jest="button_back"
          >
            Voltar
          </button>
          <button
            data-jest="button_handleClick"
            @click="id ? updateCandidate() : createCandidate()"
            :class="loadingField ? 'inactive' : ''"
            :disabled="loadingField"
            class="button_send send_button_color"
          >
            {{ id ? "Salvar" : "Adicionar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getCandidateById,
  updateCandidate,
  createCandidate,
} from "@/services/candidates";
import Messages from "@/mixins/Messages.js";
export default {
  name: "ActionUser",
  mixins: [Messages],
  components: {},
  props: {
    id: {
      required: false,
      type: Number,
    },
    edit: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    dialog: false,
    loadingField: false,
    userData: {},
    showMessage: false,
    successReq: false,
    messageToast: "",
    form: {
      name: "",
      job: "",
    },
  }),
  computed: {
    full_name() {
      if (this.userData)
        return this.userData?.first_name + " " + this.userData?.last_name;
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    openDialog() {
      if (this.id) {
        this.loadingField = true;
      }
      this.dialog = true;
    },

    clearForm() {
      this.form.name = "";
      this.form.job = "";
    },

    async getCandidate() {
      this.openDialog();
      try {
        const response = await getCandidateById(this.id);
        this.userData = {
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
        };
        this.form.name = this.full_name;
        this.form.job = response.data?.job;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingField = false;
      }
    },

    async updateCandidate() {
      try {
        this.loadingField = true;
        if (this.form.job) {
          const response = await updateCandidate(this.id, this.form);
          this.closeDialog();
          this.clearForm();
          // emitindo funcao para componente de tabela
          this.$emit("messageToast", {
            messageToast: "Edição realizada com sucesso",
            showMessage: true,
            successReq: true,
          });
          return;
        }
        this.$emit("messageToast", {
          messageToast: "Preencha os campos",
          showMessage: true,
          successReq: false,
        });
      } catch (error) {
        this.showMessage = true;
        console.log(error);
      } finally {
        this.loadingField = false;
      }
    },

    async createCandidate() {
      try {
        this.loadingField = true;
        if (this.form.name.length && this.form.job.length) {
          const response = await createCandidate(this.form);
          this.closeDialog();
          this.clearForm();
          this.$emit("messageToast", {
            messageToast: "Cadastro realizado com sucesso",
            showMessage: true,
            successReq: true,
          });
          return;
        }
        this.$emit("messageToast", {
          messageToast: "Preencha os dados",
          showMessage: true,
          successReq: false,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingField = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.widthWindows);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.widthWindows);
  },
};
</script>

<style scoped>
.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white-color);
  border: 1px solid var(--dark-grey);
  box-shadow: 0 2px 4px var(--box-shadow);
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

.close_dialog {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 25px;
  font-weight: bold;
  color: var(--white-color);
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
  background-color: var(--off-black-color);
  z-index: 9998;
}

.title_card {
  text-align: start;
  border-radius: 6px 6px 0px 0px;
  padding: 1rem 1.5rem;
  background: var(--primary-color);
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: var(--white-color);
}

.data_container {
  width: 95%;
  margin: auto;
  padding: 1rem;
}
.input_container {
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;
  margin: auto;
}
.input_container label {
  font-size: 13px;
  font-weight: 600;
  font-size: 13px;
  color: var(--light-grey);
}
.input_container input {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--black-color);
  margin-bottom: 15px;
}
.input_container input {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--black-color);
  font-size: 15px;
  padding: 0.8rem;
  font-weight: 200;
}
.input_container input::placeholder {
  color: var(--placeholder-color);
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
}
.input_container input:focus {
  outline: none;
}

.button_send {
  padding: 8px 20px;
  height: 38px;
  border-radius: 4px;
  border: none;
  color: var(--white-color);
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-top: 0.5rem;
  cursor: pointer;
}

.button_container {
  display: flex;
  justify-content: space-between;
  padding: 0px 1rem;
}

.button_add_user {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 1rem;
  border-radius: 5px;
  transition: 0.2s;
}
.button_add_user:hover {
  background: var(--hover-button-grey);
}
.button_add_user:hover:active {
  border: none;
  background: var(--hover-active-grey);
  cursor: pointer;
}

.button_add_user span {
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: var(--primary-color);
  margin-left: 5px;
}

.button_add_user_mobile {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 5px;
  transition: 0.2s;
}
.button_add_user_mobile:hover {
  background: var(--hover-button-grey);
}
.button_add_user_mobile:hover:active {
  background: var(--hover-active-grey);
}

.button_add_user_mobile span {
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
  color: var(--primary-color);
  margin-left: 5px;
}

.edit_button {
  border: none;
  background: transparent;
  cursor: pointer;
}

.send_button_color {
  background: var(--primary-color);
  transition: 0.3s;
}
.send_button_color:hover {
  transition: 0.3s;
  background: var(--primary-color-hover);
}
.send_button_color:hover:active {
  background: var(--primary-color-active);
}
.back_button_color {
  background: transparent;
  border: 1px solid var(--border-light-grey) !important;
  color: var(--border-light-grey);
  transition: 0.3s;
}
.back_button_color:hover {
  transition: 0.3s;
  background: var(--hover-button-grey) !important;
}
.back_button_color:hover:active {
  background: var(--hover-active-grey) !important;
}

.asterisk {
  color: var(--darkred-color-hover);
}

hr {
  margin: 1rem 0px;
  border: 1px solid rgba(0, 0, 0, 0.11);
}

.inactive {
  transition: 0.2s;
  background: var(--light-grey) !important;
}

@media screen and (max-width: 960px) {
  .card {
    max-width: 90%;
  }
}
</style>