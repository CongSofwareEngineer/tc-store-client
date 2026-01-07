import useAddressShip from '@/hooks/useAddressShip'
import React, { useEffect, useState } from 'react'

import { useProvinces } from '@/zustand/useProvinces'
import { useUserData } from '@/zustand/useUserData'
import useLanguage from '@/hooks/useLanguage'
import { Select, Textarea } from '@mantine/core'

const OptionVnLocation = ({ callback, isNew = true, className = '' }: { callback: any; value?: string[]; isNew?: boolean; className?: string }) => {
  const [provence, setProvence] = useState<any>(null)
  const [districts, setDistricts] = useState<any>(null)
  const [ward, setWard] = useState<any>(null)
  const [addressDetail, setAddressDetail] = useState('')

  const { provinces } = useProvinces()
  const { translate } = useLanguage()
  const { userData } = useUserData()
  const { data: listDistrict, loading: loadingDistrict } = useAddressShip(2, provence?.id || provence)
  const { data: listWards, loading: loadingWard } = useAddressShip(3, districts?.id)

  useEffect(() => {
    const initData = (address: any) => {
      const addressArr = address?.address.split('---') || []

      if (Array.isArray(provinces) && !provence) {
        const dataProvence = provinces.find((e) => e.full_name === addressArr[2])

        setProvence(dataProvence)
      }
      if (Array.isArray(listDistrict) && !districts) {
        const dataDistrict = listDistrict.find((e) => e.full_name === addressArr[1])

        setDistricts(dataDistrict)
      }
      if (Array.isArray(listWards) && !ward) {
        const dataWard = listWards.find((e) => e.full_name === addressArr[0])

        setAddressDetail(address.addressDetail)
        setWard(dataWard)
      }
    }

    if (!isNew && userData?.addressShipper && userData?.addressShipper?.length > 0) {
      const address = userData?.addressShipper[0]

      if (address) {
        callback(address)
        initData(address)
      }
    }
  }, [isNew, userData, provinces, listDistrict, listWards])

  const getOption = (list: any) => {
    return list.map((e: any) => {
      return {
        label: e.full_name,
        value: e.id,
      }
    })
  }

  const onChangeProvince = (id: string) => {
    // console.log({ id })

    if (id) {
      setDistricts(null)
      setAddressDetail('')
      setWard(null)
      const data = provinces.find((e) => e.id === id)

      setProvence(data)
    }
  }

  const onChangeDistrict = (id: string) => {
    if (id) {
      setWard(null)
      setAddressDetail('')
      const data = listDistrict.find((e: any) => e.id === id)

      setDistricts(data)
    }
  }

  const onChangeWard = (id: string) => {
    if (id) {
      setAddressDetail('')
      const data = listWards.find((e: any) => e.id === id)

      setWard(data)
    }
  }

  const onChangeNote = (note: string) => {
    const dataAddress = `${ward.full_name}---${districts.full_name}---${provence.full_name}`

    setAddressDetail(note!.toString())
    callback({
      addressDetail: note,
      address: dataAddress,
    })
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className={`flex flex-col  gap-2 w-full md:flex-row ${className}`}>
        <div className='w-full flex flex-col gap-2'>
          <Select
            searchable
            className='w-full'
            data={getOption(provinces)}
            label={translate('textPopular.province')}
            placeholder={translate('textPopular.province')}
            value={provence?.id}
            onChange={(id) => onChangeProvince(id?.toString()!)}
          />
        </div>

        <div className='w-full flex flex-col gap-2'>
          {/* <MySelect
            loading={loadingDistrict}
            value={districts?.id}
            placeholder={translate('textPopular.district')}
            optionFilterProp='label'
            showSearch
            fullImage
            className='w-full'
            option={getOption(listDistrict || [])}
            onChange={onChangeDistrict}
          /> */}

          <Select
            searchable
            className='w-full'
            data={getOption(listDistrict || [])}
            disabled={loadingDistrict}
            label={translate('textPopular.district')}
            nothingFoundMessage={translate('textPopular.notData')}
            placeholder={translate('textPopular.district')}
            value={districts?.id}
            onChange={(id) => onChangeDistrict(id?.toString()!)}
          />
        </div>

        <div className='w-full flex flex-col gap-2'>
          <Select
            searchable
            className='w-full'
            data={getOption(listWards || [])}
            disabled={loadingWard}
            label={translate('textPopular.ward')}
            nothingFoundMessage={translate('textPopular.notData')}
            placeholder={translate('textPopular.ward')}
            value={ward?.id}
            onChange={(id) => onChangeWard(id?.toString()!)}
          />

          {/* <MySelect
            loading={loadingWard}
            value={ward?.id}
            placeholder={translate('textPopular.ward')}
            optionFilterProp='label'
            showSearch
            fullImage
            className='w-full'
            option={getOption(listWards || [])}
            onChange={onChangeWard}
          /> */}
        </div>
      </div>
      <div className='w-full flex flex-col gap-2 mb-[10px]'>
        <Textarea
          className='w-full'
          disabled={!districts || !provence || !ward}
          label={translate('textPopular.addressDetail')}
          rows={1}
          value={addressDetail}
          onChange={(e) => onChangeNote(e.target.value)}
        />
      </div>
    </div>
  )
}

export default OptionVnLocation
