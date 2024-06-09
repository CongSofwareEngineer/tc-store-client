import { cloneData, isEmptyObject } from '@/utils/functions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const useQueryUrl = () => {
  const searchParams = useSearchParams()
  const patchPage = usePathname()
  const router = useRouter()

  const [queries, setQueries] = useState<Record<string, string>>({});
  const [currentQuery, setCurrentQuery] = useState('');

  const convertQueryObjToString = useCallback((query: object) => {
    const dataClone = cloneData(query)
    let queryString = '?'
    for (const key in dataClone) {
      queryString += `${key}=${dataClone[key]?.splice(',')}&`;
    }
    return queryString.substring(0, queryString.length - 1);
  }, [])

  const updateQuery = useCallback((propertyName: string, value: []) => {
    const newQueries = cloneData(queries)
    if (!value || value?.length === 0) {
      delete newQueries[propertyName]
      setQueries(newQueries)
    } else {
      if (Array.isArray(value)) {
        newQueries[propertyName] = value
      } else {
        newQueries[propertyName] = [value]
      }

      setQueries(newQueries)
    }
  }, [queries])

  useEffect(() => {
    const query: any = {};
    const dataSearchParam: any = searchParams.entries()
    for (const entry of dataSearchParam) {
      query[entry[0]] = entry[1];
    }
    const newQueries: any = {}
    if (Object.keys(query).length > 0) {
      Object.entries(query).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
          value = value.split(',')
          newQueries[key] = value
        }

      })

      setQueries(newQueries)
    } else {
      setQueries({})
    }
  }, [searchParams])

  useEffect(() => {
    if (isEmptyObject(queries)) {
      setCurrentQuery('')
    } else {
      setCurrentQuery(convertQueryObjToString(queries));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries])

  useEffect(() => {
    router.push(`${patchPage}${currentQuery}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuery])

  return {
    queries,
    updateQuery,
    currentQuery
  }
}

export default useQueryUrl
