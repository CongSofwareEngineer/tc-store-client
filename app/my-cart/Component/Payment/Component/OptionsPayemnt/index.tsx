import { OptionPaymentType } from '@/app/my-cart/type'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import React from 'react'

const OptionsPayemnt = ({
  listOptions,
  onChangeOptions,
  optionSelected,
}: OptionPaymentType) => {
  const { translate } = useLanguage()

  const getIcon = (value: string) => {
    if (optionSelected.value === value) {
      return images.icon.iconCheckBoxSelected
    }
    return images.icon.iconCheckBox
  }

  return (
    <div className="bg-white w-full  flex flex-col   border-[1px] shadow-gray1 border-gray-300 md:p-3 px-4 py-4">
      <div className="flex w-full gap-2">
        <div>
          <MyImage
            src={images.icon.iconOptionPayment}
            alt="icon-optionPayment-bill"
            widthImg="[25px]"
            heightImg="[25px]"
          />
        </div>

        <div className="text-medium font-semibold">
          {translate('optionPayment.paymentMethod')}
        </div>
      </div>
      <div className="relative w-full border-[1px] my-3 border-gray-300" />
      <div className="w-full flex flex-col  md:gap-2 gap-2">
        {listOptions.map((e, index) => {
          return (
            <div
              className="relative flex gap-2 items-center"
              key={`option-payment-${index}`}
            >
              <div
                onClick={() => onChangeOptions(e)}
                className="cursor-pointer flex gap-2  md:text-[16px] text-[14px] items-center"
              >
                <MyImage
                  className="!w-[20px] !h-[20px]"
                  src={getIcon(e.value)}
                  alt={`checkbox-${e.name}`}
                />
                {e.icon && (
                  <MyImage
                    className="!w-[18px] !h-18px"
                    src={e.icon}
                    alt={`icon-${e.name}`}
                  />
                )}
                <span>{e.name}</span>
              </div>
              {e.disabled && (
                <div className="bg-white absolute w-full h-full inset-0 opacity-60 z-10 cursor-no-drop " />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OptionsPayemnt
