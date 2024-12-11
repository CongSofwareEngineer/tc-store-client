import useAddressShip from '@/hook/useAddressShip'
import React, { useEffect, useState } from 'react'
import MySelect from '../MySelect'
import { useAppSelector } from '@/redux/store'
import useLanguage from '@/hook/useLanguage'
import MyInput from '../MyInput'
import useUserData from '@/hook/useUserData'

const OptionVnLocation = ({ callback, isNew = true }: { callback: any; value?: string[]; isNew?: boolean }) => {
  const [provence, setProvence] = useState<any>(null)
  const [districts, setDistricts] = useState<any>(null)
  const [ward, setWard] = useState<any>(null)
  const [addressDetail, setAddressDetail] = useState('')

  const { Provinces } = useAppSelector((state) => state.app)
  const { translate } = useLanguage()
  const { userData } = useUserData()
  const { data: listDistrict, loading: loadingDistrict } = useAddressShip(2, provence?.id || provence)
  const { data: listWards, loading: loadingWard } = useAddressShip(3, districts?.id)

  useEffect(() => {
    const initData = (address: any) => {
      const addressArr = address?.address.split('---') || []
      if (Array.isArray(Provinces) && !provence) {
        const dataProvence = Provinces.find((e) => e.full_name === addressArr[2])
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

    if (!isNew && userData?.addressShipper!?.length > 0) {
      const address = userData?.addressShipper[0]
      if (address) {
        callback(address)
        initData(address)
      }
    }
  }, [isNew, userData, Provinces, listDistrict, listWards])

  const getOption = (list: any) => {
    return list.map((e: any) => {
      return {
        label: e.full_name,
        value: e.id,
        name: e.full_name,
      }
    })
  }

  const onChangeProvince = (id: string) => {
    setDistricts(null)
    setAddressDetail('')
    setWard(null)
    const data = Provinces.find((e) => e.id === id)
    setProvence(data)
  }

  const onChangeDistrict = (id: string) => {
    setWard(null)
    setAddressDetail('')
    const data = listDistrict.find((e: any) => e.id === id)
    setDistricts(data)
  }

  const onChangeWard = (id: string) => {
    setAddressDetail('')
    const data = listWards.find((e: any) => e.id === id)
    setWard(data)
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
      <div className='flex flex-col gap-2 w-full md:flex-row'>
        <div className='w-full flex flex-col gap-2'>
          <div>{translate('textPopular.province')}</div>
          <MySelect
            value={provence?.id}
            placeholder={translate('textPopular.province')}
            optionFilterProp='label'
            showSearch
            fullImage
            className='w-full'
            option={getOption(Provinces)}
            onChange={onChangeProvince}
          />
        </div>

        <div className='w-full flex flex-col gap-2'>
          <div>{translate('textPopular.district')}</div>
          <MySelect
            loading={loadingDistrict}
            value={districts?.id}
            placeholder={translate('textPopular.district')}
            optionFilterProp='label'
            showSearch
            fullImage
            className='w-full'
            option={getOption(listDistrict || [])}
            onChange={onChangeDistrict}
          />
        </div>

        <div className='w-full flex flex-col gap-2'>
          <div>{translate('textPopular.ward')}</div>

          <MySelect
            loading={loadingWard}
            value={ward?.id}
            placeholder={translate('textPopular.ward')}
            optionFilterProp='label'
            showSearch
            fullImage
            className='w-full'
            option={getOption(listWards || [])}
            onChange={onChangeWard}
          />
        </div>
      </div>
      <div className='w-full flex flex-col gap-2'>
        <div>{translate('textPopular.addressDetail')}</div>
        <MyInput
          disabled={!districts || !provence || !ward}
          value={addressDetail}
          onChangeText={(e) => onChangeNote(e?.toString() || '')}
          type='string'
          className='w-full'
        />
      </div>
    </div>
  )
}

export default OptionVnLocation
