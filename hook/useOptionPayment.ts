import { useMemo, useState, useEffect } from 'react';
import useLanguage from './useLanguage'
import { OptionPayment } from '@/constant/app'
import { useCallback } from 'react';
import { images } from '@/configs/images';
import { delayTime } from '@/utils/functions';

type OptionType = {
  name: string,
  value: string,
  icon?: string
}
const useOptionPayment = (defaultValue?: OptionType) => {
  const { translate } = useLanguage()

  const [optionSelected, setOptionSelected] = useState<OptionType>(defaultValue || {
    name: translate('optionPayment.onDelivery'),
    value: OptionPayment.delivery,
  })

  useEffect(() => {
    if (defaultValue) {
      setOptionSelected(defaultValue)
    }
  }, [defaultValue])

  const listOptions = useMemo(() => {
    return [
      {
        name: "Momo",
        value: OptionPayment.momo,
        icon: images.icon.iconMomo,
        disabled: true
      },
      {
        name: translate('optionPayment.onDelivery'),
        value: OptionPayment.delivery,
      },
      {
        name: translate('optionPayment.banking'),
        value: OptionPayment.banking,
        disabled: true
      },
    ]
  }, [translate])

  const handlePayment = useCallback(async (data: any) => {
    console.log({ handlePayment: data, optionSelected });
    let result
    switch (optionSelected.value) {
      case OptionPayment.momo:
        console.log('====================================');
        console.log('cash by momo');
        await delayTime(3000)
        console.log('====================================');
        result = true
        break;

      case OptionPayment.banking:
        console.log('====================================');
        console.log('cash by banking');
        await delayTime(3000)

        console.log('====================================');
        result = true
        break;

    }
    return result

  }, [optionSelected])

  return {
    listOptions,
    onChangeOptions: setOptionSelected,
    optionSelected,
    handlePayment
  }
}

export default useOptionPayment