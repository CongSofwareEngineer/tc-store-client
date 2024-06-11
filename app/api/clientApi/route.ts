

import { FB_FC } from '@/constant/firebase';
import { FirebaseConfig } from '@/services/firebaseService';
import { decryptData, encryptData } from '@/utils/crypto';

export async function POST(req: any) {
  try {

    const dataReq = await req.json()

    let bodyDecode: any = decryptData(dataReq.data)
    bodyDecode = JSON.parse(bodyDecode)

    if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
      return new Response('You are hacker',
        {
          status: 500
        }
      )

    }

    const bodyData = bodyDecode.body
    console.log('====================================');
    console.log({ bodyData, bodyDecode });
    console.log('====================================');

    const dataFB = FirebaseConfig.createFBFun(bodyDecode.nameDB)
    let dataRequest: any

    switch (bodyDecode.namFn) {
      case FB_FC.queryListData:
        dataRequest = await dataFB.listQueryData(bodyData[FB_FC.queryListData])
        break;
    }

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
