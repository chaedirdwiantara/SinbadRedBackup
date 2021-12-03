/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet,
  SnbText,
  color,
  SnbDivider,
  SnbButton,
} from 'react-native-sinbad-ui';
/** === IMPORT TYPE ===  */
import * as models from '@models';
import { ScrollView } from 'react-native-gesture-handler';
/** === TYPE ===  */
interface ErrorPromoModal {
  visible: boolean;
  onBackToCart: () => void;
  onContinueToPayment: () => void;
  amountPromoList: models.ReserveDiscountNotMatchData[];
  bonusPromoList: models.ReserveDiscountNotMatchData[];
}
/** === COMPONENT ===  */
export const ErrorPromoModal: FC<ErrorPromoModal> = ({
  visible,
  amountPromoList,
  bonusPromoList,
  onBackToCart,
  onContinueToPayment,
}) => {
  /** => render error amount promo */
  const renderErrorAmountPromo = () => {
    if (amountPromoList.length === 0) {
      return null;
    }
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.H4>Potongan Harga</SnbText.H4>
        </View>
        <ScrollView style={{ maxHeight: 300 }}>
          {amountPromoList.map((item, index) => {
            return (
              <React.Fragment>
                <SnbDivider style={{ marginVertical: 8 }} />
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{
                      uri: item.productImage,
                    }}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 4,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <SnbText.H4>{item.productName}</SnbText.H4>
                    {item.promoSellers.map((promoName) => {
                      return (
                        <View style={{ marginTop: 8 }}>
                          <SnbText.B2 color={color.red50}>
                            {`Promo potongan harga ${promoName} tidak tersedia`}
                          </SnbText.B2>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  /** => render error bonus promo */
  const renderErrorBonusPromo = () => {
    if (bonusPromoList.length === 0) {
      return null;
    }
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.H4>Bonus SKU</SnbText.H4>
        </View>
        <ScrollView style={{ maxHeight: 300 }}>
          {bonusPromoList.map((item, index) => {
            return (
              <React.Fragment>
                <SnbDivider style={{ marginVertical: 8 }} />
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{
                      uri: item.productImage,
                    }}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 4,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <SnbText.H4>{item.productName}</SnbText.H4>
                    {item.promoSellers.map((promoName) => {
                      return (
                        <View style={{ marginTop: 8 }}>
                          <SnbText.B2 color={color.red50}>
                            {`Promo bonus SKU ${promoName} tidak tersedia`}
                          </SnbText.B2>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  /** => render bottom action */
  const renderBottomAction = () => {
    return (
      <View style={{ height: 150 }}>
        <SnbButton.Multiple
          testID={''}
          vertical
          leftTitle={'Lanjut ke Pembayaran'}
          rightTitle={'Kembali ke Keranjang'}
          leftType={'primary'}
          rightType={'secondary'}
          onPressLeft={() => onContinueToPayment()}
          onPressRight={() => onBackToCart()}
        />
      </View>
    );
  };
  return (
    <SnbBottomSheet
      open={visible}
      content={
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SnbText.H3>Promo Tidak Tersedia</SnbText.H3>
            <View style={{ marginTop: 4, marginBottom: 12 }}>
              <SnbText.B3>
                Maaf, promo berikut sudah tidak lagi tersedia
              </SnbText.B3>
            </View>
          </View>
          {renderErrorAmountPromo()}
          {renderErrorBonusPromo()}
          {renderBottomAction()}
        </View>
      }
    />
  );
};
