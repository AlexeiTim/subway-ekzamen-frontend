import { PERMISSION } from '@/constants/permissions'
import { ROUTER_NAMES, ROUTER_PATHES } from '@/constants/router'
import HomePage from '@/pages/HomePage.vue'

export const routes = [
  {
    path: ROUTER_PATHES.HOME,
    name: ROUTER_NAMES.HOME,
    component: HomePage,
  },
  {
    path: ROUTER_PATHES.LOGIN,
    name: ROUTER_NAMES.LOGIN,
    component: () => import('@/pages/LoginPage.vue'),
    meta: {
      permissions: PERMISSION.PUBLIC
    }
  },
  {
    path: ROUTER_PATHES.REGISTRATION,
    name: ROUTER_NAMES.REGISTRATION,
    component: () => import('@/pages/RegistrationPage.vue'),
    meta: {
      permissions: PERMISSION.PUBLIC
    }
  },
  {
    path: ROUTER_PATHES.EXAM_THEMES,
    name: ROUTER_NAMES.EXAM_THEMES,
    component: () => import('@/pages/ExamThemesPage.vue'),
  }
]
