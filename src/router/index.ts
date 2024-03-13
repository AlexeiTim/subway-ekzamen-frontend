import { PERMISSION } from '@/constants/permissions'
import { ROUTER_NAMES } from '@/constants/router'
import { routes } from '@/router/routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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
