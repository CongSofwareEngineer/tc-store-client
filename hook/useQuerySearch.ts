import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useMemo } from 'react';
import queryString from 'query-string';
import { cloneData } from '@/utils/functions';

const useQuerySearch = () => {
  const [queries, setQueries] = useState<Record<string, (string | null)[]> | null>(null)
  const [currentQueries, setCurrentQueries] = useState<string>('')
  const searchParam = useSearchParams()
  const pathPage = usePathname()
  const router = useRouter()

  useEffect(() => {
    const searchPare = queryString.parse(window.location.search, { arrayFormat: 'comma' })

    let refreshPage = false
    const searchPareClone = cloneData(searchPare)

    Object.entries(searchPare).map(([key, value]) => {
      if (typeof value === 'string') {
        searchPareClone[key] = value.split(',')
      }
      if (Array.isArray(value) && value.length === 0) {
        refreshPage = true
        delete searchPareClone[key]
      }

      if (!value) {
        refreshPage = true
        delete searchPareClone[key]
      }
    })
    if (refreshPage) {
      const stringified = queryString.stringify(searchPareClone, { arrayFormat: 'comma' });
      router.push(`${pathPage}?${stringified}`)
    }
    console.log({ searchPareQueries: searchPareClone });
    setQueries(searchPareClone)
    setCurrentQueries(window.location.search)
  }, [searchParam, router])


  const updateQuery = useCallback((key: string, value: string | string[] | number | number[]) => {

    const searchPareClone = cloneData(queries)
    if (searchPareClone[key]) {
      if (!searchPareClone[key].includes(value?.toString())) {
        searchPareClone[key].push(value)
      } else {
        searchPareClone[key] = searchPareClone[key].filter((e: string) => e !== value?.toString())
      }
    } else {
      searchPareClone[key] = [value]
    }
    console.log({ searchPareUpdateQuery: searchPareClone, queries });

    console.log('====================================');
    const stringified = queryString.stringify(searchPareClone, { arrayFormat: 'comma' });
    router.push(`${pathPage}?${stringified}`)

  }, [queries, searchParam])

  const clearAll = useCallback(() => {
    router.push(pathPage)
  }, [pathPage])

  return {
    queries,
    updateQuery,
    clearAll,
    currentQueries
  }
}

export default useQuerySearch