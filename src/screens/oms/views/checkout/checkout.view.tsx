/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Html from '@core/components/Html';
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
  usePaymentAction,
  useSelectedPaymentType
} from '../../functions/checkout';
import LoadingPage from '@core/components/LoadingPage';
import { contexts } from '@contexts';
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
const dummyTermsAndConditions = {
  data: {
    storeId: 101,
    paymentTypes: [
      {
        paymentTypeId: 1,
        name: 'Bayar Sekarang',
        term: '<p>- Pembeli harus membayar dalam waktu 24 jam setelah pesanan dibuat.</p><p>- Pesanan tidak akan diproses apabila pembayaran belum dilakukan.</p><p>- Apabila pembayaran melewati batas waktu, maka pesanan akan dibatalkan.</p>',
      },
      {
        paymentTypeId: 1,
        name: 'Bayar Sekarang',
        term: '<p>- Pembeli harus membayar dalam waktu 24 jam setelah pesanan dibuat.</p><p>- Pesanan tidak akan diproses apabila pembayaran belum dilakukan.</p><p>- Apabila pembayaran melewati batas waktu, maka pesanan akan dibatalkan.</p>',
      },
    ],
    paymentChannels: [
      {
        paymentChannelId: 2,
        name: 'Bank BCA Virtual Account',
        term: '<p>- Pembeli diharapkan untuk melakukan transfer ke nomor rekening yang disediakan.</p>',
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
  const paymentAction = usePaymentAction();
  const paymentType = useSelectedPaymentType();
  const [loadingPage, setLoadingPage] = useState(true);
  const { statePayment, dispatchPayment } = React.useContext(
    contexts.PaymentContext,
  );

  console.log(statePayment, 'status payment')
console.log(paymentType.selectedPaymentType, 'SELECTED PAYMENT');

  /** Set Loading Page */
  useEffect(() => {
    setTimeout(() => setLoadingPage(false), 1000);
  }, []);

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
    const invoiceGroupId = 'abcdef12345';
    const totalCartParcel = 100000;
    const page = 1;
    return (
      <View style={{ marginTop: 16 }}>
        <SnbText.H4>Tipe Pembayaran</SnbText.H4>
        <SnbDivider style={{ marginVertical: 8 }} />
        {renderPaymentPromoBadge()}
        <TouchableOpacity
          onPress={() => {
            paymentAction.typeslist(
              dispatchPayment,
              invoiceGroupId,
              totalCartParcel,
              page,
            );
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
            <Html value={item.term} fontSize={12} />
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
            <Html value={item.term} fontSize={12} />
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
        actionIcon={'close'}
      />
    );
  };
  /** => payment types modal */
  const renderPaymentTypesModal = () => {
    const invoiceGroupId = 'abcdef12345';
    const totalCartParcel = 100000;
    const paymentTypeId = 1;
    const content = () => {
      return !statePayment?.paymentTypesList?.loading ?(
        <View>
          {statePayment?.paymentTypesList?.data.map((item : any, index : number) => {
            const dataPaymentType = {
              id : item.id,
              name : item.name,
              iconUrl: item.iconUrl
            }
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
                  paymentAction.channelsList(dispatchPayment, invoiceGroupId, totalCartParcel, paymentTypeId)
                  paymentTypesModal.setOpen(false);
                  paymentChannelsModal.setOpen(true);
                  paymentType.setSelectedPaymentType(dataPaymentType)
                }}
              />
            );
          })}
        </View>
      ) : <View style={{ height: '30%', marginTop: 100 }}><LoadingPage/></View>;
    };
    return (
      <SnbBottomSheet
        open={paymentTypesModal.isOpen}
        content={content()}
        title={'Tipe Pembayaran'}
        closeAction={() => {
          paymentTypesModal.setOpen(false);
        }}
        actionIcon={'close'}
      />
    );
  };
  /** => payment channels modal */
  const renderPaymentChannelsModal = () => {
    const contentChannelTypes = (paymentTypes: any) => {
      return (
        <>
          {paymentTypes.map((item: any, index: number) => {
            const description =
              item.status === 'enabled'
                ? `Total Biaya ${toCurrency(item.totalPayment)}`
                : item.message;
            const selectedPaymentChannels = [
              {
                id: item.id,
                name: item.name,
                iconUrl: item.iconUrl,
              },
            ];
            return (
              <SnbListButtonType1
                key={index}
                title={item.name}
                description={description}
                image={item.image}
                type={'two'}
                disabled={item.status !== 'disabled' ? true : false}
                onPress={() => {
                  paymentChannelsModal.setOpen(false);
                  // setSelectedPaymentChannels(selectedPaymentChannels);
                }}
              />
            );
          })}
        </>
      );
    };
    const contentChannelGroups = (paymentGroups: any) => {
      return (
        <View>
          {paymentGroups.map((item: any, index: number) => {
            return (
              <View key={index} style={{ marginBottom: 16 }}>
                <View style={{ marginTop: 16 }}>
                  <SnbText.H4>{item.name}</SnbText.H4>
                </View>
                {contentChannelTypes(item.type)}
              </View>
            );
          })}
        </View>
      );
    };
    const content = () => {
      const selectedPaymentType = paymentType.selectedPaymentType;
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: color.white,
            paddingHorizontal: 16,
          }}>
          <View>
            <SnbText.H4>Tipe Pembayaran</SnbText.H4>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 12,
              }}>
              <Image
                source={{
                  uri: selectedPaymentType?.iconUrl,
                }}
                style={CheckoutStyle.mediumIcon}
              />
              <SnbText.B1>{selectedPaymentType?.name}</SnbText.B1>
            </View>
          </View>
          <View style={{ paddingTop: 16 }}>
            <SnbText.H4>Pilih Metode Pembayaran</SnbText.H4>
          </View>
          {!statePayment?.paymentChannelsList.loading ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {contentChannelGroups(statePayment.paymentChannelsList.data)}
            </ScrollView>
          ) : (
            <LoadingPage />
          )}
        </View>
      );
    };
    return statePayment?.paymentChannelsList ? (
      <SnbBottomSheet
        open={paymentChannelsModal.isOpen}
        content={content()}
        title={'Metode Pembayaran'}
        closeAction={() => {paymentTypesModal.setOpen(true); paymentChannelsModal.setOpen(false)}}
        actionIcon={'back'}
        size={'halfscreen'}
      />
    ) : null;
  };

  /**
   * Render Body
   * @returns { Component } - Return Body
   */
  const renderBody = () => {
    return loadingPage ? (
      <LoadingPage />
    ) : (
      <>
        {renderContent()}
        {renderModals()}
      </>
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
      {renderBody()}
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
