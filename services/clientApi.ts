import { COOKIE_KEY, OBSERVER_KEY, REQUEST_TYPE } from '@/constant/app'
import { getCookie, setCookie } from './CookeisService'
import fetchConfig from '@/configs/fetchConfig'
import ObserverService from './observer'

export type ClientAPITypeParam = {
  url?: string
  body?: any
  auth?: string
  method?: REQUEST_TYPE
  timeOut?: number
  isAthu?: boolean
}

const ClientApi = {
  fetchData: async (
    param: ClientAPITypeParam = {
      isAthu: true,
      method: REQUEST_TYPE.GET,
    }
  ): Promise<{
    data: any
    error?: any
    messages: any
  }> => {
    try {
      let athu: string | null = ''
      if (param.method !== REQUEST_TYPE.GET && param.isAthu) {
        athu = await getCookie(COOKIE_KEY.Auth)
        if (!athu && param.isAthu) {
          const authRefresh = await getCookie(COOKIE_KEY.AuthRefresh)
          if (!authRefresh) {
            ObserverService.emit(OBSERVER_KEY.LogOut)
            return {
              data: null,
              messages: 'fail',
              error: 'login expired',
            }
          }
          const newAthu = await fetchConfig({
            url: 'auth/refresh',
            isAthu: false,
            auth: authRefresh.toString(),
          })
          if (newAthu?.data?.token) {
            athu = newAthu?.data?.token
            setCookie(COOKIE_KEY.Auth, newAthu?.data?.token)
          }
        }
      }
      return fetchConfig({ ...param, auth: athu || '' })
    } catch (error) {
      return {
        data: null,
        messages: 'fail',
        error: 'server_error',
      }
    }
  },
}
export default ClientApi
