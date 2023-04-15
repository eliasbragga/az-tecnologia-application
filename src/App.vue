<template>
  <div id="app">
    <div class="app_container">
      <Dashboard v-if="verifyLogged" />
      <div class="candidates_container">
        <HeaderComp v-if="verifyLogged" />
        <ButtonAddCandidate v-if="verifyLogged" />
        <router-view />
      </div>
    </div>
    <FooterView :isLogged="logged" />
  </div>
</template>
<script>
import HeaderComp from "@/components/header/index.vue";
import ButtonAddCandidate from "@/components/button-add-candidate/index.vue";
import Dashboard from "@/components/dashboard/index.vue";
import FooterView from "@/components/footer/index.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    HeaderComp,
    ButtonAddCandidate,
    FooterView,
    Dashboard,
  },
  data: () => ({
    isLogged: false,
    route: "",
  }),
  computed: {
    ...mapGetters(["userLogged", "token", "logout"]),
    logged() {
      return !!this.userLogged || !!this.token;
    },
    verifyLogged() {
      this.route = this.$router.history.current.name;
      console.log('isLogged', this.token)
      return this.route !== "login" && this.token;
    },
  },
  methods: {
    ...mapMutations(["SET_TOKEN", "SET_USERLOGGED"]),
    toLogout() {
      sessionStorage.clear();
      this.SET_TOKEN("");
      this.SET_USERLOGGED("");
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
    this.route = this.$router.history.current.name;
  },
  watch: {
    route(newValue) {
      if (newValue === " ") {
        this.redirectRoute("/login");
        this.route = "login";
      }
    },
    logout(newValue) {
      if (newValue) {
        this.toLogout();
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background: #e5e5e5;
  width: 100% !important;
}

ul li {
  list-style: none;
}

a {
  text-decoration: none;
}

.app_container {
  display: flex;
}
.candidates_container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media screen and (min-width: 600px) {
  .app_container {
  height: 100%;
}
}
</style>
