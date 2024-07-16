export const ROUTER_NAMES = {
  HOME: 'home',
  ABOUT: 'about',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  EXAM_THEMES: 'exam-themes',
  PRACTICE: 'practice',
  EXAM_PRACTICE: 'exam-practice',
  PRE_PRACTICE: 'pre-practice',
  SETTING_PRACTICE: 'setting-practice',
  RESULTS: 'results',
}

export const ROUTER_PATHES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  EXAM_THEMES: '/exams/:id/themes',
  PRACTICE: '/practice/exam/:examId/theme/:themeId',
  EXAM_PRACTICE: '/practice/exam/:examId',
  PRE_PRACTICE: '/pre-practice/exam/:examId/theme/:themeId',
  SETTING_PRACTICE: '/setting-practice/exam/:examId/theme/:themeId',
  RESULTS: '/results'
}

export const ROUTER_PAGES_COMPONENT_PATHES = {
  ABOUT_PAGE: '@/pages/AboutPage.vue',
  LOGIN_PAGE: '@/pages/LoginPage.vue',
  REGISTRATION_PAGE: '@/pages/RegistrationPage.vue'
}
