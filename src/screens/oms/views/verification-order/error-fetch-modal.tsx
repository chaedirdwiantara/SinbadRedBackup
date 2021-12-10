/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
/** === IMPORT COMPONENT === */
import BottomModalError from '@core/components/BottomModalError';
/** === IMPORT ASSETS === */
import { ImagesSinbad } from 'src/assets';
/** === TYPE ===  */
interface ErrorFetchModal {
  visible: boolean;
  onPress: () => void;
  buttonText: string;
}
/** === COMPONENT ===  */
export const ErrorFetchModal: FC<ErrorFetchModal> = ({
  visible,
  onPress,
  buttonText,
}) => {
  return (
    <BottomModalError
      isOpen={visible}
      errorTitle={'Terjadi kesalahan'}
      errorSubtitle={'Silahkan mencoba kembali'}
      errorImage={ImagesSinbad.snbCry}
      buttonTitle={buttonText}
      buttonOnPress={onPress}
    />
  );
};