/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import {BannerStyles} from '../styles';
/** === IMPORT FUNCTION HERE === */
import { useAuthAction } from '@screen/auth/functions/auth-hook.function';
/** === INTERFACE === */
interface Props {
  testID?: string;
}
/** === COMPONENT === */
const BannerHomeView: FC<Props> = () => {
  /** === HOOK === */
  const { loginUserName, requestOTP, verificationOTP, logout } =
    useAuthAction();
  /** => main */
  return (
    <View style={BannerStyles.bannerHomeContainer} testID={'bannerHome'}>
      <TouchableOpacity
        onPress={() =>
          loginUserName({ username: 'dianprasetyo', password: 'sinbad' })
        }>
        <SnbText.B1>Login UserName</SnbText.B1>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => requestOTP({ mobilePhone: '08966666670' })}>
        <SnbText.B1>Request OTP</SnbText.B1>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          verificationOTP({ mobilePhone: '08966666670', otp: '12345' })
        }>
        <SnbText.B1>Verify OTP</SnbText.B1>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logout()}>
        <SnbText.B1>Logout</SnbText.B1>
      </TouchableOpacity>
    </View>
  );
};

export default BannerHomeView;

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
