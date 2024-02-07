import { RouteRecordRaw } from 'vue-router';
import MRLayout from '@/layouts/MRLayout.vue';

const mrpath: Array<RouteRecordRaw> = [
  {
    path: '/mr',
    name: 'mr',
    component: MRLayout,
    children: [
      {
        path: '',
        name: 'DashBoard',
        component: () => import('@/views/MRDashBoard.vue'),
        meta: {
          label: 'DashBoard',
        },
      },
      {
        path: '/mr/ers/tempdoc',
        name: 'tempdoc',
        component: () => import('@/views/TempDocListPage.vue'),
        meta: {
          label: '임시 문서함',
        },
      },
      {
        path: '/mr/mdm/cont',
        name: 'cont',
        component: () => import('@/views/contListPage.vue'),
        meta: {
          label: '고객',
        },
      },
      {
        path: '/mr/mdm/contdetail/:contId',
        name: 'contDetail',
        props: true,
        component: () => import('@/views/contDetailPage.vue'),
        meta: {
          label: '고객',
        },
      },
    ],
  },
];

export default mrpath;
