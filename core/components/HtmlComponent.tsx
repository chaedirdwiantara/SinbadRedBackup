import React from 'react';
import { View, Linking } from 'react-native';
import RenderHtml, {
  defaultSystemFonts,
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import { color, typography } from '@sinbad/design-token/mobile';
const systemFonts = [...defaultSystemFonts, 'Inter-Regular', 'Inter-SemiBold'];
/** === INTERFACE === */
interface Props {
  value: string;
  testID?: string;
}
/** == COMPONENT === */
const SnbHtml2: React.FC<Props> = (props) => {
  const customHTMLElementModels = {
    p: HTMLElementModel.fromCustomModel({
      tagName: 'p',
      mixedUAStyles: {
        fontFamily: 'Inter-Regular',
        fontSize: typography.paragraph.small.fontSize,
        lineHeight: typography.paragraph.small.lineHeight,
        letterSpacing: typography.paragraph.small.letterSpacing,
        color: color.textColor.secondary,
      },
      contentModel: HTMLContentModel.block,
    }),
    a: HTMLElementModel.fromCustomModel({
      tagName: 'a',
      mixedUAStyles: {
        fontFamily: 'Inter-Regular',
        fontSize: typography.paragraph.small.fontSize,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        lineHeight: typography.paragraph.small.lineHeight,
        letterSpacing: typography.paragraph.small.letterSpacing,
        color: color.textColor.link,
      },
      contentModel: HTMLContentModel.block,
    }),
    strong: HTMLElementModel.fromCustomModel({
      tagName: 'strong',
      mixedUAStyles: {
        fontFamily: 'Inter-SemiBold',
        fontSize: typography.body.small.fontSize,
        lineHeight: typography.body.small.lineHeight,
        letterSpacing: typography.body.small.letterSpacing,
        color: color.textColor.secondary,
      },
      contentModel: HTMLContentModel.mixed,
    }),
    ul: HTMLElementModel.fromCustomModel({
      tagName: 'ul',
      mixedUAStyles: {
        fontFamily: 'Inter-Regular',
        fontSize: typography.paragraph.small.fontSize,
        lineHeight: typography.paragraph.small.lineHeight,
        letterSpacing: typography.paragraph.small.letterSpacing,
        color: color.textColor.secondary,
        listStyleType: 'disc',
        marginLeft: 10,
      },
      contentModel: HTMLContentModel.block,
    }),
    ol: HTMLElementModel.fromCustomModel({
      tagName: 'ol',
      mixedUAStyles: {
        fontFamily: 'Inter-Regular',
        fontSize: typography.paragraph.small.fontSize,
        lineHeight: typography.paragraph.small.lineHeight,
        letterSpacing: typography.paragraph.small.letterSpacing,
        color: color.textColor.secondary,
        listStyleType: 'decimal',
        marginLeft: 10,
      },
      contentModel: HTMLContentModel.block,
    }),
    li: HTMLElementModel.fromCustomModel({
      tagName: 'li',
      mixedUAStyles: {
        fontFamily: 'Inter-Regular',
        fontSize: typography.paragraph.small.fontSize,
        lineHeight: typography.paragraph.small.lineHeight,
        letterSpacing: typography.paragraph.small.letterSpacing,
        color: color.textColor.secondary,
      },
      contentModel: HTMLContentModel.block,
    }),
    br: HTMLElementModel.fromCustomModel({
      tagName: 'br',
      mixedUAStyles: {
        lineHeight: typography.paragraph.small.lineHeight,
      },
      contentModel: HTMLContentModel.block,
    }),
  };
  /** => main */
  return (
    <View>
      <RenderHtml
        systemFonts={systemFonts}
        source={{ html: props.value }}
        contentWidth={0}
        renderersProps={{
          a: {
            onPress: (_event, href) => {
              Linking.openURL(href);
            },
          },
        }}
        customHTMLElementModels={customHTMLElementModels}
      />
    </View>
  );
};

export default SnbHtml2;
/**
 * <Html
      value={
      '<p>Ada kabar gembira dari BCA untuk para pemilik usaha di Sinbad!</p><p>Perkenalkan inovasi terbaru dari BCA</p><p>Merchant BCA, aplikasi terbaru untuk kemudahan bisnis</p><p>Dengan aplikasi Merchant BCA jadi lebih mudah untuk:</p><p>Ajukan alat pembayaran mesin EDC/QRIS. Terima pembayaran dari pelanggan bisa cashless.</p><p>Pantau transaksi di toko secara real time dari handphone</p><p>Yuk #BukaJalan usaha makin lancar dengan aplikasi Merchant BCA!<p></p><p>info lebih lanjut di <a href="https://google.com" target="_blank">https://bca.id/3DJNdtQ</a></p><p>Untuk link promosi lainnya apabila dibutuhkan untuk promosi lebih lanjut terlampir di bawah ini</p><p>Email blast : <a href="https://viewstripo.email/ca6880de-7a89-4a6f-a736-6b20428c768c1631159007770"target="_blank">https://viewstripo.email/ca6880de-7a89-4a6f-a736-6b20428c768c1631159007770</a></p><p>Facebook :  <a href="https://bca.id/38BRvEY" target="_blank">https://bca.id/38BRvEY</a></p><p>Instagram Feed :  <a href="https://bca.id/bcamsinbad" target="_blank">https://bca.id/bcamsinbad</a></p><p>Instagram Story :  <a href="https://bca.id/2Yf3jLr" target="_blank">https://bca.id/2Yf3jLr</a></p><p>Whatsapp :  <a href="https://bca.id/3jCqtnm" target="_blank">https://bca.id/3jCqtnm</a></p><p>Web Banner : <a href="https://bca.id/3DJNdtQ" target="_blank">https://bca.id/3DJNdtQ</a></p>'
      }
      fontSize={12}
      short
      seeMore={'Baca Selengkapnya'}
      seeMorePress={() => console.log('lalal')}
   />
 */
