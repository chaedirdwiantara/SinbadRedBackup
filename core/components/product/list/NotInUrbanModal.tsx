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
      setIsOpen((prev) => !prev);
      /** ==> timeout for animate close modal */
      setTimeout(() => {
        /** ==> flow is back to home, to profile screen (get data address), and to address merchant */
        NavigationAction.back();
        setTimeout(() => NavigationAction.navigate('UserView'), 0);
        setTimeout(
          () => NavigationAction.navigate('MerchantDetailAddressView'),
          1000,
        );
      }, 500);
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
