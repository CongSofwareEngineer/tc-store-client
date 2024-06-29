import { PageSizeLimit } from '@/constant/app'
import { FB_FC, QueryData } from '@/constant/firebase'
import { QueryKey, TypeHookReactQuery } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { useQuery } from '@tanstack/react-query'

const getData = async ({ queryKey }: { queryKey: any }): Promise<TypeHookReactQuery> => {
  const res = await ClientApi.reqServerFB({
    nameDB: queryKey[1],
    body: {
      queryData: queryKey[2],
      data: {
        limit: queryKey[3]
      }
    },
    namFn: FB_FC.getDataByLimit
  })
  if (res.data) {
    return {
      ...res.data
    }
  }
  return {
    "data": [],
    "totalPage": 1,
    "page": queryKey[1],
  }
}

const useProductByLimit = (nameData: string, query?: QueryData, limitItem = PageSizeLimit) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.GetProductShop, nameData, query, limitItem],
    queryFn: getData,
    enabled: !!query
  })

  return {
    data,
    isLoading
  }
}

export default useProductByLimit