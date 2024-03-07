import { PERMISSION } from '@/constants/permissions'
import { ROUTER_NAMES, ROUTER_PATHES } from '@/constants/router'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_PATHES.HOME,
      name: ROUTER_NAMES.HOME,
      component: HomePage
    },
    {
      path: ROUTER_PATHES.ABOUT,
      name: ROUTER_NAMES.ABOUT,
      component: () => import('@/pages/AboutPage.vue')
    },
    {
      path: ROUTER_PATHES.LOGIN,
      name: ROUTER_NAMES.LOGIN,
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      path: ROUTER_PATHES.REGISTRATION,
      name: ROUTER_NAMES.REGISTRATION,
      component: () => import('@/pages/RegistrationPage.vue'),
      meta: {
        permissions: PERMISSION.PUBLIC
      }
    }
  ]
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.permissions === PERMISSION.PUBLIC) return true

  if (!token && to.name !== ROUTER_NAMES.LOGIN)
    return {
      name: ROUTER_NAMES.LOGIN
    }
  return true
})

export default router
