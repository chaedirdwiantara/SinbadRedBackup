import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import BottomModalError from '@core/components/BottomModalError';
import { NavigationAction } from '@navigation';
const sinbadCry = require('@image/sinbad_image/cry_sinbad.png');

interface NotInUrbanModalProps {
  errorSubtitle: string;
}
export interface NotInUrbanModalRef {
  trigger: (isShow?: boolean) => void;
}
/** === COMPONENT === */
const NotInUrbanModal = forwardRef<NotInUrbanModalRef, NotInUrbanModalProps>(
  (props, ref) => {
    const { errorSubtitle } = props;
    const [isOpen, setIsOpen] = useState(false);
    /** === CREARE CUSTOM REF */
    useImperativeHandle(ref, () => ({
      trigger: (open) => {
        setIsOpen((prev) => open ?? !prev);
      },
    }));
    /** ==> fuction trigger button 'Cek Ulang Alamat' */
    const buttonOnPress = useCallback(() => {
      // chaining screen to back screen & to edit address
      const promiseBack = () =>
        new Promise((resolve) => {
          NavigationAction.back();
          resolve('');
        });

      setIsOpen((prev) => !prev);

      promiseBack().then(() =>
        setTimeout(
          () => NavigationAction.navigate('MerchantEditAddressView'),
          300,
        ),
      );
    }, []);

    return (
      <BottomModalError
        isOpen={isOpen}
        errorTitle={'Lokasi tidak terjangkau'}
        errorSubtitle={errorSubtitle}
        errorImage={sinbadCry}
        buttonTitle={'Cek Ulang Alamat'}
        buttonOnPress={buttonOnPress}
      />
    );
  },
);

export default NotInUrbanModal;
