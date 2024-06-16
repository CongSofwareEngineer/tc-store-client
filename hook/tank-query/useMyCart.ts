import { PageSizeLimit } from '@/constant/app';
import { QueryKey } from '@/constant/reactQuery';
import useUserData from '../useUserData';
import useQueryPagination from './useQueryPagination';
import { DataBase } from '@/constant/firebase';

const useMyCart = (pageLimit = PageSizeLimit) => {
  const { userData } = useUserData()

  const { data, listData, isLoading, loadMore } = useQueryPagination(
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

  return {
    data, isLoading, loadMore, listData
  }
}

export default useMyCart