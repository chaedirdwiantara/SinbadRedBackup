import React, { FC, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbTextField,
  color,
  styles,
  SnbCarousel,
} from 'react-native-sinbad-ui';
import { goBack } from '../functions';
/** === IMPORT STYLE HERE === */
import HelpFaqStyle from '../styles/help-faq.style';

const { width } = Dimensions.get('window');

const HelpFaqView: FC = () => {
  const [, setActiveIndex] = useState(0);
  const [tag] = useState([
    'Voucher',
    'Pembayaran',
    'Order',
    'Pengajuan Retur',
    'Akun',
  ]);
  const [carouselItems] = useState([
    {
      title: 'Pertanyaan Umum',
      content: [
        {
          question: 'Bagaimana caranya mendaftar sebagai merchant?',
          answer:
            'Hubungi CS kami, dan kirimkan Nama Toko, Nama Merchant dan Photo via WA CS Sinbad untuk login details.',
        },
        {
          question: 'Bagaimana caranya pesan barang?',
          answer:
            'Ketuk tombol Langsung Pesan. Atau cari produk melalui kategori,rekomendasi, promo, brand.',
        },
        {
          question:
            'Jika saya lupa login / password, bagaimana cara masuk aplikasi Sinbad?',
          answer:
            'Hubungi CS atau Salesmen kami untuk minta username, atau reset password dari halaman pertama aplikasi.',
        },
      ],
    },
    {
      title: 'Seputar Order',
      content: [
        {
          question: 'Bagaimana cara membatalkan order?',
          answer:
            'Selama 30 menit setelah melakukan Order, pesanan dapat dibatalkan sebelum masuk status Dikemas. Ketuk tombol Batalkan Pesanan dibawah halaman Status Order.',
        },
        {
          question: 'Mengapa pesanan saya di batalkan?',
          answer:
            'Ada dua kemungkinan pesanan Merchant dibatalkan: Toko sudah mencapai Credit Limit dan tagihan belum lunas, atau, Stock di gudang habis',
        },
        {
          question: 'Mengapa pesanan saya belum tiba diatas 2x 24 jam?',
          answer:
            'Dikarenakan ada schedule dari gudang, pesanan Merchant masih dalam proses pengiriman dan sudah di muat di schedule pengiriman.',
        },
      ],
    },
    {
      title: 'Seputar Akun',
      content: [
        {
          question: 'Bagaimana caranya retur barang?',
          answer: 'lihat Fitur retur barang ada di bagian Bantuan.',
        },
        {
          question:
            'Kesulitan untuk menggunakan aplikasi Sinbad, kemana saya harus mencari bantuan?',
          answer:
            'Merchant dapat menelfon Customer Service Sinbad atau WhatsApp 08988386606. Atau, merchant dapat minta bantuan dari Salesmen regular toko merchant.',
        },
        {
          question: 'Aplikasi saya bermasalah, bagaimana cara memperbaikinya?',
          answer: 'Anda bisa melakukan langkah-langkah berikut:',
          list: [
            'Pastikan versi aplikasi Sinbad adalah versi sudah diperbarui',
            'Clear cache/hapus data aplikasi sementara',
            'Cek memori Android anda, hapus data jika sudah terlalu penuh',
            'Kontak CS untuk melaporkan kendala',
          ],
        },
      ],
    },
    {
      title: 'Seputar Retur',
      content: [
        {
          question: 'Mengapa saya kesulitan membuka aplikasi Sinbad?',
          answer:
            'Hubungi CS atau Salesmen dan beri Informasi yang diperlukan supaya dapat dicari asal usul masalah aplikasi:',
          list: [
            'Sampaikan versi pada Android anda (Android versi 8.1, android versi 9, dll)',
            'Sampaikan merk dagang Android Anda (Xiaomi A2 lite etc)',
            'Sampaikan kendala anda secara detail',
            'Tunggu jawaban dari CS / salesman',
          ],
        },
        {
          question:
            'Mengapa aplikasi saya mengeluarkan saya saat saya mencari barang?',
          answer:
            'Check signal provider anda dan update ulang dari Google Play Store.',
        },
        {
          question: 'Mengapa aplikasi selalu minta di-update?',
          answer:
            'Untuk memberi pelayanan yg terbaik, kami selalu memperbarui aplikasi dengan bertahap.',
        },
      ],
    },
  ]);
  /** === HOOK === */
  /** === VIEW === */
  /** === HEADER === */
  const header = () => {
    return <SnbTopNav.Type3 type="red" title="" backAction={goBack} />;
  };
  /** === RENDER HEADER CONTENT === */
  const renderContentHeader = () => {
    return (
      <View style={{ paddingHorizontal: 30 }}>
        <SnbText.H2 align="center" color={color.white}>
          Bagaimana kami dapat membantu Anda ?
        </SnbText.H2>
        <View style={{ paddingVertical: 30 }}>
          <SnbTextField.Text
            placeholder={'Cari pertanyaan Anda disini'}
            type={'default'}
            value={''}
            prefixIconName="search"
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
      </View>
    );
  };
  /** === RENDER BACKGROUD IMAGE === */
  const renderBackgroundImage = () => {
    return (
      <Image
        source={require('../../../assets/images/faq/faq-background.png')}
        style={HelpFaqStyle.imageBackground}
      />
    );
  };
  /** === RENDER MENU CONTENT ITEM === */
  const renderItem = ({ item, index }: any) => {
    let bgColor = '#f5a623';
    if (index % 2 === 0) {
      bgColor = '#f5a623';
    } else {
      bgColor = '#6fcf97';
    }

    return (
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: 5,
          marginBottom: 2,
        }}
        key={index}>
        <View style={[HelpFaqStyle.boxContentItem, styles.shadowForBox10]}>
          <View
            style={[HelpFaqStyle.headerContent, { backgroundColor: bgColor }]}>
            <SnbText.B1>{item.title}</SnbText.B1>
          </View>
          {item.content.map((obj: any, i: number) => {
            return (
              <View style={{ padding: 20 }} key={i}>
                <SnbText.H4>{obj.question}</SnbText.H4>
                <SnbText.B3>{obj.answer}</SnbText.B3>
                {obj.list !== undefined
                  ? obj.list.map((itemList: any, indexList: number) => {
                      return (
                        <View key={indexList}>
                          <SnbText.B3>- {itemList}</SnbText.B3>
                        </View>
                      );
                    })
                  : null}
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  /** === RENDER MENU CONTENT === */
  const renderContentItem = () => {
    return (
      <View style={{ flex: 1 }}>
        <SnbCarousel
          carouselRef={null}
          data={carouselItems}
          sliderWidth={width}
          itemWidth={0.82 * width}
          renderItem={renderItem}
          setCurrentActive={(index) => setActiveIndex(index)}
          loop={false}
        />
      </View>
    );
  };
  /** === RENDER TAG CONTENT === */
  const renderContentTag = () => {
    return (
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {tag.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={HelpFaqStyle.tag}
              onPress={() => console.log('PRESSED TAG')}>
              <SnbText.B3>{item}</SnbText.B3>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  /** === RENDER CONTENT === */
  const renderContent = () => {
    return (
      <ScrollView>
        {renderBackgroundImage()}
        {renderContentHeader()}
        {renderContentItem()}
        {renderContentTag()}
      </ScrollView>
    );
  };
  /** === MAIN === */
  return (
    <SnbContainer color="white">
      {header()}
      {renderContent()}
    </SnbContainer>
  );
};

export default HelpFaqView;
