import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'

type Props = {
  onChangeDateTime?: (param: any) => any
  onSearchSDT?: () => any
  onSearchIDOther?: () => any
}
const dateStart = moment(Date.now()).add(-24, 'days').format('YYYY-MM-DD')
const { RangePicker } = DatePicker

const OptionSearchBase = ({
  onChangeDateTime = () => {},
  onSearchSDT = () => {},
  onSearchIDOther = () => {},
}: Props) => {
  const [dateTimeBase, setDateTimeBase] = useState([
    dateStart,
    moment().format('YYYY-MM-DD'),
  ])

  useEffect(() => {
    onChangeDateTime(dateTimeBase)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTimeBase])

  const [sdt, setSdt] = useState('')
  const [idOther, setIdOther] = useState('')

  const handleSearchSDT = () => {
    setIdOther('')
    onSearchSDT()
  }

  const handleSearchIDOther = () => {
    setSdt('')
    onSearchIDOther()
  }

  return (
    <div className="flex md:flex-row flex-col gap-3">
      <RangePicker
        style={{ minWidth: 250 }}
        defaultValue={[
          dayjs(dateStart, 'YYYY-MM-DD'),
          dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'),
        ]}
        defaultPickerValue={[
          dayjs(dateStart, 'YYYY-MM-DD'),
          dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'),
        ]}
        onChange={(_, dateString) => {
          setDateTimeBase(dateString)
        }}
      />
      <div className="flex flex-1 gap-3">
        <MyInput
          placeholder="SDT"
          type="string"
          value={sdt}
          onChange={(e) => setSdt(e?.toString() || '')}
        />
        <MyButton type="dashed" onClick={handleSearchSDT}>
          Search
        </MyButton>
      </div>
      <div className="flex flex-1 gap-3">
        <MyInput
          placeholder="Id"
          type="string"
          value={idOther}
          onChange={(e) => setIdOther(e?.toString() || '')}
        />
        <MyButton type="dashed" onClick={handleSearchIDOther}>
          Search
        </MyButton>
      </div>
    </div>
  )
}

export default OptionSearchBase
