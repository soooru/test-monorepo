import { RouteRecordRaw } from 'vue-router';
import MRLayout from 'core/src/layouts/MRLayout.vue';

const routePaths: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/mr' },
  {
    path: '/mr',
    name: 'mr',
    component: MRLayout,
    children: [
      {
        path: '',
        name: 'DashBoard',
        component: () => import('core/src/views/MRDashBoard.vue'),
        meta: {
          label: 'DashBoard',
        },
      },
    ],
  },
  // { path: '/mr', name: 'mr', component: () => import('core/src/views/ErrorPage.vue') },
  {
    path: '/:catchAll(.*)',
    redirect: '/mr',
  },
];

export default routePaths;
