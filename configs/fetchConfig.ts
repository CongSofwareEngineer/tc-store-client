import { RequestType } from '@/constant/app';
import axios from 'axios';

const fetchConfig = async ({
  url = '',
  body = null,
  isAThu = false,
  method = RequestType.GET,
  timeOut = 7000
}) => {
  // const urlFormat = process.env.NEXT_PUBLIC_API_APP + url
  const config: any = {
    // baseURL: (process.env.NEXT_PUBLIC_API_APP || 'http://192.168.50.115:3002/').trim(),
    baseURL: 'https://server-tc-store.vercel.app',
    url,
    // cache: isCache ? 'force-cache' : 'no-store',
    method,
    headers: {},
    signal: AbortSignal.timeout(timeOut)

  };

  if (body) {
    config.data = body
  }
  if (isAThu) {
    config.headers.AThu = '';
  }

  return await axios.request(config)
    .then(async (response) => {
      return {
        ...(response?.data ?? response),
        messages: 'success'
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        data: null,
        messages: 'fail',
        error
      }
    })
};
export default fetchConfig;
