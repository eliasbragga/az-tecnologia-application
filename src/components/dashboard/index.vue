<template>
  <div
    :class="
      isClicked
        ? 'dashboard_container_min_width sm_960 sm_600'
        : 'dashboard_container_max_width sm_960 sm_600'
    "
  >
    <div>
      <img class="logo" src="@/assets/logo-light.png" alt="logo da empresa" />
    </div>
    <div v-for="(route, i) in routes" :key="i" style="margin-bottom: 5px;">
      <button @click="redirectRoute(route.path)">
        <div class="text_button_container" >
          <img src="@/assets/Vector.png" alt="icone do botao da dashboard" />
          <span v-if="!isClicked">{{ route.meta.name }}</span>
        </div>
        <img src="@/assets/Polygon 1.png" alt="icone de poligono" />
      </button>
    </div>
    <button class="button_min_dashboard" @click="changeVisibilityDashboard">
      <div class="button_close_container">
        <img
          src="@/assets/arrow-left.png"
          alt="icone flecha para esquerda em um botão"
        />
        <span v-if="!isClicked">Recolher Menu</span>
      </div>
    </button>
  </div>
</template>

<script>
import routes from '@/router'
import { mapGetters, mapMutations } from "vuex";
import Messages from "@/mixins/Messages.js";
export default {
  name: "Dashboard",
  mixins: [Messages],
  components: {},
  data: () => ({
    routes: routes.options.routes.filter(route => route.meta)
  }),
  computed: {
    ...mapGetters(["isClicked"]),
  },
  methods: {
    ...mapMutations(["SET_ISCLICKED"]),
    changeVisibilityDashboard() {
      this.SET_ISCLICKED(!this.isClicked);
    },
    redirectRoute(route) {
      if (this.$router) {
        this.$router.replace(route).catch(() => {});
      }
      if(this.isClicked) {
        this.changeVisibilityDashboard()
      }
    },
  },
  mounted() {
    console.log('route', this.routes)
  }
};
</script>

<style scoped>
.dashboard_container_max_width {
  background: red;
  width: 200px;
  height: calc(100% + 50px);
  background: #0067a5;
  box-shadow: 0px 0px 5px;
  padding: 3rem 0;
  position: relative;
  transition: width 0.5s ease;
}
.dashboard_container_min_width {
  background: red;
  width: 100px;
  transition: width 0.5s ease;
  height: calc(100% + 50px);
  background: #0067a5;
  box-shadow: 0px 0px 5px;
  padding: 3rem 0;
  position: relative;
}

@keyframes min_width {
  from {
    width: 200;
  }
  to {
    width: 100;
  }
}
@keyframes max_width {
  from {
    width: 200;
  }
  to {
    width: 100;
  }
}
.logo {
  margin-bottom: 3rem;
}

button {
  background: #005c94;
  border: none;
  border-top: 1px rgba(255, 255, 255, 0.384) solid;
  border-bottom: 1px rgba(255, 255, 255, 0.384) solid;
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  cursor: pointer;
  transition: 0.2s;
}
button:hover {
  background: #015183;
  transition: 0.2s;
}

.text_button_container {
  width: 60%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: start;
}

.text_button_container span {
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  text-align: center;
  margin-left: 8px;
}
.button_min_dashboard {
  position: absolute;
  bottom: 0;
  display: flex;
  text-align: start !important;
}
.button_close_container {
  width: 80%;
  margin-left: 1.3rem;
  height: 16.5px;
}
.button_close_container span {
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  align-items: start;
  color: #ffffff94;
  margin-left: 0.5rem !important;
}

.sm_960 {
  display: block;
}

.sm_600 {
  display: block;
}

@media screen and (min-width: 960px) {
  .sm_960 {
    display: block !important;
  }
}

@media screen and (min-width: 600px) and (max-width: 960px) {
  .sm_960 {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .sm_600 {
    display: none;
  }
}
</style>