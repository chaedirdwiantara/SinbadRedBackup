import { StackActions, useNavigation } from '@react-navigation/native';
import Svg from '@svg';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  color,
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbText,
} from 'react-native-sinbad-ui';
import { DATA_COMPLETENESS_VIEW } from '@screen/account/functions/screens_name';

const STATIC_CONTENT = [
  {
    title: 'Harga Terbaik dari Pemasok',
    text: 'Kami bekerjasama secara langsung dengan pemasok untuk menawarkan Anda harga terbaik di pasar.',
    icon: () => <Svg size={48} name="murah" />,
  },
  {
    title: 'Produk Asli',
    text: 'Berbagai macam produk asli langsung dari pemasok resmi.',
    icon: () => <Svg size={48} name="original" />,
  },
  {
    title: 'Pengiriman Terpercaya',
    text: 'Dapat dilacak dan pengiriman tepat waktu untuk melayani kebutuhan pelanggan Anda.',
    icon: () => <Svg size={48} name="cepat" />,
  },
  {
    title: 'Pembayaran Flexibel',
    text: 'Pembayaran tanpa uang tunai untuk transaksi yang mudah dan andal',
    icon: () => <Svg size={48} name="flexibel" />,
  },
];

const Content: React.FC = () => {
  const { dispatch } = useNavigation();
  return (
    <View style={{ borderTopWidth: 1, borderTopColor: color.black10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ padding: 32 }}>
            <SnbText.H3 align="center">Sinbad membantu Anda dengan:</SnbText.H3>
            <View style={{ marginVertical: 8 }} />
            {STATIC_CONTENT.map((el, idx) => (
              <View
                key={idx}
                style={{
                  marginVertical: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {el.icon()}
                <View style={{ marginHorizontal: 8 }} />
                <View style={{ flex: 1 }}>
                  <SnbText.H3>{el.title}</SnbText.H3>
                  <View style={{ marginVertical: 4 }} />
                  <SnbText.B1>{el.text}</SnbText.B1>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title="Lengkapi Data Sekarang"
          type="primary"
          onPress={() => dispatch(StackActions.replace(DATA_COMPLETENESS_VIEW))}
          disabled={false}
        />
      </View>
    </View>
  );
};

const DataCompletenessIntroView: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 title="Lengkapi Data" type="white" backAction={goBack} />
      <Content />
    </SnbContainer>
  );
};

export default DataCompletenessIntroView;
