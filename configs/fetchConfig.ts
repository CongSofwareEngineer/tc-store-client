import { COOKIE_KEY, REQUEST_TYPE } from '@/constant/app'
import { getCookie } from '@/services/CookeisService'
import { decryptData, encryptData } from '@/utils/crypto'
import axios from 'axios'

export type ServerAPIReqType = {
  url?: string
  body?: any
  auth?: string
  method?: REQUEST_TYPE
  timeOut?: number
  isAthu?: boolean
}

const fetchConfig = async ({
  url = '',
  body = null,
  auth = '',
  method = REQUEST_TYPE.GET,
  timeOut = 70000,
}: ServerAPIReqType): Promise<{ data: any; error?: any; messages: any }> => {
  const baseUrl =
    process.env.NEXT_PUBLIC_ENABLE_SERVER_LOCAL === 'true'
      ? 'http://localhost:3000/'
      : process.env.NEXT_PUBLIC_API_APP
  const config: any = {
    // baseURL: (process.env.NEXT_PUBLIC_API_APP || 'http://192.168.50.115:3002/').trim(),
    baseURL: baseUrl,
    url,
    // cache: isCache ? 'force-cache' : 'no-store',
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(timeOut),
  }

  if (body) {
    if (method !== REQUEST_TYPE.GET) {
      config.data = {
        data: encryptData(body),
      }
    } else {
      config.params = body
    }
  }

  if (auth) {
    config.headers.Authorization = auth
  }

  return await axios
    .request(config)
    .then(async (response) => {
      if (response.status === 200) {
        let data = response?.data?.data || response?.data || response

        if (method !== REQUEST_TYPE.GET) {
          data = decryptData(data)
        }

        return {
          data: data,
          messages: 'success',
        }
      }
      return {
        data: null,
        messages: 'fail',
      }
    })
    .catch((error) => {
      return {
        data: null,
        messages: 'fail',
        error,
      }
    })
}
export default fetchConfig
