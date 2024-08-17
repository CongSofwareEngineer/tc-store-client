import useAddressShip from '@/hook/useAddressShip'
import React, { useCallback, useState } from 'react'
import { useAppSelector } from '@/redux/store'
import useLanguage from '@/hook/useLanguage'
import MyCombobox from '../ShadcnUI/MyCombobox'
import FormInput from '../ShadcnUI/FormInput'

const OptionVnLocation = ({ callback }: { callback: any }) => {
  const [provence, setProvence] = useState<any>(null)
  const [districts, setDistricts] = useState<any>(null)
  const [ward, setWard] = useState<any>(null)

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

  const onChangeWard = (id: string) => {
    const data = listWards.find((e: any) => e.id === id)
    setWard(data)
    const dataAddress = `${data.full_name}---${districts.full_name}---${provence.full_name}`

    callback(dataAddress)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <div className="w-full flex flex-col gap-2">
          <div>{translate('textPopular.province')}</div>

          <MyCombobox
            value={provence?.id}
            options={getOption(Provinces)}
            onChange={onChangeProvince}
            titleSearch={translate('textPopular.province')}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <div>{translate('textPopular.district')}</div>

          <MyCombobox
            loading={loadingDistrict}
            value={districts?.id}
            options={getOption(listDistrict || [])}
            onChange={onChangeDistrict}
            titleSearch={translate('textPopular.district')}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <div>{translate('textPopular.ward')}</div>
          <MyCombobox
            value={ward?.id}
            options={getOption(listWards || [])}
            loading={loadingWard}
            onChange={onChangeWard}
            titleSearch={translate('textPopular.ward')}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <FormInput
          disabled={!districts || !provence || !ward}
          name="addressShip.addressDetail"
          label={translate('textPopular.addressDetail')}
          placeholder={translate('textPopular.addressDetail')}
        />
      </div>
    </div>
  )
}

export default OptionVnLocation
