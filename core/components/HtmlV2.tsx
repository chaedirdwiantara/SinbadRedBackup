import React from 'react';
import { Linking, View, TouchableOpacity, Text } from 'react-native';
import fonts from 'react-native-sinbad-ui/src/utils/fonts';
import {
  ScalableTextSize,
  ScalableLineHeight,
} from 'react-native-sinbad-ui/src/helpers/ScalableText';
import { color, colorV2 } from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface Props {
  value: string;
  fontSize: number;
  short?: boolean;
  seeMoreFont?: any;
  seeMore?: string;
  seeMorePress?: () => void;
}
/** == COMPONENT === */
const HtmlV2: React.FC<Props> = (props) => {
  /** => State */
  const [data] = React.useState(props.value);
  const [forDiv, setForDiv] = React.useState([]);
  const [seeMore, setSeeMore] = React.useState(false);
  /** => Effect */
  React.useEffect(() => {
    let a: any = [];
    const _forDiv = data.split('</p>');
    _forDiv.map((e, index) => {
      if (index !== _forDiv.length - 1) {
        let d = [];
        const b = e.slice(3);
        const c = b.search('<a href');
        if (c === 0) {
          d = parseLink(b);
        } else {
          d = parseBold(b);
        }
        a.push(d);
        setForDiv(a);
      }
    });
  }, []);
  /** === FUNCTION ===  */
  /** === a href === */
  const parseLink = (link: string) => {
    let c: any = [];
    c.push('link');
    const a = link.split('"');
    c.push(a[1]);
    const b = a[4].split('</a>');
    c.push(b[0].slice(1));
    return c;
  };
  /** === b === */
  const parseBold = (text: string) => {
    let b: any = [];
    const a = text.split('<b>');
    if (a.length > 1) {
      b.push('text');
      a.map((e) => {
        let f = [];
        const g = e.search('</b>');
        if (g > -1) {
          f = [];
          f.push('b');
          f.push(e.substring(0, g));
          b.push(f);
          const h = e.substring(g + 4, e.length);
          if (h.length > 0) {
            const u = h.search('<a href');
            if (u > -1) {
              const k: any = parseLinkMultiple(h);
              k.map((m: any, q: any) => {
                if (q > 0) {
                  b.push(m);
                }
              });
            } else {
              f = [];
              f.push('t');
              f.push(h);
              b.push(f);
            }
          }
        } else {
          f = [];
          f.push('t');
          f.push(e);
          b.push(f);
        }
      });
    } else {
      const c = text.search('<a href');
      if (c > -1) {
        b = parseLinkMultiple(text);
      } else {
        b.push('text');
        b.push(text);
      }
    }
    return b;
  };
  /** === a href multiple */
  const parseLinkMultiple = (link: string) => {
    let c = [];
    const a = link.split('<a href');
    if (a.length > 1) {
      c.push('text');
      a.map((d) => {
        let f = [];
        const g = d.search('</a>');
        if (g > -1) {
          const h = parseLink(d);
          c.push(h);
          const j = d.substring(g + 4, d.length);
          if (j.length > 0) {
            f = [];
            f.push('t');
            f.push(j);
            c.push(f);
          }
        } else {
          f = [];
          f.push('t');
          f.push(d);
          c.push(f);
        }
      });
      return c;
    }
  };
  /** check height */
  const onLayout = (e: any) => {
    const a = Math.round(e.nativeEvent.layout.height / props.fontSize + 18);
    if (a + 1 === 3) {
      setSeeMore(true);
    }
  };
  /** === VIEW === */
  /** => see more */
  const seeMoreItem = () => {
    return props.seeMore && props.short && seeMore ? (
      <TouchableOpacity
        style={{ paddingVertical: 8 }}
        onPress={props.seeMorePress}>
        <Text
          style={{
            fontFamily: fonts.SemiBold,
            fontSize: ScalableTextSize(props.fontSize),
            lineHeight: ScalableLineHeight(18),
            color: colorV2.textColor.secondary
          }}>
          {props.seeMore}
        </Text>
      </TouchableOpacity>
    ) : null;
  };
  /** => content */
  const content = () => {
    return forDiv.map((e: any, index: number) => {
      switch (e[0]) {
        case 'text':
          if (e.length > 2) {
            return e.map((d: any, i: number) => {
              if (i > 0) {
                switch (d[0]) {
                  case 't':
                    return (
                      <Text
                        key={i}
                        style={{
                          fontFamily: fonts.Medium,
                          fontSize: ScalableTextSize(props.fontSize),
                          lineHeight: ScalableLineHeight(18),
                          color: colorV2.textColor.secondary,
                        }}>
                        {d[1]}
                        {i === e.length - 1 ? '\n' : null}
                      </Text>
                    );
                  case 'b':
                    return (
                      <Text
                        key={i}
                        style={{
                          fontFamily: fonts.Bold,
                          fontSize: ScalableTextSize(props.fontSize),
                          lineHeight: ScalableLineHeight(18),
                          color: colorV2.textColor.secondary
                        }}>
                        {d[1]}
                        {i === e.length - 1 ? '\n' : null}
                      </Text>
                    );
                  case 'link':
                    return (
                      <Text
                        style={{
                          fontFamily: fonts.SemiBold,
                          fontSize: ScalableTextSize(props.fontSize),
                          lineHeight: ScalableLineHeight(18),
                          color: color.blue50,
                        }}
                        onPress={() => Linking.openURL(d[1])}
                        key={i}>
                        {d[2]}
                        {i === e.length - 1 ? '\n' : null}
                      </Text>
                    );
                  default:
                    return null;
                }
              }
            });
          }
          return (
            <Text
              style={{
                fontFamily: fonts.Medium,
                fontSize: ScalableTextSize(props.fontSize),
                lineHeight: ScalableLineHeight(18),
              }}
              key={index}>
              {e[1]}
              {'\n'}
            </Text>
          );
        case 'link':
          return (
            <Text
              style={{
                fontFamily: fonts.SemiBold,
                fontSize: ScalableTextSize(props.fontSize),
                lineHeight: ScalableLineHeight(18),
                color: color.blue50,
              }}
              key={index}
              onPress={() => Linking.openURL(e[1])}>
              {e[2]}
              {'\n'}
            </Text>
          );
        default:
          return null;
      }
    });
  };
  /** => main */
  return (
    <View>
      <Text numberOfLines={props.short ? 3 : 0} onLayout={onLayout} style={{color:colorV2.textColor.secondary}}>
        {content()}
      </Text>
      {seeMoreItem()}
    </View>
  );
};

export default HtmlV2;
/**
 * <Html
      value={
      '<p>Ada kabar gembira dari BCA untuk para pemilik usaha di Sinbad!</p><p>Perkenalkan inovasi terbaru dari BCA</p><p>Merchant BCA, aplikasi terbaru untuk kemudahan bisnis</p><p>Dengan aplikasi Merchant BCA jadi lebih mudah untuk:</p><p>Ajukan alat pembayaran mesin EDC/QRIS. Terima pembayaran dari pelanggan bisa cashless.</p><p>Pantau transaksi di toko secara real time dari handphone</p><p>Yuk #BukaJalan usaha makin lancar dengan aplikasi Merchant BCA!<p></p><p>info lebih lanjut di <a href="https://bca.id/3DJNdtQ" target="_blank">https://bca.id/3DJNdtQ</a></p><p>Untuk link promosi lainnya apabila dibutuhkan untuk promosi lebih lanjut terlampir di bawah ini</p><p>Email blast : <a href="https://viewstripo.email/ca6880de-7a89-4a6f-a736-6b20428c768c1631159007770"target="_blank">https://viewstripo.email/ca6880de-7a89-4a6f-a736-6b20428c768c1631159007770</a></p><p>Facebook :  <a href="https://bca.id/38BRvEY" target="_blank">https://bca.id/38BRvEY</a></p><p>Instagram Feed :  <a href="https://bca.id/bcamsinbad" target="_blank">https://bca.id/bcamsinbad</a></p><p>Instagram Story :  <a href="https://bca.id/2Yf3jLr" target="_blank">https://bca.id/2Yf3jLr</a></p><p>Whatsapp :  <a href="https://bca.id/3jCqtnm" target="_blank">https://bca.id/3jCqtnm</a></p><p>Web Banner : <a href="https://bca.id/3DJNdtQ" target="_blank">https://bca.id/3DJNdtQ</a></p>'
      }
      fontSize={12}
      short
      seeMore={'Baca Selengkapnya'}
      seeMorePress={() => console.log('lalal')}
   />
 */
