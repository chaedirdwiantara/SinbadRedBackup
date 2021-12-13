/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import {
  SnbBottomSheet,
  SnbText,
  color,
  SnbDivider,
  SnbButton,
  SnbIcon,
} from 'react-native-sinbad-ui';
/** === IMPORT TYPE ===  */
import * as models from '@models';
/** === TYPE ===  */
interface ErrorStockModal {
  visible: boolean;
  errorData: models.ReserveStockError;
  onBackToCart: () => void;
}
/** === GLOBAL CONST === */
const { height } = Dimensions.get('window');
/** === COMPONENT ===  */
export const ErrorStockModal: FC<ErrorStockModal> = ({
  visible,
  errorData,
  onBackToCart,
}) => {
  /** => render error change */
  const renderErrorChange = () => {
    if (errorData.change.length === 0) {
      return null;
    }
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.H4>Perubahan Harga</SnbText.H4>
        </View>
        <View style={{ maxHeight: 300 }}>
          {errorData.change.map((item, index) => {
            return (
              <React.Fragment>
                <SnbDivider style={{ marginVertical: 8 }} />
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{
                      uri: item.thumbnail,
                    }}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 4,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <SnbText.H4>{item.name}</SnbText.H4>
                    <View style={{ flexDirection: 'row' }}>
                      <SnbText.H4 color={color.red50}>{item.qty}</SnbText.H4>
                      <View style={{ marginHorizontal: 4 }}>
                        <SnbIcon
                          name={'arrow_right'}
                          size={24}
                          color={color.black100}
                        />
                      </View>
                      <SnbText.H4 color={color.red50}>
                        {item.currentStock}
                      </SnbText.H4>
                    </View>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>
      </View>
    );
  };
  /** => render error empty stock */
  const renderErrorEmptyStock = () => {
    if (errorData.emptyStock.length === 0) {
      return null;
    }
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.H4>Barang Habis</SnbText.H4>
        </View>
        <View style={{ maxHeight: 300 }}>
          {errorData.emptyStock.map((item, index) => {
            return (
              <React.Fragment>
                <SnbDivider style={{ marginVertical: 8 }} />
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{
                      uri: item.thumbnail,
                    }}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 4,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <SnbText.H4>{item.name}</SnbText.H4>
                    <View style={{ flexDirection: 'row' }}>
                      <SnbText.H4 color={color.red50}>
                        {'Barang Habis'}
                      </SnbText.H4>
                    </View>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>
      </View>
    );
  };
  /** => render error not found */
  const renderErrorNotFound = () => {
    if (errorData.notFound.length === 0) {
      return null;
    }
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.H4>Barang Habis</SnbText.H4>
        </View>
        <View style={{ maxHeight: 300 }}>
          {errorData.notFound.map((item, index) => {
            return (
              <React.Fragment>
                <SnbDivider style={{ marginVertical: 8 }} />
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{
                      uri: item.thumbnail,
                    }}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 4,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <SnbText.H4>{item.name}</SnbText.H4>
                    <View style={{ flexDirection: 'row' }}>
                      <SnbText.H4 color={color.red50}>
                        {'Product Tidak Tersedia'}
                      </SnbText.H4>
                    </View>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>
      </View>
    );
  };
  /** => render bottom action */
  const renderBottomAction = () => {
    return (
      <View style={{ height: 75 }}>
        <SnbButton.Single
          testID={''}
          title={'Tinjau Keranjang'}
          onPress={onBackToCart}
          type={'primary'}
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
              paddingHorizontal: 16,
            }}>
            <SnbText.H3>Konfirmasi Stock</SnbText.H3>
            <View style={{ marginTop: 4, marginBottom: 12 }}>
              <SnbText.B3 align={'center'}>
                Beberapa informasi produk pada pesanan Anda telah diperbaharui
                mohon tinjau ulang keranjang dan coba lagi
              </SnbText.B3>
            </View>
          </View>
          <ScrollView style={{ maxHeight: height * 0.5 }}>
            {renderErrorChange()}
            {renderErrorEmptyStock()}
            {renderErrorNotFound()}
          </ScrollView>
          {renderBottomAction()}
        </View>
      }
    />
  );
};
