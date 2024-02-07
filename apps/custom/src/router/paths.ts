import { RouteRecordRaw } from 'vue-router';
const routePaths: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/mr' },
  {
    path: '/mr',
    name: 'mr',
    component: import('@/views/MRDashBoard.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/mr',
  },
];

export default routePaths;
