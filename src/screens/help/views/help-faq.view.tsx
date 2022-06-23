import React, { FC, useState, useRef, useEffect } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbTextField,
  color,
  SnbCarousel,
} from 'react-native-sinbad-ui';
import { goBack } from '../functions';
/** === IMPORT STYLE HERE === */
import HelpFaqStyle from '../styles/help-faq.style';

const { width } = Dimensions.get('window');
interface Iref {
  _snapToItem: any;
}

const HelpFaqView: FC = () => {
  /** === HOOK === */
  const [textSearch, setTextSearch] = useState('');
  const carouselRef = useRef<Iref>(null);
  const [, setActiveIndex] = useState(0);
  const [tag] = useState([
    'Voucher',
    'Pembayaran',
    'Order',
    'Pengajuan Retur',
    'Akun',
  ]);
  const carouselItems = [
    {
      title: 'Pertanyaan Umum',
      content: [
        {
          question: 'Bagaimana cara saya mendaftarkan akun Toko di Sinbad',
          answer:
            'Pilih menu "Register" di halaman awal atau halaman profil aplikasi, lalu ikuti langkah-langkah pendaftaran. Mohon cantumkan nomor handphone yang bisa menerima SMS.',
        },
        {
          question: 'Bagaimana caranya pesan barang?',
          answer: '',
          list: [
            'Cari produk yang Anda inginkan lalu ketuk tombol Pesan',
            'Pilih kuantitas barang dan ketuk tombol Tambah ke Keranjang',
            'Di kiri atas Anda terdapat lambang keranjang untuk melihat daftar pesanan Anda',
            'Jika pesanan Anda sudah sesuai, ketuk tombol Checkout Sekarang lalu Pilih Pembayaran',
          ],
        },
        {
          question: 'Bagaimana cara masuk ke aplikasi Sinbad?',
          answer:
            'Pada halaman Masuk, silakan masukan nomor handphone yang terdaftar dan nantinya akan menerima SMS kode OTP untuk masuk ke akun Sinbad Anda.',
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
            'Pesanan dibatalkan dapat dikarenakan produk yang Anda pesan tidak tersedia atau stok produk kosong. Jangan khawatir jika pesanan dibatalkan maka dana akan dikembalikan ke rekening Anda.',
        },
        {
          question: 'Apakah saya akan dikenakan ongkos pengiriman?',
          answer:
            'Saat ini di Sinbad tidak ada biaya pengiriman atau free delivery.',
        },
        {
          question: 'Berapa lama waktu pengiriman pesanan?',
          answer:
            'Masing-masing Supplier memiliki estimasi pengiriman yang berbeda. Untuk estimasi pengiriman dapat dilihat pada menu Pesanan di aplikasi Sinbad Anda.',
        },
        {
          question:
            'Mengapa pesanan saya belum tiba dan sudah melebihi estimasi pengiriman?',
          answer:
            'Tidak perlu khawatir kemungkinan pesanan Anda masih dalam proses pengiriman dan sudah dimuat pada jadwal pengiriman. Silakan hubungi Customer Service kami agar dibantu pengecekan lebih lanjut.',
        },
      ],
    },
    {
      title: 'Seputar Akun',
      content: [
        {
          question:
            'Kesulitan untuk menggunakan aplikasi Sinbad, kemana saya harus mencari bantuan?',
          answer:
            'Anda dapat menghubungi Whatsapp Customer Service Sinbad 0822-6010-6010 atau email help@sinbad.co.id',
        },
        {
          question: 'Apakah saya harus upgrade account Sinbad?',
          answer:
            'Iya, karena Anda akan mendapatkan keuntungan lebih dalam berbelanja melalui akun VIP.',
        },
        {
          question: 'Dimana saya harus melengkapi Profil?',
          answer:
            'Silakan ketuk menu Profil pada pojok kanan bawah dan pastikan Data Diri serta Informasi Toko sudah selesai dilengkapi.',
        },
        {
          question:
            'Saya tidak bisa masuk ke aplikasi Sinbad karena nomor handphone saya sudah tidak aktif.',
          answer: 'Hubungi Customer Service kami untuk dibantu lebih lanjut.',
        },
      ],
    },
    {
      title: 'Seputar Pembayaran dan Refund',
      content: [
        {
          question: 'Pembayaran apa saja yang tersedia di Sinbad?',
          answer:
            'Saat ini pembayaran di Sinbad hanya dapat melalui Transfer Virtual Account dari Bank: BCA, Mandiri, BRI, BNI',
        },
        {
          question: 'Bagaimana proses pengembalian dana?',
          answer:
            'Jika pesanan dibatalkan maka proses pengembalian dana akan dikembalikan ke rekening Anda. Pastikan Anda sudah mengisi data rekening dengan benar pada menu Profil agar mempermudah proses pengembalian dana.',
        },
        {
          question: 'Berapa lama proses pengembalian dana?',
          answer:
            'Proses pengembalian dana maksimal 14 hari kerja, namun tidak perlu khawatir hal tersebut hanya estimasi dan bisa lebih cepat.',
        },
      ],
    },
  ];
  const [renderedCarouselItems, setRenderedCarouselItems] =
    useState(carouselItems);
  /** === FUNCTIONAL === */
  const submitSearch = (text: string) => {
    setTextSearch(text);
    let keyFound = 0;
    let i = 0;
    let found = false;
    while (found === false && i < carouselItems.length) {
      let j = 0;

      while (found === false && j < carouselItems[i].content.length) {
        if (
          carouselItems[i].content[j].answer
            .toLowerCase()
            .indexOf(text.toLowerCase()) > -1
        ) {
          keyFound = i;
          found = true;
        }
        j++;
      }
      i++;
    }
    if (carouselRef.current) {
      carouselRef.current._snapToItem(keyFound);
    }
  };
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
            value={textSearch}
            prefixIconName="search"
            onChangeText={(text) => submitSearch(text)}
            clearText={() => setTextSearch('')}
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
    let bgColor = color.black60;
    if (index === 0) {
      bgColor = color.black60;
    } else {
      bgColor = color.yellow50;
    }

    return (
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: 5,
          marginBottom: 2,
        }}
        key={index}>
        <View style={[HelpFaqStyle.boxContentItem, HelpFaqStyle.shadowForBox]}>
          <View
            style={[HelpFaqStyle.headerContent, { backgroundColor: bgColor }]}>
            <SnbText.B1 color={color.white}>{item.title}</SnbText.B1>
          </View>
          {item.content.map((obj: any, i: number) => {
            return (
              <View style={{ padding: 20 }} key={i}>
                <SnbText.H4>{obj.question}</SnbText.H4>
                {obj.answer !== '' ? (
                  <SnbText.B3>{obj.answer}</SnbText.B3>
                ) : (
                  <View />
                )}
                {obj.list !== undefined
                  ? obj.list.map((itemList: any, indexList: number) => {
                      return (
                        <View key={indexList} style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              minWidth: 16,
                            }}>
                            <SnbText.B3>{indexList + 1}.</SnbText.B3>
                          </View>
                          <View>
                            <SnbText.B3>{itemList}</SnbText.B3>
                          </View>
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

  useEffect(() => {
    const search = textSearch.toLowerCase();
    const res = carouselItems
      .map((el) => {
        const { title, ...restData } = el;
        const content = restData.content.filter(
          (elContent) =>
            elContent.answer.toLowerCase().indexOf(search) > -1 ||
            elContent.question.toLowerCase().indexOf(search) > -1 ||
            title.toLowerCase().indexOf(search) > -1 ||
            (elContent?.list &&
              elContent?.list.filter(
                (elList) => elList.toLowerCase().indexOf(search) > -1,
              ).length),
        );
        return {
          title,
          content,
        };
      })
      .filter((el) => el.content.length);
    setRenderedCarouselItems(res);
  }, [textSearch]);

  /** === RENDER MENU CONTENT === */
  const renderContentItem = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderedCarouselItems.length ? (
          <SnbCarousel
            carouselRef={carouselRef}
            data={renderedCarouselItems}
            sliderWidth={width}
            itemWidth={0.82 * width}
            renderItem={renderItem}
            setCurrentActive={(index) => setActiveIndex(index)}
            loop={false}
          />
        ) : (
          <View
            style={{
              padding: 16,
              alignItems: 'center',
              marginTop: 50,
            }}>
            <View style={{ marginBottom: 4 }}>
              <SnbText.H4>Hasil pencarian anda tidak ada.</SnbText.H4>
            </View>
            <SnbText.B3 align={'center'}>Coba kata kunci lainnya</SnbText.B3>
          </View>
        )}
      </View>
    );
  };
  /** === RENDER TAG CONTENT === */
  // const renderContentTag = () => {
  //   return (
  //     <View
  //       style={{
  //         padding: 20,
  //         flexDirection: 'row',
  //         flexWrap: 'wrap',
  //         justifyContent: 'center',
  //       }}>
  //       {tag.map((item, index) => {
  //         return (
  //           <TouchableOpacity
  //             key={index}
  //             style={HelpFaqStyle.tag}
  //             onPress={() => {
  //               if (carouselRef.current) {
  //                 carouselRef.current._snapToItem(index + 1);
  //               }
  //             }}>
  //             <SnbText.B3>{item}</SnbText.B3>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // };
  /** === RENDER CONTENT === */
  const renderContent = () => {
    return (
      <ScrollView>
        {renderBackgroundImage()}
        {renderContentHeader()}
        {renderContentItem()}
        {/* {renderContentTag()} */}
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
