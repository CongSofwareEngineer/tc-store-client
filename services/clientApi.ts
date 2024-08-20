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
    param: ClientAPITypeParam
  ): Promise<{
    data: any
    error?: any
    messages: any
  }> => {
    try {
      let athu: string | null = ''
      const config: ClientAPITypeParam = {
        isAthu: true,
        method: REQUEST_TYPE.GET,
        ...param,
      }
      console.log({ config })

      if (config.method !== REQUEST_TYPE.GET && config.isAthu) {
        athu = await getCookie(COOKIE_KEY.Auth)
        console.log('====================================')
        console.log({ athu })
        console.log('====================================')
        if (!athu && config.isAthu) {
          const authRefresh = await getCookie(COOKIE_KEY.AuthRefresh)
          console.log('====================================')
          console.log({ authRefresh })
          console.log('====================================')
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
            method: REQUEST_TYPE.POST,
          })
          console.log({ newAthu })

          if (newAthu?.data?.token) {
            athu = newAthu?.data?.token
            setCookie(COOKIE_KEY.Auth, newAthu?.data?.token)
          }
        }
      }
      return fetchConfig({ ...config, auth: athu || '' })
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
