import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  SnbButton2,
  SnbContainer,
  SnbText2,
  color,
} from 'react-native-sinbad-ui';
import OnBoardSlider from '@core/components/OnBoardSlider';
import {
  SELF_REGISTRATION_VIEW,
  LOGIN_PHONE_VIEW,
} from '@screen/auth/functions/screens_name';
import { useNavigation } from '@react-navigation/core';

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
      <View style={{ flexDirection: 'row', padding: 16 }}>
        <View style={{ flex: 1 }}>
          <SnbButton2.Primary
            title={'Masuk'}
            onPress={() => navigate(LOGIN_PHONE_VIEW)}
            size="large"
            full
            outline
          />
        </View>
        <View style={{ marginHorizontal: 8 }} />
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
        <TouchableOpacity
          onPress={() => reset({ index: 0, routes: [{ name: 'Home' }] })}>
          <SnbText2.Body.Default color={color.blue50}>
            Lewati
          </SnbText2.Body.Default>
        </TouchableOpacity>
      </View>
    );
  };

  const termsNotice = () => {
    return (
      <View style={styles.termsNoticeContainer}>
        <SnbText2.Paragraph.Default color={color.blue50} align="center">
          Dengan daftar atau masuk, Anda menyetujui Syarat & Ketentuan serta
          Kebijakan Privasi kami
        </SnbText2.Paragraph.Default>
      </View>
    );
  };

  const content = () => {
    return (
      <View style={styles.container}>
        <View />
        {slideOnBoard()}
        {termsNotice()}
      </View>
    );
  };

  return <SnbContainer color="white">{content()}</SnbContainer>;
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  image: {
    alignSelf: 'center',
    marginVertical: 32,
    aspectRatio: 1,
  },
  textSlider: {
    flex: 1,
    width: 240,
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 72,
  },
  textSkipLogin: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 8,
  },
  termsNoticeContainer: {
    backgroundColor: color.blue10,
    borderRadius: 4,
    padding: 12,
    margin: 16,
    marginBottom: 32,
  },
});

export default OnBoardingView;
