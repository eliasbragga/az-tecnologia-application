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
      <form>
        <!-- opa -->
        <div class="input_container">
          <label for="usuario">Usuário</label>
          <input
            data-jest="input_user_email"
            :disabled="loadingField"
            v-model="form.inputBind"
            autocomplete="off"
            placeholder="Informe usuário"
            name="usuario"
            type="text"
            required
          />
        </div>
        <div class="input_container">
          <label for="senha">Senha</label>
          <input
            data-jest="input_user_password"
            :disabled="loadingField"
            v-model="form.passwordBind"
            placeholder="Informe senha"
            name="senha"
            type="password"
            required
          />
        </div>
        <div class="input_container">
          <span
            data-jest="span_user_register"
            @click="redirectRoute('/register')"
            class="register"
            >Registrar-se</span
          >
        </div>
        <button
          data-jest="button_user_login"
          :disabled="loadingField"
          @click.prevent="handleClick"
          class="button_send"
          :class="loadingField ? 'inactive' : 'active'"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import MessageAlert from "@/components/message-alert/index.vue";
import { UserLogin } from "@/services/login";
import { mapMutations, mapGetters } from "vuex";
import Messages from "@/mixins/Messages.js";
export default {
  name: "Login",
  mixins: [Messages],
  components: {
    MessageAlert,
  },
  data: () => ({
    form: {
      inputBind: "eve.holt@reqres.in",
      passwordBind: "cityslicka",
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

    setDatasToVuex() {
      this.SET_USER(this.form.inputBind);
      this.SET_PASSWORD(this.form.passwordBind);
    },

    failedLoginMessage() {
      (this.showMessage = true),
        (this.successReq = false),
        (this.messageToast = "Dados Inválidos. Por favor, tente novamente");
    },

    async handleClick() {
      this.loadingField = true;
      this.setDatasToVuex();
      try {
        const response = await UserLogin({
          username: this.user,
          password: this.password,
        });
        this.SET_TOKEN(response.data.token);
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("tokenType", "Bearer");
        sessionStorage.setItem("user", JSON.stringify(this.user));
        this.redirectRoute("/candidates");
      } catch (error) {
        this.failedLoginMessage();
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
  margin: auto;
}

.login_card {
  background: #ffffff;
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
  line-height: 30px;
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
  width: 87px;
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
  transition: 0.3s;
  background: #0067a5;
}
.active:hover {
  transition: 0.3s;
  background: #004d7c;
}
.inactive {
  transition: 0.2s;
  background: #8e8e8e;
}

.register {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.582);
  cursor: pointer;
  transition: 0.3s;
}
.register:hover {
  transition: 0.3s;
  color: rgba(0, 0, 0, 0.774);
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