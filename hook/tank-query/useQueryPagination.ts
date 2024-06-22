import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DataBase, QueryData } from '@/constant/firebase'
import { PageSizeLimit } from '@/constant/app'
import { useQuery } from '@tanstack/react-query';
import { FirebaseBill, FirebaseCart } from '@/services/firebaseService';
import { showNotificationSuccess } from '@/utils/functions';
import { useCallback } from 'react';

const getData = async ({ queryKey }: any) => {
  const nameData = queryKey[1]
  const keyOrderBy = queryKey[2]
  const query = queryKey[3]
  const pageLimit = queryKey[4]
  const lastData = queryKey[5]
  let data: any

  switch (nameData) {
    case DataBase.bill:
      data = await FirebaseBill.queryDataOption2(
        lastData,
        query,
        keyOrderBy,
        pageLimit
      )
      break;

    case DataBase.cartUser:
      data = await FirebaseCart.queryDataOption2(
        lastData,
        query,
        keyOrderBy,
        pageLimit
      )
      break;

    default:
      data = await FirebaseCart.queryDataOption2(
        lastData,
        query,
        keyOrderBy,
        pageLimit
      )

      break;
  }
  return data
};

const useQueryPagination = (
  keyQueryCache: string,
  nameData: string,
  keyOrderBy: string,
  query: QueryData,
  pageLimit = PageSizeLimit
) => {
  const [lastData, setLastData] = useState<any>(null)
  const [listData, setListData] = useState<any[]>([])
  const isFullRef = useRef(false)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      keyQueryCache,
      nameData,
      keyOrderBy,
      query,
      pageLimit,
      lastData
    ],
    queryFn: getData
  })

  useEffect(() => {
    console.log({ listData });

  }, [listData])


  useLayoutEffect(() => {
    if (data) {
      setListData(item => {
        if (data.data.length === 0) {
          return item
        }
        console.log({ dataBase: data });

        const arr: any[] = []

        data.data.forEach((e: any) => {
          if (arr.length === 0) {
            arr.push(e)
          } else {
            if (arr.find((eArr) => e.id !== eArr.id)) {
              arr.push(e)
            }
          }
        })
        console.log({ arr, item });


        item.forEach(e => {
          if (!arr.some((eArr) => e.id === eArr.id)) {
            arr.push(e)
          }
        })
        console.log({ arr });

        return arr
      })
    }

  }, [data])

  useEffect(() => {
    if (lastData) {
      if (data?.data?.length === 0) {
        if (!isFullRef.current) {
          isFullRef.current = true
          showNotificationSuccess('full data')
        }
      }
    }
  }, [data, lastData])

  const handleLoadMore = useCallback(() => {
    if (isFullRef.current) {
      showNotificationSuccess('full data')
    } else {
      setLastData(data?.lastVisible)

    }
  }, [data])

  return {
    data,
    listData,
    isLoading: isLoading || isFetching,
    loadMore: handleLoadMore
  }

}

export default useQueryPagination