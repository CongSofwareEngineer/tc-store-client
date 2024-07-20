
import fetchConfig, { ServerAPIReqType } from '@/configs/fetchConfig';
import { COOKIE_KEY, REQUEST_TYPE } from '@/constant/app';
import { formatResponseDataServer, pareDataClient } from '@/utils/serverNext';

export async function POST(req: any) {
  try {
    let auth
    let authRefresh
    const bodyDecode: any = await pareDataClient(req)
    if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
      return new Response('You are hacker', { status: 500 })
    }
    console.log({ bodyDecode });

    if (bodyDecode?.checkAuth) {
      auth = req.cookies?._parsed.get(COOKIE_KEY.Auth)
      authRefresh = req.cookies?._parsed.get(COOKIE_KEY.AuthRefresh)
      auth = auth?.value ? JSON.parse(auth?.value) : null
      authRefresh = authRefresh?.value ? JSON.parse(authRefresh?.value) : null

      if (!auth && authRefresh?.value) {
        const resNewAuth = await fetchConfig({
          url: `auth/refresh`,
          method: REQUEST_TYPE.POST,
          auth: authRefresh?.value
        })
        auth = resNewAuth?.data?.token || ''
      }
    }

    const config: ServerAPIReqType = {
      url: bodyDecode.url,
      method: bodyDecode.method || REQUEST_TYPE.GET,
      auth: auth,
    }
    console.log({ config });

    switch (bodyDecode.method) {
      case REQUEST_TYPE.POST:
      case REQUEST_TYPE.PUT:
        config.body = bodyDecode.body
        break;
    }

    const dataRequest = await fetchConfig(config)
    return formatResponseDataServer(dataRequest?.data, bodyDecode)
  } catch (error) {
    return new Response('You are hacker', {
      status: 500
    }
    )

  }

}
