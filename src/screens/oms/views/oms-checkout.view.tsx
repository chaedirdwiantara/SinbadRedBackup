/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbDivider,
  color,
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
      <View style={{ padding: 16, backgroundColor: color.white }}>
        <SnbText.B2>Alamat Pengiriman</SnbText.B2>
        <SnbDivider style={{ marginVertical: 8 }} />
        <SnbText.B2>Alamat 1 (Default)</SnbText.B2>
        <SnbText.B1>
          Jl. M.H. Thamrin No.1, Kb. Melati, Kec. Menteng, Kota Jakarta Pusat,
          Daerah Khusus Ibukota Jakarta 10310
        </SnbText.B1>
      </View>
    );
  };
  /** => invoice group list */
  const renderInvoiceGroupList = () => {
    return (
      <View style={{ padding: 16, marginTop: 8, backgroundColor: color.white }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SnbText.H4>Danone</SnbText.H4>
          <TouchableOpacity>
            <SnbText.B2 color={color.red50}>Lihat Lebih</SnbText.B2>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  /** => content */
  const renderContent = () => {
    return (
      <View>
        {renderAddress()}
        {renderInvoiceGroupList()}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
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
