import { useLogin } from "@/composables/useLogin";
import { ERRORS } from "@/constants/errors";
import { ROUTER_NAMES } from "@/constants/router";
import { AuthService } from "@/services/api/rest/auth";
import { UserService } from "@/services/api/rest/user";
import { NotificationService } from "@/services/notify/notification";
import { flushPromises } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { withSetup } from "../utils/withSetup";

const mockUpdateUser = vi.fn()
vi.mock('@/stores/user', () => {
  return {
    useUserStore: () => {
      return {
        user: {},
        updateUser: (data) => {
          this.user = data
        }
      }
    }
  }
})
vi.mock('vue-router')
const loginData = {
  username: '',
  password: ''
}

const spyAuthService = vi.spyOn(AuthService.prototype, 'login')

describe('useLogin', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('catch auth', async () => {
    const authData = {
      username: '',
      password: ''
    }
    const spy = vi.spyOn(AuthService.prototype, 'login')
    spy.mockImplementation((data) => Promise.reject(data))

    const [result, app] = withSetup(useLogin)

    const resultLogin = await result.login(authData)
    await flushPromises();
    console.log(resultLogin, 'resultLogin')
    expect(resultLogin[0]).toEqual(ERRORS.NOT_HAVE_USER)
    app?.unmount()
  })

  it('try auth without response data', async () => {
    const spy = vi.spyOn(AuthService.prototype, 'login')
    spy.mockImplementation(() => Promise.resolve({ data: undefined }))
    const spyNotify = vi.spyOn(NotificationService.prototype, 'error')
    const [result, app] = withSetup(useLogin)
    const resultLogin = await result.login(loginData)
    expect(spyNotify).toHaveBeenCalledWith(ERRORS.NOT_AUTHORIZATION)
    app?.unmount()
  })


  it('try auth', async () => {
    const [result, app] = withSetup(useLogin)

    const authData = {
      username: '1',
      password: '1'
    }

    spyAuthService.mockImplementation(() => Promise.resolve({
      data: {
        auth_token: '123'
      }
    }))

    const resultLogin = await result.login(authData)
    await flushPromises();
    expect(resultLogin.errors[0]).toEqual(ERRORS.CANT_GET_USER_DATA)
    app?.unmount()
  })

  it('try get user without data', async () => {
    const authData = {
      username: '1',
      password: '1'
    }

    const spy = vi.spyOn(AuthService.prototype, 'login')
    spy.mockImplementation(() => Promise.resolve({
      data: {
        auth_token: '123'
      }
    }))

    const spyGetCurrentUser = vi.spyOn(UserService.prototype, 'getCurrentUser')
    spyGetCurrentUser.mockImplementation(() => Promise.resolve({ data: undefined }))
    const spyNotify = vi.spyOn(NotificationService.prototype, 'error')

    const [result, app] = withSetup(useLogin)
    const resultLogin = await result.login(authData)
    await flushPromises();
    expect(spyNotify).toHaveBeenCalledWith(ERRORS.NOT_HAVE_USER)
    expect(resultLogin).toEqual(undefined)
    app?.unmount()
  })


  it('catch get user', async () => {
    const authData = {
      username: '1',
      password: '1'
    }

    const spy = vi.spyOn(AuthService.prototype, 'login')
    spy.mockImplementation(() => Promise.resolve({ data: { auth_token: '123' } }))

    const spyGetCurrentUser = vi.spyOn(UserService.prototype, 'getCurrentUser')
    spyGetCurrentUser.mockImplementation(() => Promise.reject())
    const spyNotify = vi.spyOn(NotificationService.prototype, 'error')

    const [result, app] = withSetup(useLogin)
    const resultLogin = await result.login(authData)
    await flushPromises();
    expect(spyNotify).toHaveBeenCalledWith(ERRORS.CANT_GET_USER_DATA)
    expect(resultLogin.errors[0]).toEqual(ERRORS.CANT_GET_USER_DATA)
    app?.unmount()
  })

  it('try get user with response data', async () => {
    const authData = {
      username: '1',
      password: '1'
    }

    const spy = vi.spyOn(AuthService.prototype, 'login')
    spy.mockImplementation(() => Promise.resolve({
      data: {
        auth_token: '123'
      }
    }))

    const spyGetCurrentUser = vi.spyOn(UserService.prototype, 'getCurrentUser')
    spyGetCurrentUser.mockImplementation(() => Promise.resolve({ data: { user: 1 } }))
    const spyNotify = vi.spyOn(NotificationService.prototype, 'error')
    const VueRouter = await import('vue-router');
    const mockedRouterPush = vi.fn()
    VueRouter.useRouter.mockReturnValueOnce({
      push: mockedRouterPush
    })
    const [result, app] = withSetup(useLogin)
    const resultLogin = await result.login(authData)

    console.log(resultLogin, 'test')
    await flushPromises();
    expect(spyNotify).not.toHaveBeenCalled()
    expect(mockedRouterPush).toHaveBeenCalledWith({
      name: ROUTER_NAMES.HOME
    })
    // expect(resultLogin).toEqual(undefined)
    app?.unmount()
  })
})