import useLanguage from '@/hook/useLanguage'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const InputSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { translate } = useLanguage()
  const searchParam = useSearchParams()

  const [nameSearch, setNameSearch] = useState('')

  useEffect(() => {
    setNameSearch(searchParam.get('name') || '')
  }, [searchParam])

  const handleSearch = () => {
    if (!nameSearch) {
      router.push(pathname)
    } else {
      router.push(`${pathname}?name=${nameSearch}`)
    }
  }

  const handlePressSearch = () => {
    if (!nameSearch) {
      router.push(pathname)
    } else {
      router.push(`${pathname}?name=${nameSearch}`)
    }
  }

  return (
    <Input
      onPressEnter={handlePressSearch}
      className="w-full"
      suffix={
        <SearchOutlined
          className="cursor-pointer hover:scale-105"
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
