import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { ref } from 'vue';

const HomeView = () => import('@/views/HomeView.vue');
const SigninView = () => import('@/views/SigninView.vue');
const PostView = () => import('@/views/PostView.vue');
const PostEditView = () => import('@/views/PostEditView.vue');
const PostsManagementView = () => import('@/views/PostsManagementView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const user = localStorage.getItem('auth:user');
      if (user) {
        router.push({ name: 'home' });
      }
    }
  },
  {
    path: '/admin/post-edit/:postId',
    name: 'post-edit',
    component: PostEditView,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/admin/posts-management',
    name: 'posts-management',
    component: PostsManagementView,
    meta: { requiresAuth: true }
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: PostView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from) => {
  const user = localStorage.getItem('auth:user');
  if (to.meta.requiresAuth && !user) {
    router.push({ name: 'signin', query: { redirect: to.fullPath } });
  }
});

export default router;
