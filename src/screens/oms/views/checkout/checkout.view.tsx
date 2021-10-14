/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbDivider,
  color,
  SnbSKUList,
  SnbIcon,
  SnbButton,
  SnbBottomSheet,
  SnbListButtonType1,
} from 'react-native-sinbad-ui';
import {
  goBack,
  goToPaymentPromoList,
  goToCheckoutSuccess,
} from '../../functions';
import {
  usePaymentDetailAccorrdion,
  usePaymentTypeModal,
  usePaymentChannelModal,
  useParcelDetailModal,
  useTermsAndConditionsModal,
} from '../../functions/checkout';
/** === DUMMIES === */
const dummySKU = [
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/24982598-9f5e-42cd-8be1-5fb58cce2d82.png',
  },
  {
    imgUrl:
      'https://cdn.zeplin.io/5d10749da41ede711b156f2e/assets/49c90592-a684-4bff-9b94-08f65d9e1a24.png',
  },
];
const dummyPaymentDetail = [
  {
    name: 'Total Barang (2)',
    value: 330596,
    type: 'normal',
  },
  {
    name: 'Total Potongan Harga',
    value: 626,
    type: 'price_cut',
  },
  {
    name: 'PPN 10%',
    value: 32997,
    type: 'normal',
  },
  {
    name: 'Layanan Pembayaran',
    value: 4400,
    type: 'normal',
  },
];
const dummyPaymentTypes = {
  data: {
    supplierId: 1,
    paymentTypes: [
      {
        id: 1,
        name: 'Bayar Sekarang',
        iconUrl:
          'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/pay_now.png',
        description:
          'Parcel akan diproses setelah pembayaran diselesaikan dalam tenggat waktu tertentu',
        terms:
          '<ul><li class=p1>Pembeli harus membayar dalam waktu 24 jam setelah pesanan dibuat.</li><li class=p1>Pesanan tidak akan diproses apabila pembayaran belum dilakukan.</li><li class=p1>Apabila pembayaran melewati batas waktu, maka pesanan akan dibatalkan.</li></ul>',
        availableStatus: true,
        promoPaymentAvailable: true,
      },
      {
        id: 2,
        name: 'Bayar Nanti',
        iconUrl:
          'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/pay_later.png',
        description:
          'Parcel langsung diproses dan tagihan akan ditagihkan ketika parcel diterima oleh pembeli',
        terms:
          '<ul><li class=p1>Pembayaran jatuh tempo mulai dihitung setelah status pesanan berubah untuk dikirimkan</li><li class=p1>Toko harus membayar pada tanggal jatuh tempo pengiriman</li><li class=p1>Jika toko tidak membayar pada tanggal jatuh tempo, toko bertanggung jawab untuk membayar hutang</li></ul>',
        availableStatus: true,
        promoPaymentAvailable: false,
      },
      {
        id: 3,
        name: 'Bayar Di Tempat',
        iconUrl:
          'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/cod.png',
        description:
          'Parcel akan diproses dan pembayaran akan ditagihkan sesuai dengan Term of Payment',
        terms:
          '<ul><li class=p1>Pembeli harap melunasi tagihan saat pesanan diterima.</li><li class=p1>Pembeli harus melunasi tagihan secara penuh (100%). Jika pembayaran tidak sesuai dengan syarat yang ditentukan maka pesanan akan dibatalkan.</li></ul>',
        availableStatus: true,
        promoPaymentAvailable: false,
      },
    ],
  },
};
const dummyPaymentChannel = {
  data: {
    paymentTypeId: 1,
    paymentChannels: [
      {
        id: 1,
        name: 'Tunai',
        type: [
          {
            id: 1,
            name: 'Tunai',
            image:
              'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/intersection.png',
            totalFee: 0,
            totalPayment: 0,
            status: 'disabled',
            message: 'Tidak tersedia untuk transaksi ini',
            paymentPromo: null,
          },
        ],
      },
      {
        id: 2,
        name: 'Virtual Account',
        type: [
          {
            id: 2,
            name: 'Bank BCA Virtual Account',
            image:
              'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/bca.png',
            totalFee: 4400,
            totalPayment: 104400,
            status: 'enabled',
            message: 'Minimum Pesanan Rp. 10.000',
            paymentPromo: {
              orderParcelId: 6665,
              paymentChannelId: 2,
              promoPaymentId: 0,
              promoPaymentAvailable: false,
              promoPaymentDescription: '',
              promoPaymentAmount: 0,
            },
          },
          {
            id: 3,
            name: 'Bank BNI Virtual Account',
            image:
              'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/bni.png',
            totalFee: 4400,
            totalPayment: 0,
            status: 'disabled',
            message: 'Minimum Pesanan Rp. 10.000',
            paymentPromo: {
              orderParcelId: 6665,
              paymentChannelId: 3,
              promoPaymentId: 0,
              promoPaymentAvailable: false,
              promoPaymentDescription: '',
              promoPaymentAmount: 0,
            },
          },
          {
            id: 4,
            name: 'Bank BRI Virtual Account',
            image:
              'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/bri.png',
            totalFee: 3850,
            totalPayment: 0,
            status: 'disabled',
            message: 'Minimum Pesanan Rp. 10.000',
            paymentPromo: {
              orderParcelId: 6665,
              paymentChannelId: 4,
              promoPaymentId: 0,
              promoPaymentAvailable: false,
              promoPaymentDescription: '',
              promoPaymentAmount: 0,
            },
          },
          {
            id: 5,
            name: 'Bank Mandiri Virtual Account',
            image:
              'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/mandiri.png',
            totalFee: 4400,
            totalPayment: 0,
            status: 'disabled',
            message: 'Minimum Pesanan Rp. 10.000',
            paymentPromo: {
              orderParcelId: 6665,
              paymentChannelId: 5,
              promoPaymentId: 0,
              promoPaymentAvailable: false,
              promoPaymentDescription: '',
              promoPaymentAmount: 0,
            },
          },
        ],
      },
      {
        id: 3,
        name: 'Outlet',
        type: [
          {
            id: 6,
            name: 'Alfamart',
            image:
              'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/alfamart.png',
            totalFee: 5000,
            totalPayment: 0,
            status: 'disabled',
            message: 'Minimum Pesanan Rp. 25.000',
            paymentPromo: {
              orderParcelId: 6665,
              paymentChannelId: 6,
              promoPaymentId: 0,
              promoPaymentAvailable: false,
              promoPaymentDescription: '',
              promoPaymentAmount: 0,
            },
          },
        ],
      },
    ],
  },
};
const dummyTermsAndConditions = {
  data: {
    storeId: 101,
    paymentTypes: [
      {
        paymentTypeId: 1,
        name: 'Bayar Sekarang',
        term: '<ul><li class=p1>Pembeli harus membayar dalam waktu 24 jam setelah pesanan dibuat.</li><li class=p1>Pesanan tidak akan diproses apabila pembayaran belum dilakukan.</li><li class=p1>Apabila pembayaran melewati batas waktu, maka pesanan akan dibatalkan.</li></ul>',
      },
      {
        paymentTypeId: 1,
        name: 'Bayar Sekarang',
        term: '<ul><li class=p1>Pembeli harus membayar dalam waktu 24 jam setelah pesanan dibuat.</li><li class=p1>Pesanan tidak akan diproses apabila pembayaran belum dilakukan.</li><li class=p1>Apabila pembayaran melewati batas waktu, maka pesanan akan dibatalkan.</li></ul>',
      },
    ],
    paymentChannels: [
      {
        paymentChannelId: 2,
        name: 'Bank BCA Virtual Account',
        term: '<ul><li class=p1>Pembeli diharapkan untuk melakukan transfer ke nomor rekening yang disediakan.</li></ul>',
      },
    ],
  },
};
/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** === HOOK === */
  const paymentAccordion = usePaymentDetailAccorrdion();
  const paymentTypesModal = usePaymentTypeModal();
  const paymentChannelsModal = usePaymentChannelModal();
  const parcelDetailModal = useParcelDetailModal();
  const termsAndConditionModal = useTermsAndConditionsModal();
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Checkout'}
        backAction={() => goBack()}
      />
    );
  };
  /** => address */
  const renderAddress = () => {
    return (
      <View style={CheckoutStyle.addessSection}>
        <SnbText.B2>Alamat Pengiriman</SnbText.B2>
        <SnbDivider style={{ marginVertical: 8 }} />
        <SnbText.B2>Alamat 1 (Default)</SnbText.B2>
        <SnbText.B1>
          Jl. M.H. Thamrin No.1, Kb. Melati, Kec. Menteng, Kota Jakarta Pusat,
          Daerah Khusus Ibukota Jakarta 10310
        </SnbText.B1>
      </View>
    );
  };
  /** => sku list */
  const renderSKUList = () => {
    return (
      <SnbSKUList
        data={dummySKU}
        renderItem={({ item }: any) => {
          return (
            <Image
              source={{ uri: item.imgUrl }}
              style={CheckoutStyle.skuImage}
            />
          );
        }}
        expandable
      />
    );
  };
  /** => shipment detail */
  const renderShipmentDetail = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <SnbText.H4>Rincian Pengiriman</SnbText.H4>
        <SnbDivider style={{ marginVertical: 8 }} />
        <View style={CheckoutStyle.shipmentDetail}>
          <View>
            <SnbText.B1>(± 3 Hari)</SnbText.B1>
            <SnbText.B3>Self Delivery</SnbText.B3>
          </View>
          <SnbText.B3 color={color.green50}>FREE ONGKIR</SnbText.B3>
        </View>
      </View>
    );
  };
  /** => payment promo badge */
  const renderPaymentPromoBadge = () => {
    return (
      <TouchableOpacity
        onPress={() => goToPaymentPromoList()}
        style={CheckoutStyle.paymentPromoBadgeContainer}>
        <SnbIcon name={'info'} color={color.yellow50} size={24} />
        <View style={{ flexDirection: 'row' }}>
          <SnbText.B1 color={color.yellow50}>Pakai </SnbText.B1>
          <SnbText.B2 color={color.yellow50}>Bayar Sekarang, </SnbText.B2>
          <SnbText.B1 color={color.yellow50}>dapat promo!</SnbText.B1>
        </View>
        <SnbIcon name={'chevron_right'} color={color.yellow50} size={16} />
      </TouchableOpacity>
    );
  };
  /** => payment type section */
  const renderPaymentTypeSection = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <SnbText.H4>Tipe Pembayaran</SnbText.H4>
        <SnbDivider style={{ marginVertical: 8 }} />
        {renderPaymentPromoBadge()}
        <TouchableOpacity
          onPress={() => {
            paymentTypesModal.setOpen(true);
          }}
          style={CheckoutStyle.selectPaymentButton}>
          <Image
            source={{
              uri: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/cod.png',
            }}
            style={CheckoutStyle.smallIcon}
          />
          <View style={{ flex: 1 }}>
            <SnbText.B1 color={color.black80}>
              Bayar Di Tempat - Tunai
            </SnbText.B1>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <SnbIcon name={'chevron_right'} color={color.black80} size={24} />
          </View>
        </TouchableOpacity>
        <SnbDivider />
      </View>
    );
  };
  /** => payment detail section */
  const renderPaymentDetailSection = () => {
    const isActive = paymentAccordion.active === 1;
    return (
      <View>
        {isActive ? (
          <View style={{ marginLeft: 32 }}>
            {dummyPaymentDetail.map((item, index) => {
              return (
                <View key={index} style={CheckoutStyle.detailItemContainer}>
                  <SnbText.B3
                    color={
                      item.type === 'normal' ? color.black100 : color.green50
                    }>
                    {item.name}
                  </SnbText.B3>
                  <SnbText.B3
                    color={
                      item.type === 'normal' ? color.black100 : color.green50
                    }>
                    {toCurrency(item.value)}
                  </SnbText.B3>
                </View>
              );
            })}
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={() => paymentAccordion.changeActive(1)}
          style={CheckoutStyle.detailExpandButton}>
          <View style={{ flexDirection: 'row' }}>
            <SnbIcon
              name={isActive ? 'expand_less' : 'expand_more'}
              size={24}
              color={color.black100}
            />
            <View style={{ marginLeft: 8 }}>
              <SnbText.H4>Sub Total</SnbText.H4>
            </View>
          </View>
          <SnbText.H4>Rp367.367,00</SnbText.H4>
        </TouchableOpacity>
      </View>
    );
  };
  /** => invoice group list */
  const renderInvoiceGroupList = () => {
    return (
      <View style={CheckoutStyle.invoiceGroupListContainer}>
        <View style={CheckoutStyle.headerSection}>
          <SnbText.H4>Danone</SnbText.H4>
          <TouchableOpacity
            onPress={() => parcelDetailModal.setModalOpen(true)}>
            <SnbText.B2 color={color.red50}>Lihat Lebih</SnbText.B2>
          </TouchableOpacity>
        </View>
        {renderSKUList()}
        {renderShipmentDetail()}
        {renderPaymentTypeSection()}
        {renderPaymentDetailSection()}
      </View>
    );
  };
  /** => bottom */
  const renderBottom = () => {
    const content = () => {
      return (
        <View style={CheckoutStyle.bottomContentContainer}>
          <SnbText.H4 color={color.black40}>Total: </SnbText.H4>
          <SnbText.H4 color={color.red50}>{toCurrency(990000)}</SnbText.H4>
        </View>
      );
    };
    return (
      <View style={{ height: 75 }}>
        <SnbButton.Content
          type={'primary'}
          onPress={() => termsAndConditionModal.setOpen(true)}
          content={content()}
          title={'Buat Pesanan'}
        />
      </View>
    );
  };
  /** => content */
  const renderContent = () => {
    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderAddress()}
          {renderInvoiceGroupList()}
        </ScrollView>
        {renderBottom()}
      </>
    );
  };
  /** => terms and conditions modal */
  const renderTermsAndConditionModal = () => {
    const paymentTypesTermsConditions = () => {
      return dummyTermsAndConditions.data.paymentTypes.map((item, index) => {
        return (
          <View key={index} style={{ marginBottom: 12 }}>
            <View style={{ marginBottom: 8 }}>
              <SnbText.H4>{item.name}</SnbText.H4>
            </View>
            <HTMLView value={item.term} />
          </View>
        );
      });
    };
    const paymentChannelTermsConditions = () => {
      return dummyTermsAndConditions.data.paymentChannels.map((item, index) => {
        return (
          <View key={index} style={{ marginBottom: 12 }}>
            <View style={{ marginBottom: 8 }}>
              <SnbText.H4>{item.name}</SnbText.H4>
            </View>
            <HTMLView value={item.term} />
          </View>
        );
      });
    };
    const button = () => {
      return (
        <View>
          <SnbButton.Single
            title={'Buat Pesanan'}
            disabled={false}
            type={'primary'}
            onPress={() => {
              termsAndConditionModal.setOpen(false);
              goToCheckoutSuccess();
            }}
          />
        </View>
      );
    };
    const content = () => {
      return (
        <ScrollView style={{ paddingHorizontal: 16 }}>
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <SnbText.C1>
              Dengan ini saya menyetujui Syarat & Ketentuan yang berlaku:
            </SnbText.C1>
          </View>
          {paymentTypesTermsConditions()}
          <SnbDivider style={{ marginBottom: 12 }} />
          {paymentChannelTermsConditions()}
          {button()}
        </ScrollView>
      );
    };
    return (
      <SnbBottomSheet
        open={termsAndConditionModal.isOpen}
        content={content()}
        title={'Syarat & Ketentuan'}
        closeAction={() => termsAndConditionModal.setOpen(false)}
        action={true}
        actionIcon={'close'}
      />
    );
  };
  /** => parcel detail modal */
  const renderParcelDetailModal = () => {
    const productDetail = () => {
      return (
        <View style={{ paddingBottom: 16 }}>
          <SnbText.H4>Produk</SnbText.H4>
          <SnbDivider style={{ marginVertical: 8 }} />
          <View style={CheckoutStyle.modalDetailItemContainer}>
            <View style={{ width: '50%' }}>
              <SnbText.B1>SGM ANANDA 11000 GR GA</SnbText.B1>
            </View>
            <SnbText.B1>{toCurrency(330000)}</SnbText.B1>
          </View>
          <View style={CheckoutStyle.modalDetailTotalContainer}>
            <View style={{ width: '50%' }}>
              <SnbText.H4 color={color.black80}>Total Order</SnbText.H4>
            </View>
            <SnbText.B2 color={color.black80}>{toCurrency(330000)}</SnbText.B2>
          </View>
        </View>
      );
    };
    const discountDetail = () => {
      return (
        <View style={{ paddingBottom: 16 }}>
          <SnbText.H4>Potongan Harga</SnbText.H4>
          <SnbDivider style={{ marginVertical: 8 }} />
          <View style={CheckoutStyle.modalDetailItemContainer}>
            <View style={{ width: '50%' }}>
              <SnbText.B1 color={color.green50}>
                Voucher 'Berkah Ramadhan'
              </SnbText.B1>
            </View>
            <SnbText.B1 color={color.green50}>{toCurrency(626)}</SnbText.B1>
          </View>
          <View style={CheckoutStyle.modalDetailTotalContainer}>
            <View style={{ width: '50%' }}>
              <SnbText.H4 color={color.black80}>Total Potongan</SnbText.H4>
            </View>
            <SnbText.B2 color={color.black80}>{toCurrency(626)}</SnbText.B2>
          </View>
        </View>
      );
    };
    const total = () => {
      return (
        <View>
          {parcelDetailModal.isDetailOpen ? (
            <View style={{ marginLeft: 32 }}>
              {dummyPaymentDetail.map((item, index) => {
                return (
                  <View key={index} style={CheckoutStyle.detailItemContainer}>
                    <SnbText.B3
                      color={
                        item.type === 'normal' ? color.black100 : color.green50
                      }>
                      {item.name}
                    </SnbText.B3>
                    <SnbText.B3
                      color={
                        item.type === 'normal' ? color.black100 : color.green50
                      }>
                      {toCurrency(item.value)}
                    </SnbText.B3>
                  </View>
                );
              })}
            </View>
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={() => {
              parcelDetailModal.toggleDetail();
            }}
            style={CheckoutStyle.detailExpandButton}>
            <View style={{ flexDirection: 'row' }}>
              <SnbIcon
                name={
                  parcelDetailModal.isDetailOpen ? 'expand_less' : 'expand_more'
                }
                size={24}
                color={color.black100}
              />
              <View style={{ marginLeft: 8 }}>
                <SnbText.H4>Total</SnbText.H4>
              </View>
            </View>
            <SnbText.H4>Rp367.367,00</SnbText.H4>
          </TouchableOpacity>
        </View>
      );
    };
    const content = () => {
      return (
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ paddingVertical: 16 }}>
            {productDetail()}
            {discountDetail()}
            {total()}
          </View>
        </View>
      );
    };
    return (
      <SnbBottomSheet
        open={parcelDetailModal.isModalOpen}
        content={content()}
        title={'Detail Pesanan'}
        closeAction={() => parcelDetailModal.setModalOpen(false)}
        action={true}
        actionIcon={'close'}
      />
    );
  };
  /** => payment types modal */
  const renderPaymentTypesModal = () => {
    const content = () => {
      return (
        <View>
          {dummyPaymentTypes.data.paymentTypes.map((item, index) => {
            return (
              <SnbListButtonType1
                key={index}
                image={item.iconUrl}
                title={item.name}
                description={item.description}
                type={'one'}
                badge={item.promoPaymentAvailable ? true : false}
                textBadge={item.promoPaymentAvailable ? 'Promo' : undefined}
                onPress={() => {
                  paymentTypesModal.setOpen(false);
                  paymentChannelsModal.setOpen(true);
                }}
              />
            );
          })}
        </View>
      );
    };
    return (
      <SnbBottomSheet
        open={paymentTypesModal.isOpen}
        content={content()}
        title={'Tipe Pembayaran'}
        closeAction={() => paymentTypesModal.setOpen(false)}
        action={true}
        actionIcon={'close'}
      />
    );
  };
  /** => payment channels modal */
  const renderPaymentChannelsModal = () => {
    const contentChannelTypes = (paymentTypes) => {
      return (
        <>
          {paymentTypes.map((item, index) => {
            const description =
              item.status === 'enabled'
                ? `Total Biaya ${toCurrency(item.totalPayment)}`
                : item.message;
            return (
              <SnbListButtonType1
                key={index}
                title={item.name}
                description={description}
                image={item.image}
                type={'two'}
                disabled={item.status === 'disabled' ? true : false}
              />
            );
          })}
        </>
      );
    };
    const contentChannelGroups = (paymentGroups) => {
      return (
        <View>
          {paymentGroups.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                  <SnbText.H4>{item.name}</SnbText.H4>
                </View>
                {contentChannelTypes(item.type)}
              </React.Fragment>
            );
          })}
        </View>
      );
    };
    const content = () => {
      return (
        <ScrollView>
          <View
            style={{
              backgroundColor: color.white,
              paddingHorizontal: 16,
              marginBottom: 8,
            }}>
            <SnbText.H4>Tipe Pembayaran</SnbText.H4>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 12,
              }}>
              <Image
                source={{
                  uri: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/cod.png',
                }}
                style={CheckoutStyle.mediumIcon}
              />
              <SnbText.B1>Bayar Sekarang</SnbText.B1>
            </View>
          </View>
          <View
            style={{
              backgroundColor: color.white,
            }}>
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
              <SnbText.H4>Pilih Metode Pembayaran</SnbText.H4>
            </View>
            {contentChannelGroups(dummyPaymentChannel.data.paymentChannels)}
          </View>
        </ScrollView>
      );
    };
    return (
      <SnbBottomSheet
        open={paymentChannelsModal.isOpen}
        content={content()}
        title={'Metode Pembayaran'}
        closeAction={() => paymentChannelsModal.setOpen(false)}
        action={true}
        actionIcon={'close'}
        fullsize={true}
      />
    );
  };
  /** => modals */
  const renderModals = () => {
    return (
      <>
        {renderPaymentTypesModal()}
        {renderPaymentChannelsModal()}
        {renderParcelDetailModal()}
        {renderTermsAndConditionModal()}
      </>
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {renderContent()}
      {renderModals()}
    </SnbContainer>
  );
};

export default OmsCheckoutView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (voyager)
 * createDate: 10092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
