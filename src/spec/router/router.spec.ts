import { ROUTER_NAMES, ROUTER_PATHES } from "@/constants/router";
import { routes } from '@/router/routes';
import { describe, expect, it } from "vitest";
import { createRouter, createWebHistory } from "vue-router";

describe('router', () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  })

  it('go to login page', async () => {
    await router.push(ROUTER_NAMES.LOGIN)

    expect(router.currentRoute.value.fullPath).toEqual(ROUTER_PATHES.LOGIN)
  })

  it('go to registration page', async () => {
    await router.push(ROUTER_NAMES.REGISTRATION)

    expect(router.currentRoute.value.fullPath).toEqual(ROUTER_PATHES.REGISTRATION)
  })

  it('go to exam themes page', async () => {
    await router.push(ROUTER_NAMES.EXAM_THEMES)

    expect(router.currentRoute.value.fullPath).toEqual('/exam-themes')
  })
})