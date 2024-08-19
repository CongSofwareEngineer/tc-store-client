import moment from 'moment'
import React, { useState } from 'react'
import { Button } from 'antd'
import MyInput from '@/components/MyInput'
import MyRangePicker from '@/components/MyRangePicker'
import MyButton from '@/components/MyButton'

const dateStart = moment(Date.now()).add(-7, 'days').format('YYYY-MM-DD')

const useSearchBaseAdmin = () => {
  const [dateTime, setDateTime] = useState([
    dateStart,
    moment().format('YYYY-MM-DD'),
  ])

  const [sdt, setSdt] = useState('')
  const [idOther, setIdOther] = useState('')

  const handleSearchSDT = () => {
    setIdOther('')
  }

  const handleSearchIDOther = () => {
    setSdt('')
  }

  const renderContent = () => {
    return (
      <div className="flex  flex-col gap-3">
        <MyRangePicker
          className="md:min-w-[230] min-w-full"
          onChange={(dateString) => setDateTime(dateString)}
        />
        <div className="w-full md:flex-col flex-row flex gap-2">
          <div className="flex flex-1 gap-3">
            <MyInput
              placeholder="SDT"
              type="string"
              value={sdt}
              onChangeText={(e) => setSdt(e!.toString())}
            />
            <MyButton type="dashed" onClick={handleSearchSDT}>
              Search
            </MyButton>
          </div>
          <div className="flex flex-1 md:flex-row  flex-col  gap-3">
            <MyInput
              placeholder="Id"
              type="string"
              value={idOther}
              onChangeText={(e) => setIdOther(e?.toString() || '')}
            />
            <Button type="primary" onClick={handleSearchIDOther}>
              Search
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return {
    dateTime,
    sdt,
    idOther,
    renderContent,
  }
}

export default useSearchBaseAdmin
