import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/MainView.vue'),
  },
  {
    path: '/new-game',
    name: 'Game',
    component: () => import('../views/GameView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
