/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
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
import { goBack } from '../../functions';
import {
  usePaymentDetailAccorrdion,
  usePaymentTypeModal,
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
const dummyPaymentChannel = {};
/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** === HOOK === */
  const paymentAccordion = usePaymentDetailAccorrdion();
  const paymentTypesModal = usePaymentTypeModal();
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
      <View style={{ padding: 16, backgroundColor: color.white }}>
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
        style={{
          flexDirection: 'row',
          padding: 12,
          backgroundColor: color.yellow10,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 4,
        }}>
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
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
          }}>
          <Image
            source={{
              uri: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/cod.png',
            }}
            style={{ width: 20, height: 20, marginRight: 10 }}
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
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 8,
                  }}>
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
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
          }}>
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
          <TouchableOpacity>
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
          onPress={() => console.log('buat pesanan...')}
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
  /** => modals */
  const renderModals = () => {
    return <>{renderPaymentTypesModal()}</>;
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
