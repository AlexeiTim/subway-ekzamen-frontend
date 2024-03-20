import { useLogin } from "@/composables/useLogin";
import { ERRORS } from "@/constants/errors";
import { ROUTER_NAMES } from "@/constants/router";
import { AuthService } from "@/services/api/rest/auth";
import { UserService } from "@/services/api/rest/user";
import { NotificationService } from "@/services/notify/notification";
import { flushPromises } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { withSetup } from "../utils/withSetup";

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
const authData = {
  username: '1',
  password: '1'
}

const emptyAuthData = {
  username: '',
  password: ''
}

const spyAuthService = vi.spyOn(AuthService.prototype, 'login')
const spyNotificationService = vi.spyOn(NotificationService.prototype, 'error')
const spyUserSerivceGetCurrentUser = vi.spyOn(UserService.prototype, 'getCurrentUser')


describe('useLogin', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('catch auth', async () => {
    const { login } = useLogin()

    spyAuthService.mockImplementation((data) => Promise.reject(data))

    const result = await login(emptyAuthData)

    expect(result.errors.join('')).toEqual(ERRORS.NOT_HAVE_USER)
  })

  it('try auth without response data', async () => {
    const { login } = useLogin()
    spyAuthService.mockImplementation(() => Promise.resolve({ data: undefined }))

    await login(emptyAuthData)

    expect(spyNotificationService).toHaveBeenCalledWith(ERRORS.NOT_AUTHORIZATION)
  })


  it('try auth', async () => {
    const { login } = useLogin()

    spyAuthService.mockImplementation(() => Promise.resolve({
      data: {
        auth_token: '123'
      }
    }))
    spyUserSerivceGetCurrentUser.mockImplementation(() => Promise.reject())
    spyNotificationService.mockImplementation(() => { })

    const { errors } = await login(authData)

    expect(errors[0]).toEqual(ERRORS.CANT_GET_USER_DATA)
    expect(spyUserSerivceGetCurrentUser).toHaveBeenCalled()
    expect(spyNotificationService).toHaveBeenCalledWith(ERRORS.CANT_GET_USER_DATA)
  })

  it('try get user without data', async () => {
    const { login } = useLogin()
    spyAuthService.mockImplementation(() => Promise.resolve({
      data: {
        auth_token: '123'
      }
    }))
    spyUserSerivceGetCurrentUser.mockImplementation(() => Promise.resolve({ data: undefined }))

    const result = await login(authData)

    expect(spyNotificationService).toHaveBeenCalledWith(ERRORS.NOT_HAVE_USER)
    expect(result).toEqual(undefined)
  })


  it('catch get user', async () => {
    const { login } = useLogin()
    spyAuthService.mockImplementation(() => Promise.resolve({ data: { auth_token: '123' } }))
    spyUserSerivceGetCurrentUser.mockImplementation(() => Promise.reject())

    const { errors } = await login(authData)

    expect(spyNotificationService).toHaveBeenCalledWith(ERRORS.CANT_GET_USER_DATA)
    expect(errors[0]).toEqual(ERRORS.CANT_GET_USER_DATA)
  })

  it('try get user with response data', async () => {

    const VueRouter = await import('vue-router');
    spyAuthService.mockImplementation(() => Promise.resolve({
      data: {
        auth_token: '123'
      }
    }))
    spyUserSerivceGetCurrentUser.mockImplementation(() => Promise.resolve({ data: { user: 1 } }))
    const mockedRouterPush = vi.fn()

    VueRouter.useRouter.mockReturnValueOnce({
      push: mockedRouterPush
    })

    const [result, app] = withSetup(useLogin)
    const resultLogin = await result.login(authData)

    await flushPromises();
    expect(spyNotificationService).not.toHaveBeenCalled()
    expect(mockedRouterPush).toHaveBeenCalledWith({
      name: ROUTER_NAMES.HOME
    })
    app?.unmount()
  })
})