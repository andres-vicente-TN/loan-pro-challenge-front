import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import LogoutView from "../views/LogoutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    },
  ],
});

export default router;
