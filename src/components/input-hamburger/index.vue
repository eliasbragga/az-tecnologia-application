<template>
  <div class="header_mobile">
    <div class="header_hamburger">
      <button
        data-jest="button_open_hamburger"
        class="btn_hamburger"
        @click="openHamburger"
      >
        <span class="line_hamburger"></span>
        <span class="line_hamburger"></span>
        <span class="line_hamburger"></span>
      </button>
      <div class="dropdown_hamburger">
        <div class="card_hamburger" v-if="hamburgerOptionVisibility">
          <span>Ola, {{ userName }}</span>
          <button
            @click="redirectRoute(route.path)"
            v-for="(route, i) in routes"
            :key="i"
            class="btn_candidatos_hamburger"
          >
            {{ route.meta.name }}
          </button>
          <button
            data-jest="button_logout"
            class="btn_candidatos_hamburger logout"
            @click="toGoLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "@/router";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "InputHamburger",
  data: () => ({
    routes: routes.options.routes.filter((route) => route.meta),
    hamburgerOptionVisibility: false,
    userName: "Az Tecnologia",
  }),
  computed: {
    ...mapGetters(["logout"]),
  },
  methods: {
    ...mapMutations(["SET_LOGOUT"]),
    openHamburger() {
      this.hamburgerOptionVisibility = !this.hamburgerOptionVisibility;
    },
    toGoLogout() {
      this.SET_LOGOUT(true);
      this.redirectRoute("/login");
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
.header_hamburger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
}

.btn_hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

.line_hamburger {
  width: 20px;
  height: 2px;
  background-color: black;
  margin: 2px;
  transition: transform 0.2s ease-in-out;
}

.btn_hamburger .active_hamburger .line_hamburger:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.btn_hamburger .active_hamburger .line_hamburger:nth-child(2) {
  opacity: 0;
}

.btn_hamburger .active_hamburger .line_hamburger:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

.dropdown_hamburger {
  position: relative;
}

.card_hamburger {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 40px;
  left: -70px;
  width: 200px;
  background-color: #f2f2f2;
  padding: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.card_hamburger span {
  margin-bottom: 1rem;
  font-family: "Open Sans";
  font-weight: 700;
  color: rgba(0, 0, 0, 0.644);
}

.btn_candidatos_hamburger {
  background-color: #0067a5;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 0.4rem;
}
.logout {
  background-color: rgba(255, 0, 0, 0.76) !important;
}
</style>