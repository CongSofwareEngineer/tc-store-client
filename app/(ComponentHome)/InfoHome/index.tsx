import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import React from 'react'

const InfoHome = () => {
  const renderItem = (image: string, title: string, des: string) => {
    return (
      <div className="flex gap-4 flex-1 items-center justify-center ">
        <div className="w-14 h-14">
          <MyImage src={image} alt={`info-home-${title}`} heightImage="auto" />
        </div>
        <div className="flex-1 justify-start items-start">
          <h1 className="uppercase font-semibold text-medium">{title}</h1>
          <h2>{des}</h2>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 md:gap-7 justify-between md:mt-8">
      {renderItem(
        images.icon.iconResponsibility,
        'TINH THẦN VÀ TRÁCH NHIỆM',
        'Mỗi sản phẩm là biểu hiện trí tuệ và công sức bỏ ra.'
      )}
      {renderItem(
        images.icon.iconShield,
        'CAM KẾT CHẤT LƯỢNG',
        'Sản phẩm chúng tôi 100% chất lượng và tự nhiên.'
      )}
      {renderItem(
        images.icon.iconSupport,
        'CHĂM SÓC KHÁCH HÀNG 24/7',
        'Hỗ trợ và giải đáp thắc mắc các thông tin 24/7.'
      )}
    </div>
  )
}

export default InfoHome
