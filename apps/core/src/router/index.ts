import { createRouter, createWebHistory } from 'vue-router';
import routePaths from './paths';

import { useUserStore } from '@/stores/user-store';

const router = createRouter({
  history: createWebHistory(''),
  routes: routePaths,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.path === '/login' || to.path === '/pwdreset') {
    next();
  } else {
    if (!userStore.isLoggedIn) {
      next('/login');
    } else {
      if (to.path === '/' && from.path === '/') next('/mr');
      next();
    }
  }
});

export default router;
