import ImageAdmin from '@/components/ImageAdmin'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import { images } from '@/configs/images'
import { ellipsisText } from '@/utils/functions'
import { Rate } from 'antd'
import React from 'react'

const ListComment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  console.log({ dataItem })
  const listNote = [
    'sản phẩm rất tốt',
    'sản phẩm chất lượng với tầm giá',
    'Dịch vụ tốt, giao hàng nhanh',
    'Người bán nhiệt tinh, sẽ ủng hộ lại',
    'Shop tư vấn khá nhiệt tình',
  ]
  const dataFake = []
  for (let index = 0; index < 6; index++) {
    dataFake.push({
      name: 'Dien Thanh',
      sdt: `049333540${index}`,
      date: new Date().getTime(),
      note: listNote[index],
      rate: 5,
      avatar: images.userDetail.iconUserDetail,
    })
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="text-medium font-bold">Bình luận</div>
      <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
        {dataFake.map((e) => {
          return (
            <div key={e.sdt} className="flex gap-2 items-center">
              <div className="aspect-square relative overflow-hidden w-[20%] min-w-[80px] max-w-[100px]">
                <ImageAdmin src={e.avatar} alt={e.sdt} className="w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{e.name}</p>
                <div className="text-[10px]">{`SĐT : ${ellipsisText(
                  e.sdt,
                  4,
                  3
                )}`}</div>
                <Rate disabled value={e.rate} style={{ fontSize: 15 }} />
                <div className="text-[12px]">{e.note}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListComment
