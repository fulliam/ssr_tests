import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function () {
  const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory();

  return createRouter({
    history: routerHistory,
    routes: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/index.vue')
      },
      {
        path: '/matches',
        name: 'matches',
        component: () => import('@/views/matches.vue')
      }
      // {
      //   path: '/market',
      //   name: 'market',
      //   component: () => import('@/views/market')
      // }
    ]
  });
}
