import { PageSizeLimit } from '@/constant/app';
import { QueryKey } from '@/constant/reactQuery';
import useUserData from '../useUserData';
import useQueryPagination from './useQueryPagination';
import { DataBase, FB_FC } from '@/constant/firebase';
import { useQuery } from '@tanstack/react-query';
import ClientApi from '@/services/clientApi';

const getData = async ({ queryKey }: any) => {
  const database = queryKey[1]
  const listFunc = database.data.map((e: { idProduct: any }) => {
    return ClientApi.requestBase({
      nameDB: DataBase.productShop,
      body: {
        id: e.idProduct
      },
      namFn: FB_FC.getDataByID
    })
  })
  const listData = await Promise.all(listFunc)
  const listDataFlatMap = listData.flatMap(e => e.data.data)
  const listDataFinal = database.data.map((e: { idProduct: any }) => {
    const itemIfo = listDataFlatMap.find(eChil => eChil.id === e.idProduct)

    return {
      ...itemIfo,
      ...e
    }
  })
  return listDataFinal

}
const useMyCart = (pageLimit = PageSizeLimit) => {
  const { userData } = useUserData()

  const { data: dataBase, listData, loadMore, isLoading: loadingQueryPagination } = useQueryPagination(
    QueryKey.MyCartUser,
    DataBase.cartUser,
    'idUser',
    {
      key: 'idUser',
      match: '==',
      value: userData?.id.toString() || ''
    },
    pageLimit
  )

  const { data, isLoading } = useQuery({
    queryKey: [
      QueryKey.MyCartUser,
      dataBase
    ],
    queryFn: getData,
    enabled: dataBase?.data?.length > 0
  })

  return {
    data, isLoading: loadingQueryPagination || isLoading, loadMore, listData
  }
}

export default useMyCart