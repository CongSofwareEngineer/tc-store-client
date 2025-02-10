import useDebounce from '@/hook/useDebounce'
import useLanguage from '@/hook/useLanguage'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from '@mantine/core'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const InputSearch = ({ keySearch = 'name' }: { keySearch?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { translate } = useLanguage()
  const searchParam = useSearchParams()

  const [nameSearch, setNameSearch] = useState('')
  const nameSearchDebounce = useDebounce(nameSearch)

  useEffect(() => {
    setNameSearch(searchParam.get(keySearch) || '')
  }, [searchParam, keySearch])

  useEffect(() => {
    if (nameSearchDebounce) {
      router.push(`${pathname}?${keySearch}=${nameSearchDebounce}`)
    } else {
      router.push(pathname)
    }
  }, [nameSearchDebounce, keySearch, router, pathname])

  const handleSearch = () => {
    if (!nameSearch) {
      router.push(pathname)
    } else {
      router.push(`${pathname}?${keySearch}=${nameSearch}`)
    }
  }

  return (
    <Input
      className='w-full'
      rightSection={
        <SearchOutlined
          className='cursor-pointer hover:scale-105'
          placeholder={translate('textPopular.searchNameProduct')}
          onClick={handleSearch}
        />
      }
      value={nameSearch}
      onChange={(e) => setNameSearch(e.target.value)}
    />
  )
}

export default InputSearch
