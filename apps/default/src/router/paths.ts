import { RouteRecordRaw } from 'vue-router';
import adPath from './adpath';
import mrPath from './mrpath';

import EmptyLayout from '@/layouts/EmptyLayout.vue';

const routePaths: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/mr' },
  ...adPath,
  ...mrPath,
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/pwdreset',
    name: 'PwdReset',
    component: () => import('@/views/PwdResetPage.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: EmptyLayout,
    children: [
      {
        path: '',
        name: 'Error',
        component: () => import('@/views/ErrorPage.vue'),
        meta: {
          label: 'Error',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
];

export default routePaths;
