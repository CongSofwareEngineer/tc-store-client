import { PageSizeLimit } from '@/constant/app';
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery';
import useUserData from '../useUserData';
import ClientApi from '@/services/clientApi';
import { DataBase, FB_FC } from '@/constant/firebase';
import useQueryPagination from './useQueryPagination';

const getDataList = async ({ queryKey, pageParam = 1 }: { queryKey: any, pageParam: any }): Promise<TypeHookReactQuery> => {
  const dataServer = await ClientApi.reqServerFB({
    nameDB: DataBase.cartUser,
    body: {
      id: queryKey[1],
      data: {
        page: pageParam,
        limit: queryKey[2],
      }
    },
    namFn: FB_FC.getMyCart
  })
  if (dataServer.data) {
    return {
      ...dataServer.data
    }
  }

  return {
    "data": [],
    "totalPage": 1,
    "page": pageParam,
  }
}

const useMyCart = (pageLimit = PageSizeLimit) => {
  const { userData, isLogin } = useUserData()

  const data = useQueryPagination({
    listQueryKey: [QueryKey.GetAllProduct, userData?.id, pageLimit],
    queryFn: getDataList,
    enabled: isLogin
  })

  return data
}

export default useMyCart