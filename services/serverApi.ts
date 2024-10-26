import { COOKIE_KEY, OBSERVER_KEY, REQUEST_TYPE } from '@/constant/app'
import { encryptData } from '@/utils/crypto'
import { pareResponseDataClient } from '@/utils/serverNext'
import axios from 'axios'
import { getCookie } from './CookiesService'
import ObserverService from './observer'

type TypeParma = {
  url: string
  method?: string
  body?: object | null
  encode?: boolean
  checkAuth?: boolean
  [key: string]: any
}

const ServerApi = {
  fetchSever: async () => {},
  requestBase: async ({
    url = '',
    body = null,
    checkAuth = true,
    encode = false,
    method = REQUEST_TYPE.GET,
  }: TypeParma) => {
    try {
      const param: TypeParma = {
        url,
        method,
        body,
        encode,
        checkAuth,
      }

      const [auth, authRefresh] = await Promise.all([
        getCookie(COOKIE_KEY.Auth),
        getCookie(COOKIE_KEY.AuthRefresh),
      ])

      if (
        param.checkAuth &&
        !authRefresh &&
        (param.method === REQUEST_TYPE.POST ||
          param.method === REQUEST_TYPE.DELETE)
      ) {
        ObserverService.emit(OBSERVER_KEY.LogOut)
        return {
          data: null,
          error: 'error',
        }
      }
      param[process.env.NEXT_PUBLIC_KEY_SALT] = process.env.NEXT_PUBLIC_KEY_SALT
      const bodyAPI: any = {
        data: encryptData(JSON.stringify(param)),
      }
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_API === 'true') {
        bodyAPI.url = `${param.url}`
      }
      const req = await axios.post('/api/serverApi', bodyAPI, {
        headers: {
          'Content-Type': 'application/json',
          authorization: auth?.toString() || '',
        },
      })

      return pareResponseDataClient(param, req?.data)
    } catch (error) {
      console.log({ errorrequestBase: error })
      return {
        data: null,
        error: error,
      }
    }
  },
  getProduct: async (query = '') => {
    const res = await ServerApi.requestBase({
      url: `all-product${query}`,
    })
    return res
  },
  getLengthCart: async (idUser: string) => {
    const res = await ServerApi.requestBase({
      url: `length-cart/${idUser}`,
    })
    return res
  },
  getAllCart: async (idUser: string, query: string) => {
    const res = await ServerApi.requestBase({
      url: `all-cart/${idUser}${query}`,
    })
    return res.data
  },
}
export default ServerApi
