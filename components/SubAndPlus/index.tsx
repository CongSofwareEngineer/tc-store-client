import useMedia from '@/hook/useMedia'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'

type SubAndPlusType = {
  callBackSub?: (value: number) => void
  callBackPlus?: (value: number) => void
  value: number | string
  maxAmount?: number
}
const SubAndPlus = ({
  callBackSub = () => {},
  callBackPlus = () => {},
  value = 0,
  maxAmount = -1,
}: SubAndPlusType) => {
  const { isMobile } = useMedia()
  return (
    <div className="flex align-middle gap-3 ">
      <MinusCircleOutlined
        onClick={() => callBackSub(value === 1 ? 1 : Number(value) - 1)}
        className="cursor-pointer"
        style={{ fontSize: isMobile ? 22 : 25, color: 'green' }}
      />
      <span className="min-w-[22px] text-center ">{value}</span>

      <PlusCircleOutlined
        className="cursor-pointer"
        onClick={() =>
          callBackPlus(
            maxAmount === -1
              ? Number(value) + 1
              : maxAmount === Number(value)
              ? Number(value)
              : Number(value) + 1
          )
        }
        style={{ fontSize: isMobile ? 22 : 25, color: 'green' }}
      />
    </div>
  )
}

export default SubAndPlus
