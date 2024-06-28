import { useMemo, useState, useEffect } from 'react';
import useLanguage from './useLanguage'
import { OptionPayment } from '@/constant/app'
import { useCallback } from 'react';
import { images } from '@/configs/images';

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
      },
    ]
  }, [translate])

  const handlePayment = useCallback(async (data: any) => {
    console.log({ handlePayment: data });
    switch (optionSelected.value) {
      case OptionPayment.momo:
        console.log('====================================');
        console.log('cash by momo');
        console.log('====================================');
        break;

    }

  }, [optionSelected])

  return {
    listOptions,
    onChangeOptions: setOptionSelected,
    optionSelected,
    handlePayment
  }
}

export default useOptionPayment