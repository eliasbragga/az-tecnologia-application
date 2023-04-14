import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/index.vue";
import Register from "@/views/register/index.vue";
import Candidates from "@/views/candidates/index.vue";
import addCandidate from "@/components/add-candidate/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: " ",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/add_candidate",
    name: "add candidate",
    component: addCandidate,
    meta: {
      name: "Recentes",
    },
  },
  {
    path: "/candidates",
    name: "candidates",
    component: Candidates,
    meta: {
      name: "Candidatos",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
