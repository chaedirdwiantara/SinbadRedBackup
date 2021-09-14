/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbDivider,
  color,
  SnbSKUList,
  SnbIcon,
} from 'react-native-sinbad-ui';
import { OmsFunc } from '../../functions';
/** === DUMMIES === */
const dummies = [
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
];
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
          <SnbText.H4>Danone</SnbText.H4>
          <TouchableOpacity>
            <SnbText.B2 color={color.red50}>Lihat Lebih</SnbText.B2>
          </TouchableOpacity>
        </View>
        <SnbSKUList
          data={dummies}
          renderItem={({ item }: any) => {
            return (
              <Image
                source={{ uri: item.imgUrl }}
                style={{ height: 60, width: 60 }}
              />
            );
          }}
          expandable
        />
        <View style={{ marginTop: 16 }}>
          <SnbText.H4>Rincian Pengiriman</SnbText.H4>
          <SnbDivider style={{ marginVertical: 8 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <SnbText.B1>(± 3 Hari)</SnbText.B1>
              <SnbText.B3>Self Delivery</SnbText.B3>
            </View>
            <SnbText.B3 color={color.green50}>FREE ONGKIR</SnbText.B3>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <SnbText.H4>Tipe Pembayaran</SnbText.H4>
          <SnbDivider style={{ marginVertical: 8 }} />
        </View>
        <View>
          <View style={{ marginLeft: 32, marginBottom: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <SnbText.B3>Total Barang (2)</SnbText.B3>
              <SnbText.B3>Rp330.596,00</SnbText.B3>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <SnbText.B3 color={color.green50}>
                Total Potongan Harga
              </SnbText.B3>
              <SnbText.B3 color={color.green50}>-Rp626,00</SnbText.B3>
            </View>
          </View>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <SnbIcon name={'expand_more'} size={24} color={color.black100} />
              <View style={{ marginLeft: 8 }}>
                <SnbText.H4>Sub Total</SnbText.H4>
              </View>
            </View>
            <SnbText.H4>Rp367.367,00</SnbText.H4>
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
