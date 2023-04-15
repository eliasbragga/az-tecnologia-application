<template>
  <div class="login_container">
    <MessageAlert
      :showMessage="showMessage"
      :message="messageToast"
      :successReq="successReq"
      @closeToastMessage="closeToastMessage"
    />
    <div class="logo_container">
      <img class="logo" src="@/assets/logo-dark.png" alt="logo da empresa" />
      <p>Tecnologia em Gestão</p>
    </div>
    <div class="login_card">
      <p>Registro</p>
      <form>
        <div class="input_container">
          <label for="usuario">E-mail</label>
          <input
            data-jest="input_user_register_email"
            :disabled="loadingField"
            v-model="form.inputBind"
            autocomplete="off"
            placeholder="Informe e-mail"
            name="usuario"
            type="text"
            required
          />
        </div>
        <div class="input_container">
          <label for="senha">Senha</label>
          <input
            data-jest="input_user_register_password"
            :disabled="loadingField"
            v-model="form.passwordBind"
            placeholder="Informe senha"
            name="senha"
            type="password"
            required
          />
        </div>
        <button
          :disabled="loadingField"
          @click="redirectRoute('/login')"
          class="button_send back_button"
        >
          Voltar
        </button>
        <button
          data-jest="button_user_register"
          :disabled="loadingField"
          @click.prevent="handleClick"
          class="button_send"
          :class="loadingField ? 'inactive' : 'active'"
        >
          Registrar
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script>
import MessageAlert from "@/components/message-alert/index.vue";
import { UserRegister } from "@/services/register";
import Messages from "@/mixins/Messages.js";
export default {
  name: "Register",
  mixins: [Messages],
  components: {
    MessageAlert,
  },
  data: () => ({
    form: {
      inputBind: "",
      passwordBind: "",
    },
    loadingField: false,
  }),
  methods: {
    clearForm() {
      this.form.inputBind = "";
      this.form.passwordBind = "";
    },
    failedRegisterMessage() {
      (this.showMessage = true),
        (this.successReq = false),
        (this.messageToast =
          "O registro falhou. Verifique os dados e tente novamente.");
    },
    sucessRegisterMessage() {
      (this.showMessage = true),
        (this.successReq = true),
        (this.messageToast = "Cadastro realizado com sucesso. Faça o login");
    },

    async handleClick() {
      this.loadingField = true;
      try {
        const response = await UserRegister({
          email: this.form.inputBind,
          password: this.form.passwordBind,
        });
        this.sucessRegisterMessage();
        this.clearForm();
      } catch (error) {
        this.failedRegisterMessage();
        console.log(error);
      } finally {
        this.loadingField = false;
      }
    },
    redirectRoute(route) {
      if (this.$router) {
        this.$router.push(route);
      }
    },
  },
};
</script>
  
  <style scoped>
.login_container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.login_card {
  border: 1px solid var(--primary-color) ;
  background: transparent;
  width: 450px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4.5px 3.8px var(--box-shadow);
  border-radius: 5px;
}

.logo_container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.logo {
  width: 73.19px;
  height: 40.6px;
}

p {
  color: var(--light-grey);
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
}

.input_container {
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 10px;
  width: 380px;
  margin-bottom: 1.3rem;
}
.input_container label {
  font-size: 13px;
  font-weight: 600;
  color: var(--light-grey) !important;
  font-size: 13px;
  line-height: 18px;
}
.input_container input {
  width: 100%;
  border: none;
  background: transparent;
  border-bottom: 1px solid var(--black-color) !important;
}
.input_container input {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--light-grey);
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
.active {
  transition: 0.3s;
  background: var(--primary-color);
}

.active:hover {
  transition: 0.3s;
  background: var(--primary-color-hover);
}
.inactive {
  transition: 0.2s;
  background: var(--light-grey);;
}

.back_button {
  color: var(--light-grey);
  margin-right: 0.5rem;
  transition: 0.3s;
  background: transparent;
  border: 1px solid var(--light-grey);
}
.back_button:hover {
  transition: 0.3s;
  background: var(--light-grey-hover);
}

@media screen and (max-width: 600px) {
  .login_container {
    width: 100%;
  }
  .logo_container {
    flex-direction: column;
  }
  .logo_container img {
    margin-bottom: 1rem;
  }
  .logo {
    width: 50px;
    height: 30px;
  }
  .login_card {
    width: 80%;
  }

  .input_container {
    display: flex;
    flex-direction: column;
    text-align: start;
    gap: 10px;
    width: 100%;
    margin-bottom: 1.3rem;
  }

  .button_send {
    padding: 8px 20px;
    width: 100%;
    height: 38px;
  }
}
</style>