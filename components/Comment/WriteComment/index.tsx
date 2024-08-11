import useModalDrawer from '@/hook/useModalDrawer'
import { Button, Rate } from 'antd'
import React from 'react'
import ModalWrite from './ModalWrite'
import { ItemDetailType } from '@/components/InfoItemDetail/type'
import useMedia from '@/hook/useMedia'

const WriteComment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const { openModalDrawer } = useModalDrawer()
  const { isMobile } = useMedia()

  const handleWrite = () => {
    openModalDrawer({
      content: <ModalWrite dataItem={dataItem} />,
      useDrawer: true,
      title: <div className="text-medium">ĐÁNH GIÁ CỦA BẠN VỀ SẢN PHẨM</div>,
      configDrawer: {
        title: 'ĐÁNH GIÁ CỦA BẠN VỀ SẢN PHẨM',
        height: 'max-content',
        placement: 'bottom',
      },
      configModal: {
        width: '600px',
      },
    })
  }
  return (
    <div className="flex md:flex-row flex-col md:gap-10 gap-5 justify-between">
      <div className="flex flex-col gap-2 justify-center md:items-center">
        <div className="text-medium font-bold">Đánh giá sản phẩm</div>
        <div className="text-[30px] font-bold text-green-500">5.0/5</div>
        <Rate
          disabled
          defaultValue={4.5}
          style={{ fontSize: isMobile ? 15 : 18 }}
        />
        <div className="opacity-75"> (23 đánh giá)</div>
        {/* {isMobile && (
          <div className="flex flex-col gap-2 flex-1  md:items-center">
            <Button onClick={handleWrite}>Viet binh luan</Button>
          </div>
        )} */}
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={4.5}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>(Rất hài lòng)</span>
        </div>
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={4.5}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>(Rất hài lòng)</span>
        </div>
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={4.5}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>(Rất hài lòng)</span>
        </div>
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={4.5}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>(Rất hài lòng)</span>
        </div>
        <div className="flex gap-2 w-full">
          <Rate
            disabled
            defaultValue={4.5}
            style={{ fontSize: isMobile ? 16 : 18 }}
          />
          <span>(Rất hài lòng)</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1  items-center">
        <div className="text-medium">
          Chia sẻ nhận xét của bạn về sản phẩm này
        </div>
        <Button onClick={handleWrite}>Viet binh luan</Button>
      </div>
    </div>
  )
}

export default WriteComment
