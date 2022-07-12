import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  SnbButton2,
  SnbContainer,
  SnbText2,
  colorV2,
  spacingV2 as layout,
  borderV2,
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

  const slideOnBoard = () => {
    return (
      <View>
        <OnBoardSlider data={data} />
        {button()}
        {skipLogin()}
      </View>
    );
  };

  const button = () => {
    return (
      <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
        <View style={{ flex: 1 }}>
          <SnbButton2.Primary
            title={'Masuk'}
            onPress={() => navigate(LOGIN_PHONE_VIEW)}
            size="large"
            full
            outline
          />
        </View>
        <View style={{ marginHorizontal: layout.spacing.sm }} />
        <View style={{ flex: 1 }}>
          <SnbButton2.Primary
            title={'Daftar'}
            onPress={() => navigate(SELF_REGISTRATION_VIEW)}
            disabled={false}
            size="large"
            full
          />
        </View>
      </View>
    );
  };

  const skipLogin = () => {
    return (
      <View style={styles.textSkipLogin}>
        <SnbText2.Paragraph.Default>
          Biarkan saya masuk{' '}
        </SnbText2.Paragraph.Default>
        <View style={{ marginLeft: -layout.spacing.lg }}>
          <SnbButton2.Link
            title="Lewati"
            size="medium"
            onPress={() => reset({ index: 0, routes: [{ name: 'Home' }] })}
          />
        </View>
      </View>
    );
  };

  const content = () => {
    throw new Error('My first Sentry error!');
  };

  const termsNotice = () => {
    return (
      <View style={styles.termsNoticeContainer}>
        <SnbText2.Paragraph.Small color={colorV2.textColor.link} align="center">
          Dengan daftar atau masuk, Anda menyetujui Syarat & Ketentuan serta
          Kebijakan Privasi kami
        </SnbText2.Paragraph.Small>
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
