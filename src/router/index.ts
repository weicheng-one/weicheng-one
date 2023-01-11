import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/rockets",
      name: "rockets",
      // route level code-splitting
      // this generates a separate chunk (RocketsView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RocketsView.vue"),
    },
    {
      path: "/rocket/:id",
      name: "rocket",
      // route level code-splitting
      // this generates a separate chunk (RocketsView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RocketView.vue"),
    },
    {
      path: "/users",
      name: "users",
      // route level code-splitting
      // this generates a separate chunk (users.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Users" */ "../views/UsersView.vue"),
    },
  ],
});

export default router;
