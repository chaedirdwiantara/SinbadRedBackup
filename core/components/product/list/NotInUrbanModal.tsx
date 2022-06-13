import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { View } from 'react-native';
import { spacingV2 } from '@sinbad/react-native-sinbad-ui';
import BottomModalError from '@core/components/BottomModalError';
import { NavigationAction } from '@navigation';
import Svg from '@svg';
const sinbadCry = require('@image/sinbad_image/cry_sinbad.png');

interface NotInUrbanModalProps {
  errorSubtitle: string;
}
export interface NotInUrbanModalRef {
  trigger: (isShow?: boolean) => void;
}

const { spacing } = spacingV2;

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
        onDismis={() => setIsOpen(false)}
        isOpen={isOpen}
        errorTitle={'Lokasi tidak terjangkau'}
        errorSubtitle={errorSubtitle}
        contentHeight={375}
        errorImage={sinbadCry}
        errorImageSvg={
          <View style={{ marginBottom: spacing.xxl }}>
            <Svg name="kategori_toko" size={180} />
          </View>
        }
        buttonTitle={'Cek Ulang Alamat'}
        buttonOnPress={buttonOnPress}
      />
    );
  },
);

export default NotInUrbanModal;
