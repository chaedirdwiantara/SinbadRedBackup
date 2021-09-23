/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import BannerStyle from '../styles/banner.style';
/** === IMPORT FUNCTION HERE === */
import { contexts } from '@contexts';
import { useAuthAction } from '@screen/auth/functions/auth-hook.function';
import {
  useVerficationOrderAction,
  useTest,
} from '@screen/oms/functions/verification-order/verification-order-hook.function';
/** === INTERFACE === */
interface Props {
  testID?: string;
}
/** === COMPONENT === */
const BannerHomeView: FC<Props> = () => {
  /** === HOOK === */
  const { loginUserName, logout } = useAuthAction();
  const { verificationOrderDetail, verificationOrderCreate } =
    useVerficationOrderAction();
  // const { create } = useTest();
  const { stateOms, dispatchOms } = React.useContext(contexts.OmsContext);
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
      <TouchableOpacity
        onPress={() => verificationOrderCreate(dispatchOms, {})}>
        <SnbText.B1>create verification order</SnbText.B1>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          verificationOrderDetail(
            dispatchOms,
            'y238372891282178912ujfkjnqwlokemlkdfoqwioeoi1',
          )
        }>
        <SnbText.B1>detail verification order</SnbText.B1>
      </TouchableOpacity>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>
        Create{' '}
        {stateOms.verificationOrder.create.loading ? 'loading' : 'not loading'}
      </SnbText.B1>
      <SnbText.B1>
        Detail{' '}
        {stateOms.verificationOrder.detail.loading ? 'loading' : 'not loading'}
      </SnbText.B1>
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
