import { PageSizeLimit } from "@/constant/app"
import { BodyAddBill, BodyAddCart, DataBase, FB_FC, QueryData } from "@/constant/firebase"
import { encryptData } from "@/utils/crypto"
import { pareResponseDataClient } from "@/utils/serverNext"
import axios from "axios"

export type ClientAPITypeParam = {
  nameDB: string
  namFn?: string
  body?: {
    data?: { [key: string]: any }
    id?: string | null
    queryData?: QueryData
    queryListData?: QueryData[]
  }
  encode?: boolean
  [key: string]: any
}


const ClientApi = {
  reqServerFB: async (param: ClientAPITypeParam = {
    nameDB: '',
    namFn: '',
    body: {},
    encode: false
  }) => {
    try {
      let req = null
      param[process.env.NEXT_PUBLIC_KEY_SALT] = process.env.NEXT_PUBLIC_KEY_SALT

      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_API === 'true') {
        req = await axios.post('/api/serverCloud', {
          data: encryptData(JSON.stringify(param)),
          nameDB: `${param.nameDB}`,
          namFn: `${param.namFn}`
        })
      } else {
        req = await axios.post('/api/clientApi', { data: encryptData(JSON.stringify(param)) })
      }
      return pareResponseDataClient(param, req)

    } catch (error) {
      return {
        data: null,
        error: 'error?.response?.data?.message'
      }
    }
  },
  requestBase: async (param: ClientAPITypeParam = {
    nameDB: '',
    namFn: '',
    body: {},
    encode: false
  }) => {
    try {
      let req = null
      param[process.env.NEXT_PUBLIC_KEY_SALT] = process.env.NEXT_PUBLIC_KEY_SALT

      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_API === 'true') {
        req = await axios.post('/api/clientApi', {
          data: encryptData(JSON.stringify(param)),
          nameDB: `${param.nameDB}`,
          namFn: `${param.namFn}`
        })
      } else {
        req = await axios.post('/api/clientApi', { data: encryptData(JSON.stringify(param)) })
      }
      return pareResponseDataClient(param, req)

    } catch (error) {
      return {
        data: null,
        error: 'error?.response?.data?.message'
      }
    }
  },

  login: async (paramsListQuery: QueryData[]) => {
    const req = await ClientApi.requestBase({
      nameDB: DataBase.user,
      namFn: FB_FC.queryListData,
      body: {
        queryListData: paramsListQuery
      },
      encode: true
    })
    return req
  },

  getDataOption2: async (nameData: string, lastData: any, keyOderBy: string, limitPage = PageSizeLimit) => {
    const req = await ClientApi.requestBase({
      nameDB: nameData,
      namFn: FB_FC.getAllDataOption2,
      body: {
        data: {
          dataLast: lastData,
          keyOderBy: keyOderBy,
          limitPage: limitPage
        }
      }
    })
    return req
  },

  createCart: async (data: BodyAddCart) => {
    const req = await ClientApi.requestBase({
      nameDB: DataBase.cartUser,
      namFn: FB_FC.addData,
      body: {
        data
      }
    })
    return req
  },

  removeCart: async (id: string) => {
    const req = await ClientApi.requestBase({
      nameDB: DataBase.cartUser,
      namFn: FB_FC.deleteData,
      body: {
        id
      }
    })
    return req
  },

  updateAddress: async (isUser: string | undefined, data: string[]) => {
    const req = await ClientApi.requestBase({
      nameDB: DataBase.user,
      body: {
        id: isUser,
        data: {
          addressShipper: data,
        },
      },
      namFn: FB_FC.updateData,
      encode: true,
    })
    return req
  },

  updateProductToSold: async (id: string, amountSold: number) => {
    const item = await ClientApi.requestBase({
      nameDB: DataBase.productShop,
      body: {
        id
      },
      namFn: FB_FC.getDataByID,
    })
    const amountSoldNew = item.data.sold + amountSold
    // await ClientApi.requestBase({
    //   nameDB: DataBase.productShop,
    //   body: {
    //     data: {
    //       sold: amountSoldNew
    //     },
    //     id
    //   },
    //   namFn: FB_FC.updateData,
    // })

  },

  createBill: async (bodyBill: BodyAddBill) => {
    const litsProductFun = bodyBill.listProduction.map(e => {
      return ClientApi.updateProductToSold(e.idProduct, e.amount)
    })
    Promise.all(litsProductFun)

    // await ClientApi.requestBase({
    //   nameDB: DataBase.bill,
    //   body: {
    //     data: bodyBill,
    //   },
    //   encode: true,
    //   namFn: FB_FC.addData,
    // })


  }
}
export default ClientApi