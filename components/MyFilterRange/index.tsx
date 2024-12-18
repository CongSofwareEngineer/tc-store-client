import { DEFAULT_VALUE_RANGE } from '@/constant/app'
import useQuerySearch from '@/hook/useQuerySearch'
import { numberWithCommas } from '@/utils/functions'
import { AlignLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import MyCollapse from '../MyCollapse'

type Props = {
  minSlider?: number
  keyMin?: string
  maxSlider?: number
  keyMax?: string
  onChange?: (value?: number[]) => void
  onChangeComplete?: (value: number[]) => void
  stepRange?: number
  title?: string
  renderTooltip?: (value?: any) => React.ReactNode
}

const MyFilterRange = ({
  maxSlider = DEFAULT_VALUE_RANGE.Price.max,
  minSlider = DEFAULT_VALUE_RANGE.Price.min,
  onChangeComplete = () => {},
  onChange = () => {},
  stepRange = 1,
  title = '',
  keyMin = '',
  keyMax = '',
  renderTooltip,
}: Props) => {
  const [slider, setSlider] = useState([minSlider, maxSlider])

  const { queries, updateQuery } = useQuerySearch()

  useEffect(() => {
    let minSliderQuery = minSlider
    let maxSliderQuery = maxSlider
    if (queries?.[keyMin] && queries?.[keyMin][0]) {
      minSliderQuery = Number(queries?.[keyMin][0])
    }
    if (queries?.[keyMax] && queries?.[keyMax][0]) {
      maxSliderQuery = Number(queries?.[keyMax][0])
    }

    setSlider([minSliderQuery, maxSliderQuery])
  }, [queries])

  const handleChangeComplete = (value: number[]) => {
    if (Number(queries?.[keyMin]?.[0] || '0') !== value[0]) {
      updateQuery(keyMin, value[0])
    }

    if (Number(queries?.[keyMax]?.[0] || '1') !== value[1]) {
      updateQuery(keyMax, value[1])
    }

    onChangeComplete(value)
  }

  const handleChange = (value: number[]) => {
    setSlider(value)
    onChange(value)
  }

  const renderTooltips = (value?: any) => {
    if (renderTooltip) {
      return renderTooltips(value)
    }
    return <div>{numberWithCommas(value)}</div>
  }

  const itemsRangeSize = [
    {
      key: keyMax + keyMin,
      expandIcon: <AlignLeftOutlined style={{ fontSize: 20 }} />,
      label: <div className='flex text-medium justify-between items-center'>{title}</div>,
      children: (
        <div className='px-4 py-2 flex flex-col gap-1'>
          <div className='flex items-center mt-2 justify-between'>
            <div className=' px-3 text-sm py-1   rounded-xl border-[1px] border-gray-400'>
              {numberWithCommas(slider[0])}
            </div>
            <div className='pb-[2px] w-[10px] bg-gray-400' />
            <div className='px-3 py-1 text-sm rounded-xl border-[1px] border-gray-400'>
              {numberWithCommas(slider[1])}
            </div>
          </div>
          <Slider
            onChangeComplete={handleChangeComplete}
            range
            onChange={handleChange}
            value={slider}
            defaultValue={[Number(queries?.[keyMin]?.[0] || minSlider), Number(queries?.[keyMax]?.[0] || maxSlider)]}
            min={minSlider}
            max={maxSlider}
            step={stepRange}
            tooltip={{
              formatter: renderTooltips,
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <MyCollapse
      expandIcon={({ isActive }: any) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      items={itemsRangeSize}
    />
  )
}

export default MyFilterRange
