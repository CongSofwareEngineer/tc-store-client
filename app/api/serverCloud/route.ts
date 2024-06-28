

import { DataBase, FB_FC } from '@/constant/firebase';
import { ClientAPITypeParam } from '@/services/clientApi';
import { FirebaseConfig } from '@/services/firebaseService';
import { formatResponseDataServer, pareDataClient } from '@/utils/serverNext';
import { processQuery } from './function';
type ReqType = ClientAPITypeParam
export async function POST(req: ReqType) {
  try {
    const bodyDecode: ReqType = await pareDataClient(req)

    if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
      return new Response('You are hacker', { status: 500 })
    }

    const dataFB = FirebaseConfig.createFBFun(bodyDecode.nameDB)
    let dataRequest: any

    switch (bodyDecode.namFn) {
      case FB_FC.getMyCart:
        const listCart = await dataFB.queryData('idUser', '==', bodyDecode.body?.id?.toString())
        const listIdKeyNameProduct = listCart.map(e => e.keyNameProduct)

        const dataProduct = FirebaseConfig.createFBFun(DataBase.productShop)
        const listProduct = await dataProduct.queryData('keyName', 'in', listIdKeyNameProduct)
        dataRequest = listCart.map(e => {
          const product = listProduct.find(p => p.keyName === e.keyNameProduct)
          return {
            imageMain: product.imageMain,
            typeProduct: product.typeProduct,
            sold: product.sold,
            imageOther: product.imageOther,
            weight: product.weight,
            name: product.name,
            disCount: product.disCount,
            totalAmount: product.amount,
            moreConfig: product.moreConfig || {},
            ...e,
          }
        })
        break;

    }
    const query = {
      page: bodyDecode.body?.data?.page,
      limit: bodyDecode.body?.data?.limit
    }
    dataRequest = processQuery(dataRequest, query)
    // return formatResponseDataServer({ data: 123 }, bodyDecode)

    return formatResponseDataServer(dataRequest, bodyDecode)

  } catch (error) {
    return new Response('You are hacker', { status: 500 })
  }

}
