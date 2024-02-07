import { createRouter, createWebHistory } from 'vue-router';
import routePaths from './paths';

const router = createRouter({
  history: createWebHistory('custom'),
  routes: routePaths,
});

export default router;
