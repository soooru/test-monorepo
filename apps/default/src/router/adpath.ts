import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const adpath: Array<RouteRecordRaw> = [
  {
    path: '/ad',
    name: 'ad',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/ADDashBoard.vue'),
        meta: {
          label: 'Home',
        },
      },
      {
        path: '/ad/example',
        name: 'ExamplePage',
        component: () => import('@/views/ExamplePage.vue'),
        meta: {
          label: 'EXAMPLE PAGE',
        },
      },
    ],
  },
];

export default adpath;
