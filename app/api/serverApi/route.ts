
import fetchConfig from '@/configs/fetchConfig';
import { RequestType } from '@/constant/app';
import { decryptData, encryptData } from '@/utils/crypto';
import { pareDataClient } from '@/utils/serverNext';

export async function POST(req: any) {
  try {
    let bodyDecode: any = await pareDataClient(req)

    if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
      return new Response('You are hacker',
        {
          status: 500
        }
      )

    }

    const bodyData = bodyDecode.body

    const config: any = {
      url: bodyDecode.url,
      method: bodyDecode.method || RequestType.GET,
      isCache: false,
    }
    switch (bodyData?.method) {
      case RequestType.POST:
      case RequestType.PUT:
        config.body = bodyData.body
        break;
    }
    if (bodyData?.isAThu) {
      config.isAThu = true
    }
    const dataRequest = await fetchConfig(config)
    if (bodyDecode?.encode) {
      const res = new Response(encryptData(JSON.stringify(dataRequest)), { status: 200 })
      return res

    }
    const res = new Response(JSON.stringify(dataRequest), { status: 200 })
    return res

  } catch (error) {
    return new Response('You are hacker',
      {
        status: 500
      }
    )

  }

}
