import Svg from '@svg';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  SnbText2,
  colorV2,
  spacingV2,
  SnbButton2,
} from 'react-native-sinbad-ui';

/** === TYPE === */
type Props = {
  testID: string;
  onPress: () => void;
};
// render error if error get product detail
const ErrorView: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Svg size={240} name="produk_tidak_ditemukan" />
      <View style={styles.textHeader}>
        <SnbText2.Headline.Default>
          Maaf, Produk Tidak Tersedia
        </SnbText2.Headline.Default>
      </View>
      <View style={styles.textContent}>
        <SnbText2.Paragraph.Default>
          Yuk! cari produk lainnya
        </SnbText2.Paragraph.Default>
      </View>
      <SnbButton2.Primary
        outline
        onPress={props.onPress}
        title="Kembali ke Beranda"
        size="medium"
        testID={'error-pdp.' + props.testID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorV2.neutral.cloud10,
  },
  textHeader: { alignItems: 'center', marginBottom: spacingV2.spacing.sm },
  textContent: { alignItems: 'center', marginBottom: spacingV2.spacing.md },
});

export default ErrorView;
