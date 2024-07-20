import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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
    const searchPareClone = cloneData(searchPare)

    Object.entries(searchPare).map(([key, value]) => {
      if (typeof value === 'string') {
        searchPareClone[key] = value.split(',')
      }
      if (Array.isArray(value) && value.length === 0) {
        delete searchPareClone[key]
      }

      if (!value) {
        delete searchPareClone[key]
      }
    })
    const stringified = queryString.stringify(searchPareClone, { arrayFormat: 'comma' });
    router.push(`${pathPage}?${stringified}`)
    setQueries(searchPareClone)
    setCurrentQueries(window.location.search)

  }, [searchParam, router, pathPage])


  const updateQuery = useCallback((key: string, value: string | string[] | number | number[], isReplace = true) => {

    const searchPareClone = cloneData(queries)

    if (searchPareClone[key]) {
      if (!searchPareClone[key].includes(value?.toString())) {
        if (isReplace) {
          searchPareClone[key] = [value]
        } else {
          searchPareClone[key].push(value)
        }
      } else {
        searchPareClone[key] = searchPareClone[key].filter((e: string) => e !== value?.toString())
      }
    } else {
      searchPareClone[key] = [value]
    }

    const stringified = queryString.stringify(searchPareClone, { arrayFormat: 'comma' });
    router.push(`${pathPage}?${stringified}`)

  }, [queries, pathPage, router])

  const clearAll = useCallback(() => {
    router.push(pathPage)
  }, [pathPage, router])

  return {
    queries,
    updateQuery,
    clearAll,
    currentQueries
  }
}

export default useQuerySearch