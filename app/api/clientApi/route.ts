

import { FB_FC } from '@/constant/firebase';
import { FirebaseConfig } from '@/services/firebaseService';
import { formatResponseDataServer, pareDataClient } from '@/utils/serverNext';

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
    return formatResponseDataServer({ data: dataRequest }, bodyDecode)

  } catch (error) {
    return new Response('You are hacker',
      {
        status: 500
      }
    )

  }

}
