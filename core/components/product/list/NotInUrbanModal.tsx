import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import BottomModalError from '@core/components/BottomModalError';
import { NavigationAction } from '@navigation';
const sinbadCry = require('@image/sinbad_image/cry_sinbad.png');

interface NotInUrbanModalProps {}
export interface NotInUrbanModalRef {
  trigger: (isShow?: boolean) => void;
}
/** === COMPONENT === */
const NotInUrbanModal = forwardRef<NotInUrbanModalRef, NotInUrbanModalProps>(
  (_, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    /** === CREARE CUSTOM REF */
    useImperativeHandle(ref, () => ({
      trigger: (open) => {
        setIsOpen((prev) => open ?? !prev);
      },
    }));
    /** ==> fuction trigger button 'Atur Ulang Alamat' */
    const buttonOnPress = useCallback(() => {
      setIsOpen((prev) => !prev);
      /** ==> timeout for animate close modal */
      setTimeout(() => {
        NavigationAction.back();
        setTimeout(
          () => NavigationAction.navigate('MerchantDetailAddressView'),
          0,
        );
      }, 500);
    }, []);

    return (
      <BottomModalError
        isOpen={isOpen}
        errorTitle={'Lokasi tidak terjangkau'}
        errorSubtitle={
          'Maaf, supplier Sinbad belum beroperasi di lokasi toko Anda.'
        }
        errorImage={sinbadCry}
        buttonTitle={'Atur Ulang Alamat'}
        buttonOnPress={buttonOnPress}
      />
    );
  },
);

export default NotInUrbanModal;
