/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbDivider,
} from 'react-native-sinbad-ui';
import { OmsFunc } from '../functions';
/** === DUMMIES === */
/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Checkout'}
        backAction={() => OmsFunc.goBack()}
      />
    );
  };
  /** => address */
  const renderAddress = () => {
    return (
      <View>
        <SnbText.B4>Alamat Pengiriman</SnbText.B4>
        <SnbDivider style={{ marginVertical: 8 }} />
        <SnbText.B4>Alamat 1 (Default)</SnbText.B4>
        <SnbText.B3>
          Jl. M.H. Thamrin No.1, Kb. Melati, Kec. Menteng, Kota Jakarta Pusat,
          Daerah Khusus Ibukota Jakarta 10310
        </SnbText.B3>
      </View>
    );
  };
  /** => content */
  const renderContent = () => {
    return <View style={{ padding: 16 }}>{renderAddress()}</View>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderContent()}
    </SnbContainer>
  );
};

export default OmsCheckoutView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (voyager)
 * createDate: 10092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
