import { RequestType } from '@/constant/app';
import axios from 'axios';

export type ServerAPIReqType = {
  url: string
  body?: any
  auth?: string
  method?: RequestType
  timeOut?: number
}
const fetchConfig = async ({
  url = '',
  body = null,
  auth = '',
  method = RequestType.GET,
  timeOut = 70000
}: ServerAPIReqType) => {
  // const urlFormat = process.env.NEXT_PUBLIC_API_APP + url

  const config: any = {
    // baseURL: (process.env.NEXT_PUBLIC_API_APP || 'http://192.168.50.115:3002/').trim(),
    baseURL: 'http://localhost:3000/',
    url,
    // cache: isCache ? 'force-cache' : 'no-store',
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    signal: AbortSignal.timeout(timeOut),
  };

  if (body) {
    config.data = body
  }
  if (auth) {
    config.headers.Authorization = auth
  }

  return await axios.request(config)
    .then(async (response) => {
      if (response.status === 200) {
        return {
          ...(response?.data ?? response),
          messages: 'success'
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
        error
      }
    })
};
export default fetchConfig;
