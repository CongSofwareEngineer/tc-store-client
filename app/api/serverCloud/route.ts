

import { DataBase, FB_FC } from '@/constant/firebase';
import { ClientAPITypeParam } from '@/services/clientApi';
import { FirebaseConfig } from '@/services/firebaseService';
import { processQuery } from '@/utils/functions';
import { formatResponseDataServer, pareDataClient } from '@/utils/serverNext';
type ReqType = ClientAPITypeParam

export async function POST(req: any) {
  try {
    const bodyDecode: ReqType = await pareDataClient(req)

    if (!bodyDecode[process.env.NEXT_PUBLIC_KEY_SALT]) {
      return new Response('You are hacker', { status: 500 })
    }

    const dataFB = FirebaseConfig.createFBFun(bodyDecode.nameDB)
    let dataRequest: any
    let listData
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
            price: product.price,
            ...e,
          }
        })
        break;

      case FB_FC.getProductShop:
        if (bodyDecode.body?.queryListData && bodyDecode.body?.queryListData?.length > 0) {
          listData = await dataFB.queryData('typeProduct', 'in', bodyDecode.body?.queryListData)
        } else {
          listData = await dataFB.getAllData()
        }
        dataRequest = listData.map((e: any) => {
          delete e.cost
          return e
        })

        break;

      case FB_FC.getDataByLimit:
        if (bodyDecode?.body?.queryData) {
          listData = await dataFB.queryDataByLimit(bodyDecode?.body?.queryData, bodyDecode?.body?.data?.limit)
          dataRequest = listData.map((e: any) => {
            delete e.cost
            return e
          })
        }
        break;
    }
    const query = {
      page: bodyDecode.body?.data?.page,
      limit: bodyDecode.body?.data?.limit
    }


    dataRequest = processQuery(dataRequest, query)
    return formatResponseDataServer(dataRequest, bodyDecode)

  } catch (error) {
    return new Response('You are hacker', { status: 500 })
  }

}
