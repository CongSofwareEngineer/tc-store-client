
import fetchConfig, { ServerAPIReqType } from '@/configs/fetchConfig';
import { CookieKey, RequestType } from '@/constant/app';
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
      auth = req.cookies?._parsed.get(CookieKey.Auth)
      authRefresh = req.cookies?._parsed.get(CookieKey.AuthRefresh)
      auth = auth?.value ? JSON.parse(auth?.value) : null
      authRefresh = authRefresh?.value ? JSON.parse(authRefresh?.value) : null

      if (!auth && authRefresh?.value) {
        const resNewAuth = await fetchConfig({
          url: `auth/refresh`,
          method: RequestType.POST,
          auth: authRefresh?.value
        })
        auth = resNewAuth?.data?.token || ''
      }
    }

    const config: ServerAPIReqType = {
      url: bodyDecode.url,
      method: bodyDecode.method || RequestType.GET,
      auth: auth,
    }
    console.log({ config });

    switch (bodyDecode.method) {
      case RequestType.POST:
      case RequestType.PUT:
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
