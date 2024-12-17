import { fetchData } from '@/configs/fetchConfig'
import { REQUEST_TYPE } from '@/constant/app'

const AdminApi = {
  updateFanPage: async (id: TimeRanges, body: Object) => {
    const res = await fetchData({
      url: `fan-page/update/${id}`,
      body,
      method: REQUEST_TYPE.PUT,
    })
    return res
  },
  getFanPage: async () => {
    const res = await fetchData({
      url: `fan-page/all`,
    })
    return res
  },
  createFanPage: async (body: Object) => {
    const res = await fetchData({
      url: `fan-page/create`,
      body,
      method: REQUEST_TYPE.POST,
    })
    return res
  },
  deleteFanPage: async (body: Object) => {
    const res = await fetchData({
      url: `fan-page/delete`,
      body,
      method: REQUEST_TYPE.POST,
    })
    return res
  },
  updateBill: async (idBill: string, body: any) => {
    const res = await fetchData({
      url: `bill/update/${idBill}`,
      body,
      method: REQUEST_TYPE.POST,
    })
    return res
  },
  deleteBill: async (idBill: string) => {
    const res = await fetchData({
      url: `bill/delete/${idBill}`,
      method: REQUEST_TYPE.DELETE,
    })
    return res
  },
  deleteProduct: async (id: string, imageDelete?: string[]) => {
    const res = await fetchData({
      url: `product/delete/${id}`,
      method: REQUEST_TYPE.POST,
      body: {
        imageDelete,
      },
    })
    return res
  },

  ///////
  createSubCategories: async (body: any) => {
    return fetchData({
      url: `/sub-categories/create`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  getProduct: async (query = '') => {
    const res = await fetchData({
      url: `all-product${query}`,
    })
    return res
  },
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
  getSubCategories: async (url: string) => {
    return fetchData({ url })
  },
  getCategoryByKey: async (keyParent: string) => {
    const url = `${keyParent}`
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
  getCart: async (queryUrl: string) => {
    return fetchData({
      url: `/cart/all${queryUrl}`,
    })
  },
  getUserAdmin: async (queryUrl: string) => {
    return fetchData({
      url: `user/admin/all${queryUrl}`,
    })
  },

  deleteUserAdmin: async (id: string) => {
    return fetchData({
      url: `user/delete/${id}`,
      method: REQUEST_TYPE.DELETE,
    })
  },
}

export default AdminApi
