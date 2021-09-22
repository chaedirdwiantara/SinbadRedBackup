/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import BannerStyle from '../styles/banner.style';
/** === IMPORT FUNCTION HERE === */
import { useAuthAction } from '@screen/auth/functions/auth-hook.function';
/** === INTERFACE === */
interface Props {
  testID?: string;
}
/** === COMPONENT === */
const BannerHomeView: FC<Props> = () => {
  /** === HOOK === */
  const { loginUserName, logout } = useAuthAction();
  /** => main */
  return (
    <View style={BannerStyle.bannerHomeContainer} testID={'bannerHome'}>
      <TouchableOpacity
        onPress={() =>
          loginUserName({ username: 'dianprasetyo', password: 'sinbad' })
        }>
        <SnbText.B1>Login</SnbText.B1>
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
