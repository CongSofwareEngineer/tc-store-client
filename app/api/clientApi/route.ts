

import { FB_FC } from '@/constant/firebase';
import { FirebaseConfig } from '@/services/firebaseService';
import { formatResponseDataServer, pareDataClient } from '@/utils/serverNext';

export async function POST(req: any) {
  try {
    const bodyDecode: any = await pareDataClient(req)

    if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
      return new Response('You are hacker', { status: 500 })
    }

    const dataFB = FirebaseConfig.createFBFun(bodyDecode.nameDB)
    let dataRequest: any

    switch (bodyDecode.namFn) {
      case FB_FC.queryListData:
        dataRequest = await dataFB.listQueryData(bodyDecode.body[FB_FC.queryListData])
        break;
      case FB_FC.updateData:
        dataRequest = await dataFB.updateData(bodyDecode.body.id, bodyDecode.body.data)
        break;
    }
    return formatResponseDataServer(dataRequest, bodyDecode)

  } catch (error) {
    return new Response('You are hacker', { status: 500 })
  }

}
