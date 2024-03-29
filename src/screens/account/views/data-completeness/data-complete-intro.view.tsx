import { useNavigation } from '@react-navigation/native';
import Svg from '@svg';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  SnbText2,
  spacingV2 as layout,
  FooterButton,
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
  const { navigate } = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ padding: layout.spacing.xxl }}>
            <SnbText2.Headline.Default align="center">
              Sinbad membantu Anda dengan:
            </SnbText2.Headline.Default>
            <View style={{ marginVertical: layout.spacing.sm }} />
            {STATIC_CONTENT.map((el, idx) => (
              <View
                key={idx}
                style={{
                  marginVertical: layout.spacing.lg,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {el.icon()}
                <View style={{ marginHorizontal: layout.spacing.sm }} />
                <View style={{ flex: 1 }}>
                  <SnbText2.Headline.Default>
                    {el.title}
                  </SnbText2.Headline.Default>
                  <View style={{ marginVertical: 4 }} />
                  <SnbText2.Paragraph.Small align="justify">
                    {el.text}
                  </SnbText2.Paragraph.Small>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <FooterButton.Single
        title="Lengkapi Data Sekarang"
        buttonPress={() => navigate(DATA_COMPLETENESS_VIEW)}
        testID={'06.1'}
      />
    </View>
  );
};

const DataCompletenessIntroView: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        title="Lengkapi Data"
        color="white"
        backAction={goBack}
      />
      <Content />
    </SnbContainer>
  );
};

export default DataCompletenessIntroView;
