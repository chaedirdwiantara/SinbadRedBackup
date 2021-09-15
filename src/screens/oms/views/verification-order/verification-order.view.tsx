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
  SnbButton,
} from 'react-native-sinbad-ui';
import { goBack, goToCheckout } from '../../functions';
import { VerificationOrderStyle } from '../../styles';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
/** === INTERFACE === */
/** === DUMMIES === */
const dummies = {
  totalTransaction: 27758640,
  totalRebate: 0,
  bonusProduct: [
    {
      promoId: 879,
      promoName: 'PROMOFGCHEESE',
      productId: 'uuid',
      productName: 'MEGkeju Serbaguna 165 gr (48)',
      productQty: 35,
      productImageUrl:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/31438/image_1626691143340.png',
    },
    {
      promoId: 879,
      promoName: 'PROMOFGCHEESE',
      productId: 'uuid',
      productName: 'MEGkeju Serbaguna 165 gr (48)',
      productQty: 35,
      productImageUrl:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/31438/image_1626691143340.png',
    },
  ],
  discountProduct: [
    {
      productName: 'SGM EKSPLOR 1+ MADU 1200 GR GA',
      productImageUrl:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      qty: 20,
      price: 25000,
      totalProductPrice: 500000,
      totalProductDiscount: 21000,
      promoList: [
        {
          promoId: 11,
          promoName: 'Promo 1',
          promoValue: 5000,
          promoOwner: 'supplier',
        },
        {
          promoId: 12,
          promoName: 'Promo 2',
          promoValue: 6000,
          promoOwner: 'none',
        },
      ],
      voucherList: [
        {
          voucherId: 1,
          voucherName: 'Voucher Promo 1',
          voucherValue: 5000,
          voucherOwner: 'none',
        },
      ],
    },
  ],
  notPromoSku: [
    {
      productName: 'SGM EKSPLOR 1+ MADU 1200 GR GA',
      productImageUrl:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      qty: 20,
      price: 25000,
      totalProductPrice: 500000,
    },
  ],
  meta: 'TBD',
};
/** === COMPONENT === */
const OmsVerificationOrderView: FC = () => {
  const [activeSpoiler, setActiveSpoiler] = React.useState<null | number>(null);
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Verifikasi Order'}
        backAction={() => goBack()}
      />
    );
  };
  /** => discount list */
  const renderDiscountList = () => {
    return (
      <View>
        <View style={VerificationOrderStyle.listHeader}>
          <SnbText.B4>{`Produk Mendapatkan Potongan Harga (${dummies.discountProduct.length} SKU)`}</SnbText.B4>
        </View>
        {dummies.discountProduct.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {renderDiscountItem(item)}
              <SnbDivider style={VerificationOrderStyle.listDivider} />
              {renderDiscountDetail(
                item.promoList,
                item.voucherList,
                item.totalProductDiscount,
                index,
              )}
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => discount item */
  const renderDiscountItem = (item: {
    productImageUrl: string;
    productName: string;
    qty: number;
    price: number;
    totalProductPrice: number;
  }) => {
    return (
      <View style={VerificationOrderStyle.listItemContainer}>
        <Image
          source={{
            uri: item.productImageUrl,
          }}
          style={VerificationOrderStyle.listItemProductImage}
        />
        <View style={VerificationOrderStyle.listItemProductDetailContainer}>
          <View style={VerificationOrderStyle.listItemProductNameContainer}>
            <SnbText.B4>{item.productName}</SnbText.B4>
          </View>
          <SnbText.C2>{`x${item.qty} Pcs`}</SnbText.C2>
          <SnbText.C2 color={color.red50}>{toCurrency(item.price)}</SnbText.C2>
          <View style={VerificationOrderStyle.listItemProductPriceContainer}>
            <SnbText.C2>Total</SnbText.C2>
            <SnbText.C2>{toCurrency(item.totalProductPrice)}</SnbText.C2>
          </View>
        </View>
      </View>
    );
  };
  /** => discount detail */
  const renderDiscountDetail = (
    promoList: {
      promoId: number;
      promoName: string;
      promoValue: number;
      promoOwner: string;
    }[],
    voucherList: {
      voucherId: number;
      voucherName: string;
      voucherValue: number;
      voucherOwner: string;
    }[],
    totalDiscount: number,
    itemIndex: number,
  ) => {
    const isActive = activeSpoiler === itemIndex;
    return (
      <View>
        {isActive ? (
          <View style={VerificationOrderStyle.listItemProductDiscountList}>
            {promoList.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.promoOwner !== 'none' ? (
                    <SnbBadge.Label
                      type={'error'}
                      value={item.promoOwner}
                      iconName={'settings'}
                    />
                  ) : (
                    <View />
                  )}
                  <View
                    style={VerificationOrderStyle.listItemProductDiscountItem}>
                    <View
                      style={
                        VerificationOrderStyle.listItemProductDiscountName
                      }>
                      <SnbText.B3>{item.promoName}</SnbText.B3>
                    </View>
                    <SnbText.B3 color={color.green50}>
                      {toCurrency(item.promoValue)}
                    </SnbText.B3>
                  </View>
                  <SnbDivider style={{ marginBottom: 12 }} />
                </React.Fragment>
              );
            })}
            {voucherList.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.voucherOwner !== 'none' ? (
                    <SnbBadge.Label
                      type={'error'}
                      value={item.voucherOwner}
                      iconName={'settings'}
                    />
                  ) : (
                    <View />
                  )}
                  <View
                    style={VerificationOrderStyle.listItemProductDiscountItem}>
                    <View
                      style={
                        VerificationOrderStyle.listItemProductDiscountName
                      }>
                      <SnbText.B3>{item.voucherName}</SnbText.B3>
                    </View>
                    <SnbText.B3 color={color.green50}>
                      {toCurrency(item.voucherValue)}
                    </SnbText.B3>
                  </View>
                  <SnbDivider style={VerificationOrderStyle.listDivider} />
                </React.Fragment>
              );
            })}
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={() => {
            if (isActive) {
              setActiveSpoiler(null);
            } else {
              setActiveSpoiler(itemIndex);
            }
          }}
          style={VerificationOrderStyle.listItemProductDiscountTouchable}>
          <View
            style={
              VerificationOrderStyle.listItemProductDiscountTotalTextContainer
            }>
            <SnbIcon
              name={isActive ? 'expand_less' : 'expand_more'}
              size={24}
              color={color.black100}
            />
            <SnbText.B4>Total Potongan</SnbText.B4>
          </View>
          <SnbText.B4>{toCurrency(totalDiscount)}</SnbText.B4>
        </TouchableOpacity>
      </View>
    );
  };
  /** => bonus list */
  const renderBonusList = () => {
    return (
      <View>
        <View style={VerificationOrderStyle.listHeader}>
          <SnbText.B4>{'Bonus SKU'}</SnbText.B4>
        </View>
        {dummies.bonusProduct.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {renderBonusItem(item)}
              <SnbDivider style={VerificationOrderStyle.listDivider} />
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => bonus item */
  const renderBonusItem = (item: {
    productImageUrl: string;
    productName: string;
    promoName: string;
    productQty: number;
  }) => {
    return (
      <View style={VerificationOrderStyle.listItemContainer}>
        <Image
          source={{
            uri: item.productImageUrl,
          }}
          style={VerificationOrderStyle.listItemProductImage}
        />
        <View style={VerificationOrderStyle.listItemProductDetailContainer}>
          <View style={VerificationOrderStyle.listItemProductNameContainer}>
            <SnbText.B4>{item.productName}</SnbText.B4>
          </View>
          <SnbText.C3>{item.promoName}</SnbText.C3>
          <SnbText.C2>{`x${item.productQty} Pcs`}</SnbText.C2>
        </View>
      </View>
    );
  };
  /** => non-discount list */
  const renderNonDiscountList = () => {
    return (
      <View>
        <View style={VerificationOrderStyle.listHeader}>
          <SnbText.B4>{'Produk Tidak Mendapatkan Potongan Harga'}</SnbText.B4>
        </View>
        {dummies.notPromoSku.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {renderNonDiscountItem(item)}
              <SnbDivider style={VerificationOrderStyle.listDivider} />
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => non-discount item */
  const renderNonDiscountItem = (item: {
    productImageUrl: string;
    productName: string;
    qty: number;
    price: number;
    totalProductPrice: number;
  }) => {
    return (
      <View style={VerificationOrderStyle.listItemContainer}>
        <Image
          source={{
            uri: item.productImageUrl,
          }}
          style={VerificationOrderStyle.listItemProductImage}
        />
        <View style={VerificationOrderStyle.listItemProductDetailContainer}>
          <View style={VerificationOrderStyle.listItemProductNameContainer}>
            <SnbText.B4>{item.productName}</SnbText.B4>
          </View>
          <SnbText.C2>{`x${item.qty} Pcs`}</SnbText.C2>
          <SnbText.C2 color={color.red50}>{toCurrency(item.price)}</SnbText.C2>
          <View style={VerificationOrderStyle.listItemProductPriceContainer}>
            <SnbText.C2>Total</SnbText.C2>
            <SnbText.C2>{toCurrency(item.totalProductPrice)}</SnbText.C2>
          </View>
        </View>
      </View>
    );
  };
  /** => bottom */
  const renderBottom = () => {
    return (
      <View style={VerificationOrderStyle.bottomContainer}>
        <View>
          <View style={VerificationOrderStyle.bottomTextContainer}>
            <SnbText.B4>Total (Sebelum Pajak)</SnbText.B4>
            <SnbDivider style={{ marginVertical: 8 }} />
            <View style={VerificationOrderStyle.bottomTextRow}>
              <SnbText.B3>Total Transaksi</SnbText.B3>
              <SnbText.B3>{toCurrency(dummies.totalTransaction)}</SnbText.B3>
            </View>
            <View style={VerificationOrderStyle.bottomTextRow}>
              <SnbText.B3>Total Potongan</SnbText.B3>
              <SnbText.B3 color={color.green50}>
                {toCurrency(dummies.totalRebate)}
              </SnbText.B3>
            </View>
          </View>
          <View style={VerificationOrderStyle.bottomButtonContainer}>
            <SnbButton.Single
              type={'primary'}
              title={'Lanjut Ke Pembayaran'}
              disabled={false}
              onPress={() => goToCheckout()}
            />
          </View>
        </View>
      </View>
    );
  };
  /** => content */
  const renderContent = () => {
    return (
      <View style={VerificationOrderStyle.contentContainer}>
        <View>
          <SnbText.B4>BERIKUT INI ADALAH RINGKASAN ORDER ANDA</SnbText.B4>
          <SnbDivider style={VerificationOrderStyle.mainDivider} />
        </View>
        {renderDiscountList()}
        {renderBonusList()}
        {renderNonDiscountList()}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
      {renderBottom()}
    </SnbContainer>
  );
};

export default OmsVerificationOrderView;
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