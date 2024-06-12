
import fetchConfig from '@/configs/fetchConfig';
import { RequestType } from '@/constant/app';
import { formatResponseDataServer, pareDataClient } from '@/utils/serverNext';

export async function POST(req: any) {
  try {
    const bodyDecode: any = await pareDataClient(req)

    if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
      return new Response('You are hacker', {
        status: 500
      }
      )
    }
    const config: any = {
      url: bodyDecode.url,
      method: bodyDecode.method || RequestType.GET,
      isCache: false,
    }

    switch (bodyDecode.body?.method) {
      case RequestType.POST:
      case RequestType.PUT:
        config.body = bodyDecode.body.body
        break;
    }
    if (bodyDecode.body?.isAThu) {
      config.isAThu = true
    }
    const dataRequest = await fetchConfig(config)
    return formatResponseDataServer(dataRequest, bodyDecode)


  } catch (error) {
    return new Response('You are hacker', {
      status: 500
    }
    )

  }

}
