import { DataBase, FB_FC } from '@/constant/firebase'
import { QueryKey } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'
const getData = async ({ queryKey }: any) => {
  const data = await ClientApi.requestBase({
    nameDB: DataBase.productShop,
    body: {
      id: queryKey[1]
    },
    namFn: FB_FC.getDataByID
  })
  return data?.data || null

}
const useGetProductByID = (id = '') => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.GetProductByID, id],
    enabled: !!id,
    queryFn: getData
  })
  return {
    data, isLoading
  }
}

export default useGetProductByID