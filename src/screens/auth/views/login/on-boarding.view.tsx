import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  SnbContainer,
  colorV2,
  spacingV2 as layout,
  borderV2,
  FooterButton,
  SnbInfoBox2,
} from 'react-native-sinbad-ui';
import OnBoardSlider from '@core/components/OnBoardSlider';
import {
  SELF_REGISTRATION_VIEW,
  LOGIN_PHONE_VIEW,
} from '@screen/auth/functions/screens_name';
import { useNavigation } from '@react-navigation/core';
import { setFlagByDeviceId } from '@core/functions/firebase/flag-rtdb.function';

interface Props {
  testID?: string;
}

const OnBoardingView: React.FC<Props> = () => {
  const { navigate, reset } = useNavigation();
  const [data] = useState([
    {
      id: 1,
      title: 'Harga Terbaik dari Pemasok',
      image: require('@image/onboard/onboard1.png'),
      message:
        'Kami bekerja sama secara langsung dengan pemasok untuk menawarkan Anda harga terbaik di pasar',
    },
    {
      id: 2,
      title: 'Berbagai Produk Asli',
      image: require('@image/onboard/onboard2.png'),
      message: 'Berbagai macam produk asli langsung dari pemasok resmi',
    },
    {
      id: 3,
      title: 'Pengiriman Yang Terpercaya',
      image: require('@image/onboard/onboard3.png'),
      message:
        'Dapat dilacak dan pengiriman tepat waktu untuk melayani kebutuhan pelanggan Anda',
    },
    {
      id: 4,
      title: 'Pembayaran Fleksibel',
      image: require('@image/onboard/onboard4.png'),
      message:
        'Pembayaran tanpa uang tunai untuk transaksi yang mudah dan andal',
    },
  ]);

  setFlagByDeviceId();

  const content = () => {
    return (
      <View style={styles.container}>
        <View />
        <OnBoardSlider data={data} />
        <FooterButton.Dual
          testID={'OnBoarding'}
          title2="Masuk"
          button2Press={() => navigate(LOGIN_PHONE_VIEW)}
          title1="Daftar"
          button1Press={() => navigate(SELF_REGISTRATION_VIEW)}
          textLink="Lewati"
          description="Biarkan saya masuk"
          textLinkPress={() => reset({ index: 0, routes: [{ name: 'Home' }] })}
        />
        <SnbInfoBox2
          title="Dengan daftar atau masuk, Anda menyetujui Syarat & Ketentuan serta
          Kebijakan Privasi kami"
          color="blue"
          align='center'
        />
      </View>
    );
  };

  return <SnbContainer color="white">{content()}</SnbContainer>;
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  textSkipLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: layout.spacing.sm,
  },
  termsNoticeContainer: {
    backgroundColor: colorV2.special.blue10,
    borderRadius: borderV2.radius.sm,
    padding: layout.spacing.md,
    margin: layout.spacing.lg,
    marginBottom: layout.spacing.xxl,
  },
});

export default OnBoardingView;
