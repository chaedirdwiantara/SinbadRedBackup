import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import { useContext, useState } from 'react';
import { contexts } from '@contexts';

const useModalThankYouPageOrderDetail = () => {
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  return {
    setOpen: (value: boolean) => {
      setOpen(value)
    },
    isOpen,
    data,
    setData: (value: any) => {
      setData(value);
      // if (value !== null) {
      //   setOpen(true);
      // } else {
      //   setOpen(false);
      // }
      setOpen(true)
    }
  }
}

export {
  useModalThankYouPageOrderDetail
}