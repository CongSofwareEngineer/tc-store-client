import { REQUEST_TYPE } from '@/constant/app'
import { ClientAPITypeParam, fetchData } from '@/configs/fetchConfig'
import { BodyAddBill } from '@/constant/firebase'
import { encryptData } from '@/utils/crypto'
import { PATH_IMG } from '@/constant/mongoDB'

const ClientApi = {
  pingServer: async () => {
    return fetchData({ url: `/auth/ping` })
  },
  uploadImg: async (file: any, path: PATH_IMG) => {
    return fetchData({
      url: `/upload-image/upload`,
      method: REQUEST_TYPE.POST,
      body: {
        file,
        path,
      },
    })
  },
  login: async (body: any) => {
    return fetchData({
      url: `user/login`,
      method: REQUEST_TYPE.POST,
      body,
      isAuth: false,
    })
  },
  register: async (body: any) => {
    return fetchData({
      url: `user/register`,
      method: REQUEST_TYPE.POST,
      body,
      isAuth: false,
    })
  },
  updateAvatar: async (id: string | undefined, file: any) => {
    const publicId = file.public_id
    delete file.public_id
    return fetchData({
      url: `user/update-avatar/${id}`,
      body: {
        file: file,
        publicId,
      },
      method: REQUEST_TYPE.POST,
    })
  },
  updateUser: async (id: string | undefined, body: any) => {
    return fetchData({
      url: `user/update/${id}`,
      body,
      method: REQUEST_TYPE.POST,
    })
  },
  getCategory: async () => {
    return fetchData({
      url: `category/all?isShow=true&timeStamp=${new Date().getHours()}`,
      isAuth: false,
    })
  },
  buyNoLogin: async (bodyAPI: BodyAddBill) => {
    const dataEncode = encryptData(bodyAPI)
    return fetchData({
      url: `bill/no-login/create?data=${dataEncode}`,
      isAuth: false,
    })
  },
  buy: async (bodyAPI: BodyAddBill) => {
    const config: ClientAPITypeParam = {
      url: 'bill/create',
      body: bodyAPI,
      method: REQUEST_TYPE.POST,
    }
    return fetchData(config)
  },
  deleteBill: async (idBill: string) => {
    const config: ClientAPITypeParam = {
      url: `bill/delete/${idBill}`,
      method: REQUEST_TYPE.DELETE,
    }
    return fetchData(config)
  },
  getMyCart: async (queryUrl: string) => {
    return fetchData({
      url: `cart/detail/${queryUrl}`,
    })
  },
  createMyCart: async (body: any) => {
    return fetchData({
      url: 'cart/create',
      body,
      method: REQUEST_TYPE.POST,
    })
  },
  updateMyCart: async (id: string, body: any) => {
    return fetchData({
      url: `cart/update-cart/${id}`,
      body,
      method: REQUEST_TYPE.POST,
    })
  },
  getCartDetail: async (idUser: string, idProduct: string) => {
    return fetchData({
      url: `/cart/details/${idUser}/${idProduct}`,
    })
  },
  deleteCart: async (id: string) => {
    return fetchData({
      url: `/cart/delete/${id}`,
      method: REQUEST_TYPE.DELETE,
    })
  },
  getLengthCart: async (queryUrl: string) => {
    return fetchData({
      url: `/cart/length-cart/${queryUrl}`,
    })
  },
  getProductByKeyName: async (keyName: string) => {
    return fetchData({
      url: `product/detail-keyName/${keyName}`,
      isAuth: false,
    })
  },
  getProducts: async (queryUrl: string) => {
    return fetchData({
      url: `product/all${queryUrl}`,
    })
  },
  getProductById: async (id: string) => {
    return fetchData({
      url: `/product/detail/${id}`,
    })
  },
  getComments: async (queryUrl: string) => {
    return fetchData({
      url: `/comment/detail/${queryUrl}`,
    })
  },
  createComment: async (body: any) => {
    return fetchData({
      url: 'comment/create',
      method: REQUEST_TYPE.POST,
      body: body,
    })
  },
  updateComment: async (id: string, body: any) => {
    return fetchData({
      url: `comment/update/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  getBills: async (queryUrl: string) => {
    return fetchData({
      url: `bill/detail/${queryUrl}`,
    })
  },
  createContact: async (body: any) => {
    return fetchData({
      url: 'contact-me/create',
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  updateTokenNotification: async (token: string) => {
    return fetchData({
      url: 'token-noti/create',
      method: REQUEST_TYPE.POST,
      body: { token },
    })
  },
}
export default ClientApi
