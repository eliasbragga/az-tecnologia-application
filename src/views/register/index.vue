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
            :disabled="loadingField"
            @click="handleClick"
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
  import { mapMutations, mapGetters } from "vuex";
  import MyMixin from "@/mixins/MyMixin.js";
  export default {
    name: "Register",
    mixins: [MyMixin],
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
    computed: {
      ...mapGetters(["user", "password", "token"]),
    },
    methods: {
      ...mapMutations([
        "SET_USER",
        "SET_EMAIL",
        "SET_PASSWORD",
        "SET_TOKEN",
        "SET_USERLOGGED",
      ]),
  
      clearForm() {
        this.form.inputBind = ''
        this.form.passwordBind = ''
      },
      failedRegisterMessage() {
        (this.showMessage = true),
          (this.successReq = false),
          (this.messageToast = "O registro falhou. Verifique os dados e tente novamente.");
      },
      sucessRegisterMessage() {
        (this.showMessage = true),
          (this.successReq = true),
          (this.messageToast = "Cadastro realizado com sucesso. Faça o login");
      },
  
      async handleClick(e) {
        e.preventDefault();
        this.loadingField = true;
        try {
          console.log('sa')
          const response = await UserRegister({
            email: this.form.inputBind,
            password: this.form.passwordBind,
          });
          this.sucessRegisterMessage()
          this.clearForm()
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
  
      verifyUser() {
        if (
          sessionStorage.getItem("user") &&
          JSON.parse(sessionStorage.getItem("user"))
        ) {
          this.SET_USERLOGGED(JSON.parse(sessionStorage.getItem("user")));
          this.SET_TOKEN(sessionStorage.getItem("token"));
        }
      },
    },
    mounted() {
      this.verifyUser();
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
    margin: auto
  }
  
  .login_card {
    background: transparent;
    border: 1px solid #0067a5;
    width: 450px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4.5px 3.8px rgba(0, 0, 0, 0.089);
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
    font-family: "Open Sans", sans-serif;
    color: #8e8e8e;
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
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: #626262;
  }
  .input_container input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
  }
  .input_container input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    font-size: 15px;
    padding: 0.8rem;
    font-weight: 200;
  }
  .input_container input::placeholder {
    color: #00000059;
    font-size: 15px;
    line-height: 20px;
    font-weight: 400;
    font-family: "Open Sans";
  }
  .input_container input:focus {
    outline: none;
  }
  
  .button_send {
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
  }
  .active {
    transition: .3s;
    background: #0067a5;
  }

  .active:hover {
  transition: .3s;
  background: #004d7c;
}
  .inactive {
    transition: 0.2s;
    background: #8e8e8e;
  }

  .back_button {
    color: #626262;
    margin-right: .5rem;
    transition: .3s;
    background: transparent;
    border: 1px solid #8e8e8e;
  }
  .back_button:hover {
    transition: .3s;
    background: #c0c0c0;
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