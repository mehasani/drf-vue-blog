import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProfileView from "../views/ProfileView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import RegisterView from "../views/RegisterView.vue";
import Detail from "../views/DetailView.vue";
import Add from "../views/AddView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: { loginRequired: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { loginRedirect: true },
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogoutView,
    meta: { loginRequired: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { loginRedirect: true },
  },
  {
    path: "/article/:slug",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/add",
    name: "Add",
    component: Add,
    meta: { loginRequired: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.loginRequired)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  } else if (to.matched.some((record) => record.meta.loginRedirect)) {
    if (!store.state.isAuthenticated) {
      next();
    } else {
      next("/profile");
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
