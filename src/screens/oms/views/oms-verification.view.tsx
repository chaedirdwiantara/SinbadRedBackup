/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbDivider,
  color,
  SnbIcon,
  SnbBadge,
} from 'react-native-sinbad-ui';
import { OmsFunc } from '../functions';
/** === DUMMIES === */
const dummies = {
  cartId: 2623482,
  storeId: 5257192,
  grandTotalTransaction: 27758640,
  grandTotalRebate: 0,
  bonusSku: [
    {
      id: '879',
      name: 'MEGkeju Serbaguna 165 gr (48)',
      promoName: 'PROMOFGCHEESE',
      promoOwner: 'none',
      qty: 35,
      catalogueImages:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/31438/image_1626691143340.png',
    },
    {
      id: '880',
      name: 'MEGkeju Serbaguna 165 gr (48)',
      promoName: 'PROMOFGCHEESE',
      promoOwner: 'none',
      qty: 35,
      catalogueImages:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/31438/image_1626691143340.png',
    },
  ],
  promoSku: [
    {
      id: 1,
      name: 'SGM EKSPLOR 1+ MADU 1200 GR GA',
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      qty: 20,
      price: 25000,
      totalPrice: 500000,
      totalPotongan: 21000,
      listPromo: [
        {
          id: 11,
          name: 'Promo 1',
          value: 5000,
        },
        {
          id: 12,
          name: 'Promo 2',
          value: 6000,
        },
      ],
      listVoucher: [
        {
          id: 1,
          name: 'Voucher Promo 1',
          value: 5000,
        },
      ],
    },
  ],
  notPromoSku: [
    {
      id: 31437,
      name: 'MEGKEJU SERBAGUNA 2 KG (8)',
      qty: 280,
      catalogueImages:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/31437/image_1626690745603.png',
      price: 99138,
      totalPrice: 27758640,
    },
  ],
  meta: {
    layer_01: {
      skuPromo: [
        {
          catalogueBonusId: '31438',
          catalogueBonusQty: 35,
          promoId: '879',
          promoName: 'PROMOFGCHEESE',
          promoOwner: 'none',
        },
      ],
      voucher: [],
      layerRebate: 0,
    },
    totalLayerRebate: 0,
  },
};
/** === COMPONENT === */
const OmsVerificationView: FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Verifikasi Order'}
        backAction={() => OmsFunc.goBack()}
      />
    );
  };
  /** => content */
  const renderContent = () => {
    return (
      <View style={{ padding: 16 }}>
        <View>
          <SnbText.B4>BERIKUT INI ADALAH RINGKASAN ORDER ANDA</SnbText.B4>
          <SnbDivider style={{ marginVertical: 16 }} />
        </View>
        {renderDiscountList()}
        {renderBonusList()}
      </View>
    );
  };
  /** => discount list */
  const renderDiscountList = () => {
    return (
      <View>
        <View style={{ marginBottom: 24 }}>
          <SnbText.B4>{`Produk Mendapatkan Potongan Harga (${dummies.bonusSku.length} SKU)`}</SnbText.B4>
        </View>
        {dummies.promoSku.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {renderDiscountItem(item)}
              <SnbDivider style={{ marginBottom: 12 }} />
              {renderCutDetail()}
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => discount item */
  const renderDiscountItem = (item) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Image
          source={{
            uri: item.catalogueImages,
          }}
          style={{ width: 69, height: 69, marginRight: 8 }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ width: '80%' }}>
            <SnbText.B4>{item.name}</SnbText.B4>
          </View>
          <SnbText.C2>{`x${item.qty} Pcs`}</SnbText.C2>
          <SnbText.C2 color={color.red50}>{item.price}</SnbText.C2>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SnbText.C2>Total</SnbText.C2>
            <SnbText.C2>{item.totalPrice}</SnbText.C2>
          </View>
        </View>
      </View>
    );
  };
  /** => cut detail */
  const renderCutDetail = () => {
    return (
      <View>
        <View style={{ marginLeft: 16 }}>
          <View>
            <SnbBadge.Label
              type={'error'}
              value={'Promo Spesial Supplier'}
              iconName={'settings'}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
              <View style={{ width: '60%' }}>
                <SnbText.B3>Promo Potongan Harga Rp 500 Lakme</SnbText.B3>
              </View>
              <SnbText.B3 color={color.green50}>Rp 139.000.000</SnbText.B3>
            </View>
          </View>
          <SnbDivider style={{ marginBottom: 12 }} />
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
              <View style={{ width: '60%' }}>
                <SnbText.B3>Promo Potongan Harga Rp 500 Lakme</SnbText.B3>
              </View>
              <SnbText.B3 color={color.green50}>Rp 139.000.000</SnbText.B3>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbIcon name={'expand_more'} size={24} color={color.black100} />
            <SnbText.B4>Total Potongan</SnbText.B4>
          </View>
          <SnbText.B4>Rp 339</SnbText.B4>
        </TouchableOpacity>
      </View>
    );
  };
  /** => bonus list */
  const renderBonusList = () => {
    return (
      <View>
        <View style={{ marginBottom: 24 }}>
          <SnbText.B4>{'Bonus SKU'}</SnbText.B4>
        </View>
        {dummies.bonusSku.map((item, index) => {
          const isLast = index === dummies.bonusSku.length - 1;
          return (
            <React.Fragment key={index}>
              {renderBonusItem(item)}
              {isLast ? <View /> : <SnbDivider style={{ marginBottom: 12 }} />}
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => bonus item */
  const renderBonusItem = (item) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Image
          source={{
            uri: item.catalogueImages,
          }}
          style={{
            width: 69,
            height: 69,
            marginRight: 8,
          }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ width: '80%' }}>
            <SnbText.B4>{item.name}</SnbText.B4>
          </View>
          <SnbText.C3>{item.promoName}</SnbText.C3>
          <SnbText.C2>{`x${item.qty} Pcs`}</SnbText.C2>
        </View>
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      <ScrollView>{renderContent()}</ScrollView>
    </SnbContainer>
  );
};

export default OmsVerificationView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (voyager)
 * createDate: 09092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
