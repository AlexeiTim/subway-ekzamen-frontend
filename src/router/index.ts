import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/AboutPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/pages/RegistrationPage.vue'),
      meta: {
        permissions: 'all'
      }
    }
  ]
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.permissions === 'all') return true

  if (!token && to.name !== 'login')
    return {
      name: 'login'
    }
  return true
})

export default router
