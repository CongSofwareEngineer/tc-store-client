import { DataBase, FB_FC, QueryData } from "@/constant/firebase"
import { decryptData, encryptData } from "@/utils/crypto"
import { pareResponseDataClient } from "@/utils/serverNext"
import axios from "axios"

type TypeParma = {
  nameDB: string,
  namFn?: string,
  body?: {
    data?: string,
    id?: string,
    queryData?: QueryData,
    queryListData?: QueryData[]
  },
  encode?: boolean
} & Record<string, string | object | boolean>


const ClientApi = {
  requestBase: async (param: TypeParma = {
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
      console.log('====================================');
      console.log({ error });
      console.log('====================================');
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
  }
}
export default ClientApi