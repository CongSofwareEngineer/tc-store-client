import { DEFAULT_VALUE_RANGE } from '@/constant/app'
import useQuerySearch from '@/hook/useQuerySearch'
import { numberWithCommas } from '@/utils/functions'
import { Slider } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
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
  renderTooltip?: (value?: any) => React.ReactNode | undefined
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
  renderTooltip = undefined,
}: Props) => {
  const { queries, updateQuery } = useQuerySearch()
  const [slider, setSlider] = useState<number[]>([minSlider, maxSlider])

  // Use useMemo to compute slider values only when queries change
  const sliderFromQuery = useMemo(() => {
    const min = Number(queries?.[keyMin]?.[0] || minSlider)
    const max = Number(queries?.[keyMax]?.[0] || maxSlider)
    return [min, max]
  }, [queries, keyMin, keyMax, minSlider, maxSlider])

  useEffect(() => {
    setSlider(sliderFromQuery)
  }, [sliderFromQuery])

  const handleChangeComplete = (value: number[]) => {
    if (sliderFromQuery[1] !== value[1]) {
      updateQuery(keyMax, value[1])
    }

    if (sliderFromQuery[0] !== value[0]) {
      console.log('handleChangeComplete', keyMin)

      updateQuery(keyMin, value[0])
    }
    onChangeComplete(value)
  }

  const handleChange = (value: number[]) => {
    setSlider(value)
    onChange(value)
  }

  const renderTooltips = (value?: any) => {
    return renderTooltip ? renderTooltip(value) : <div>{numberWithCommas(value)}</div>
  }

  return (
    <MyCollapse title={title}>
      <div className='px-4 py-2 flex flex-col gap-1'>
        <div className='flex items-center mt-2 justify-between'>
          <div className='px-3 text-sm py-1 rounded-xl border-[1px] border-gray-400'>
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
          defaultValue={sliderFromQuery}
          min={minSlider}
          max={maxSlider}
          step={stepRange}
          tooltip={{
            formatter: renderTooltips,
          }}
        />
      </div>
    </MyCollapse>
  )
}

export default MyFilterRange
