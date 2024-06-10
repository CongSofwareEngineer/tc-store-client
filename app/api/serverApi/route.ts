
import fetchConfig from '@/configs/fetchConfig';
import { RequestType } from '@/constant/app';
import { decryptData, encryptData } from '@/utils/crypto';
// import { NextResponse } from 'next/server';



export async function POST(req: any) {
  try {

    const dataReq = await req.json()


    let bodyDecode: any = decryptData(dataReq.data)
    bodyDecode = JSON.parse(bodyDecode)

    if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
      // return NextResponse.json({ error: 'You are hacker' }, { status: 500 });
      return new Response('You are hacker',
        {
          status: 500
        }
      )
      // return Response.json('You are hacker', { status: 500 })

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
    // return NextResponse.json({ error: 'You are hacker' }, { status: 500 });
    return new Response('You are hacker',
      {
        status: 500
      }
    )
    // return Response.json('You are hacker', { status: 500 })
  }

}
