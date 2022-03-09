import Html from '@core/components/Html';
import React, { FC, useState } from 'react';
import { Dimensions, View , Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  SnbText,
  SnbDivider,
  color,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';

const { height } = Dimensions.get('window');

/** === INTERFACE === */
interface ModalCheckoutTNCProps {
  isOpen: boolean;
  close: () => void;
  // data: models.CheckoutTNC | null;
}

/** === COMPONENT === */
export const ModalCheckoutTNC: FC<ModalCheckoutTNCProps> = ({
  isOpen,
  close
}) => {
  const content = () => {
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <ScrollView
            style={{ paddingVertical: 16, maxHeight: height * 0.6 }}
            showsVerticalScrollIndicator={false}>
            <Html
              value={"<p>- Pembeli harus membayar 12 jam setelah pesanan dibuat. </p><p>- Pesanan tidak akan diproses apabila pembayaran belum dilakukan. </p><p>- Pesanan akan dibatalkan jika batas waktupembayaran habis. </p><p>- Pembeli diharapkan melakukan pembayaran sesuai metode pembayaran yang dipilih. </p><p>- Pembeli diharuskan mentransfer pembayaran ke nomor virtual account yang tertera. </p>"}
              fontSize={12}
            >
            </Html>
          </ScrollView>
      </View>
    )
  }
  return (
    <SnbBottomSheet
    open={isOpen}
    content={content()}
    title={'Syarat dan Ketentuan'}
    closeAction={close}
    actionIcon={'close'}
    />
  )
}