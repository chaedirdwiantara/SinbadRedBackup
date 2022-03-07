/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import React, { FC } from 'react';
import { View, Dimensions, Image } from 'react-native';
import {
  SnbText,
  SnbDivider,
  color,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import * as models from '@models';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

/** === INTERFACE === */
interface ModalThankYouPageOrderDetail {
  isOpen: boolean;
  close: () => void;
  data: any
}
/** === COMPONENT === */
export const ModalThankYouPageOrderDetail : FC<ModalThankYouPageOrderDetail> = ({
  isOpen,
  close,
  data
}) => {
  const orderDetail = () => {
    return <View style={{ paddingBottom: 16 }}></View>
  }
  const content = () => {
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <ScrollView
          style={{ paddingVertical: 16, maxHeight: height * 0.6 }}
          showsVerticalScrollIndicator={false}>
          {orderDetail()}
        </ScrollView>
      </View>
    );
  }
  return (<SnbBottomSheet
  open={isOpen}
  content={content()}
  title={'Detail Pesanan'}
  closeAction={close}
  actionIcon={'close'}
/>)
  // return data !== null ? (
  //   <SnbBottomSheet
  //     open={isOpen}
  //     content={content()}
  //     title={'Detail Pesanan'}
  //     closeAction={close}
  //     actionIcon={'close'}
  //   />
  // ): (
  //   <View/>
  // )
}