<template>
  <div class="header_container">
    <div style="display: flex">
      <Inputhamburger class="sm_600 sm_960" />
      <div class="header_text sm_600" style="margin-top: 10px">
        <p>Candidatos</p>
      </div>
      <div class="header_mobile sm_960">
        <div class="header_text">
          <p>Candidatos</p>
          <span class="sm_960">» Listagem dos candidatos</span>
        </div>
      </div>
    </div>
    <div class="header__info_user md_flex">
      <div>
        {{ userName }}
        <div class="dropdown">
          <button class="dropbtn" @click="openDropdown">&#9660;</button>
          <div class="card_hamburger" v-if="hamburgerOptionVisibility">
            <span>Ola, {{ userName }}</span>
            <button
              data-jest="button_logout_dropdown"
              class="btn_candidatos_hamburger logout_input"
              @click="toGoLogout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <img class="user_icon md_flex" src="@/assets/user-icon.png" />
    </div>
  </div>
</template>

<script>
import Inputhamburger from "@/components/input-hamburger/index.vue";
import { mapGetters, mapMutations } from "vuex";
import Messages from "@/mixins/Messages.js";
export default {
  name: "Header",
  mixins: [Messages],
  components: { Inputhamburger },
  data: () => ({
    userName: "Az Tecnologia",
    dropdown: false,
    hamburgerOptionVisibility: false,
  }),
  computed: {
    ...mapGetters(["logout"]),
  },
  methods: {
    ...mapMutations(["SET_LOGOUT"]),
    openDropdown() {
      this.hamburgerOptionVisibility = !this.hamburgerOptionVisibility;
    },
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
  mounted() {
    window.addEventListener("resize", this.widthWindows);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.widthWindows);
  },
};
</script>

<style scoped>
.header_container {
  height: 70px;
  width: 100%;
  background: #ffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.header_text {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.header_text p {
  font-family: "Open Sans";
  font-weight: 700;
  font-size: 22px;
  color: #0067a5;
}
.header_text span {
  margin-left: 1rem;
  color: #626262;
}

.header__info_user {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.user_icon {
  width: 30px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
}

.logout {
  background: transparent;
  color: #ffff;
  border: none;
  cursor: pointer;
  font-family: "Open Sans";
  font-weight: 700;
  font-size: 13px;
}

.logout:hover {
  background-color: #d32f2f;
}

.card_hamburger {
  position: absolute;
  display: block;
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

.card_hamburger {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 40px;
  left: -120px;
  width: 200px;
  background-color: #f2f2f2;
  padding: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.btn_candidatos_hamburger {
  background-color: #0067a5;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.logout_input {
  background-color: rgba(255, 0, 0, 0.76) !important;
}

.header_mobile {
  display: flex;
}

.sm_600 {
  display: none;
}

.sm_960 {
  display: none;
}

.md_flex {
  display: flex;
}

@media screen and (min-width: 960px) {
  .sm_960 {
    display: flex;
  }
  .sm_600 {
    display: none;
  }
}

@media screen and (min-width: 600px) and (max-width: 960px) {
  .sm_960 {
    display: flex;
  }
  .md_flex {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .sm_600 {
    display: block;
  }
  .md_flex {
    display: none;
  }
}
</style>