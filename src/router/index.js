import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/index.vue";
import Register from "@/views/register/index.vue";
import Candidates from "@/views/candidates/index.vue";
import addCandidate from "@/components/candidate-add/index.vue";

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
      requiresAuth: true,
    },
  },
  {
    path: "/candidates",
    name: "candidates",
    component: Candidates,
    meta: {
      name: "Candidatos",
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(next);
  const token = sessionStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
