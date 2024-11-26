import { fetchData } from '@/configs/fetchConfig'
import { REQUEST_TYPE } from '@/constant/app'

const AdminApi = {
  createCategories: async (body: any) => {
    return fetchData({
      url: `/category/create`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  updateCategories: async (id: string, body: any) => {
    return fetchData({
      url: `/category/update/${id}`,
      method: REQUEST_TYPE.PUT,
      body,
    })
  },
  deleteCategories: async (id: string) => {
    return fetchData({
      url: `category/delete/${id}`,
      method: REQUEST_TYPE.DELETE,
    })
  },
  getCategories: async (url: string) => {
    return fetchData({ url })
  },
  getListProducts: async (queryUrl: string) => {
    return fetchData({
      url: `product/admin/all${queryUrl}`,
    })
  },
  getBills: async (queryUrl: string) => {
    return fetchData({
      url: `bill/admin/all${queryUrl}`,
    })
  },
  createProduct: async (body: any) => {
    return fetchData({
      url: '/product/create',
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  updateProduct: async (id: string, body: any) => {
    return fetchData({
      url: `/product/update/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  getRevenue: async (queryUrl: string) => {
    return fetchData({
      url: `/revenue/admin/limit${queryUrl}`,
    })
  },
}

export default AdminApi
