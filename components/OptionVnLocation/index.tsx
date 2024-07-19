import useAddressShip from '@/hook/useAddressShip'
import React, { useCallback, useEffect, useState } from 'react'
import MySelect from '../MySelect'
import { useAppSelector } from '@/redux/store'
import useLanguage from '@/hook/useLanguage'
import MyInput from '../MyInput'

const OptionVnLocation = ({ callback }: { callback: any }) => {
  const [provence, setProvence] = useState<any>(null)
  const [districts, setDistricts] = useState<any>(null)
  const [ward, setWard] = useState<any>(null)
  const [addressDetail, setAddressDetail] = useState('')

  const { Provinces } = useAppSelector((state) => state.app)
  const { translate } = useLanguage()
  const { data: listDistrict, loading: loadingDistrict } = useAddressShip(
    2,
    provence?.id || provence
  )
  const { data: listWards, loading: loadingWard } = useAddressShip(
    3,
    districts?.id
  )

  const getOption = useCallback((list: any) => {
    return list.map((e: any) => {
      return {
        label: e.full_name,
        value: e.id,
        name: e.full_name,
      }
    })
  }, [])

  const onChangeProvince = useCallback(
    (id: string) => {
      setDistricts(null)
      setWard(null)
      const data = Provinces.find((e) => e.id === id)
      setProvence(data)
    },
    [Provinces]
  )

  const onChangeDistrict = useCallback(
    (id: string) => {
      setWard(null)
      const data = listDistrict.find((e: any) => e.id === id)
      setDistricts(data)
    },
    [listDistrict]
  )

  const onChangeWard = useCallback(
    (id: string) => {
      const data = listWards.find((e: any) => e.id === id)
      setWard(data)
    },
    [listWards]
  )

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <div className="w-full flex flex-col gap-2">
          <div>{translate('textPopular.province')}</div>
          <MySelect
            value={provence?.id}
            placeholder={translate('textPopular.province')}
            optionFilterProp="label"
            showSearch
            fullImage
            className="w-full"
            option={getOption(Provinces)}
            onChange={onChangeProvince}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <div>{translate('textPopular.district')}</div>
          <MySelect
            loading={loadingDistrict}
            value={districts?.id}
            placeholder={translate('textPopular.district')}
            optionFilterProp="label"
            showSearch
            fullImage
            className="w-full"
            option={getOption(listDistrict || [])}
            onSelect={onChangeDistrict}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <div>{translate('textPopular.ward')}</div>

          <MySelect
            loading={loadingWard}
            value={ward?.id}
            placeholder={translate('textPopular.ward')}
            optionFilterProp="label"
            showSearch
            fullImage
            className="w-full"
            option={getOption(listWards || [])}
            onChange={onChangeWard}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div>{translate('textPopular.addressDetail')}</div>
        <MyInput
          disabled={!districts || !provence || !ward}
          value={addressDetail}
          onChangeText={(e) => {
            const dataAddress = `${provence.full_name}---${districts.full_name}---${ward.full_name}`
            setAddressDetail(e!.toString())
            callback({
              addressDetail: e,
              address: dataAddress,
            })
          }}
          type="string"
          className="w-full"
        />
      </div>
    </div>
  )
}

export default OptionVnLocation
