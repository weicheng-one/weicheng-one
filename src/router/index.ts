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
      path: "/:slug",
      name: "post",
      component: () => import("@/views/PostView.vue"),
    },
    {
      path: "/admin/post-edit",
      name: "post-edit",
      component: () => import("@/views/PostEditView.vue"),
    },
  ],
});

export default router;
