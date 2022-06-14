/** === IMPORT PACKAGES === */
import LoadingPage from '@core/components/LoadingPage';
import { toCurrency } from '@core/functions/global/currency-format';
import Clipboard from '@react-native-clipboard/clipboard';
import { ThankYouPageCard } from '@screen/oms/components/thank-you-page-card.component';
import { useModalThankYouPageOrderDetail } from '@screen/oms/functions/thank-you-page/thank-you-page.function';
import {
  useThankYouPageAction,
  useThankYouPageCancelOrderAction,
  useThankYouPagePaymentGuideListAction,
} from '@screen/oms/functions/thank-you-page/thank-you-page-hook.function';
import { ThankYouPageStyle } from '@screen/oms/styles/thank-you-page/thank-you-page.style';
import {
  color,
  colorV2,
  SnbButton,
  SnbButton2,
  SnbContainer,
  SnbText,
  SnbText2,
  SnbToast,
  SnbTopNav,
  styles,
  FooterButton
} from '@sinbad/react-native-sinbad-ui';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { ModalThankYouPageOrderDetail } from './thank-you-page-order-detail-modal.view';
import { useThankYouPageContext } from 'src/data/contexts/oms/thank-you-page/useThankYouPageContext';
import { PaymentGuideListItem } from '@model/oms';
import ThankYouPageCardItem from '@screen/oms/components/thank-you-page-card-item';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { goToHome } from '@core/functions/product';
import moment from 'moment';
import { CountDownTimer } from '@screen/oms/components/thank-you-page-count-down-timer.component';
import { NavigationAction } from '@core/functions/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import BottomSheetConfirmationV2, {
  // BottomSheetTransactionRef,
} from '@core/components/BottomSheetConfirmationV2';
import ThankYouPageCustomAccordion from '@screen/oms/components/thank-you-page-custom-accordion.component';

type ThankYouPageParamList = {
  Detail: { section: 'orderHistory' | 'payment'; orderId: string };
};

type ThankYouPageRouteProp = RouteProp<ThankYouPageParamList, 'Detail'>;

const OmsThankYouPageView: FC = () => {
  const virtualAccount = ['BCA', 'BNI', 'BRI', 'Mandiri']
  const { params } = useRoute<ThankYouPageRouteProp>();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  // const confirmModalRef = useRef<BottomSheetTransactionRef>(null);
  const modalThankYouPageOrderDetail = useModalThankYouPageOrderDetail();
  /** => Get Order Detail */
  const thankYouPageAction = useThankYouPageAction();
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const thankYouPagePaymentGuideListAction =
    useThankYouPagePaymentGuideListAction();
  const thankYouPageCancelOrderAction = useThankYouPageCancelOrderAction();
  const {
    stateThankYouPage: {
      detail: {
        data: thankYouPageData,
        loading: thankYouPageLoading,
        // error: thankYouPageError,
      },
      paymentGuide: {
        data: thankYouPagePaymentGuidelistData,
        loading: thankYouPagePaymentGuideListLoading,
      },
    },
    dispatchThankYouPage,
  } = useThankYouPageContext();
  // const thankYouPageDataDummy = {
  //       "expiredDate": "2022-06-06T19:19:15Z",
  //   }

  //hardware back handler
  useEffect(() => {
    const backAction = () => {
      goToHome();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  /** init thank you page */
  useEffect(() => {
    thankYouPageAction.thankYoupageOrderDetail(
      dispatchThankYouPage,
      params.orderId,
    );
  }, []);

  useEffect(() => {
    if (thankYouPageData != null) {
      setPaymentMethodId(thankYouPageData.paymentMethodId);
    }
  }, [thankYouPageData]);

  useEffect(() => {
    if (paymentMethodId != '') {
      thankYouPagePaymentGuideListAction.fetch(dispatchThankYouPage, {
        paymentMethodId,
      });
    }
  }, [paymentMethodId]);

  /** => function to copy VA Number */
  const onVACopied = () => {
    const accountVa = thankYouPageData?.vaAccountNo || '';
    Clipboard.setString(accountVa.toString());
    SnbToast.show('Copied To Clipboard', 2000);
  };
  /** => function to copy Order Amount */
  const onOrderAmountCopied = () => {
    const orderAmount = thankYouPageData?.totalOrderPriceAfterTax || 0;
    Clipboard.setString(orderAmount.toString());
    SnbToast.show('Copied To Clipboard', 2000);
  };
  const handleThankYouPageOrderDetail = () => {
    modalThankYouPageOrderDetail.setData(thankYouPageData);
    // modalThankYouPageOrderDetail.setOpen(true)
  };
  /** => render countdown */
  const renderCountDown = () => {
    if (thankYouPageData != null && thankYouPageData != undefined) {
      const expiredPaymentTime = thankYouPageData?.expiredDate;

      return moment.utc(new Date()).local() <
        moment.utc(expiredPaymentTime).local() &&
        expiredPaymentTime !== null ? (
        <View style={styles.shadowForBox10}>
          <View style={{ height: 5, backgroundColor: colorV2.bgColor.neutral }} />
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <SnbText2.Headline.Default align="center" color={colorV2.textColor.default}>
              Silahkan Lakukan Pembayaran dalam Waktu
            </SnbText2.Headline.Default>
            <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <CountDownTimer
                type={'big'}
                expiredTime={thankYouPageData!.expiredDate}
              />
            </View>
            <SnbText2.Paragraph.Small color={colorV2.textColor.secondary} align="center">
              {`Sebelum ${moment(expiredPaymentTime).format('LLLL')} WIB`}
            </SnbText2.Paragraph.Small>
          </View>
          <View style={{ height: 10, backgroundColor: colorV2.bgColor.neutral }} />
        </View>
      ) : (
        <View />
      );
    }
  };
  /** => Payment Total */
  const renderPaymentTotal = () => {
    if (thankYouPageData === null || thankYouPageData === undefined) {
      return null;
    }
    return (
      <View>

      
      <ThankYouPageCard
        title="Total Pembayaran"
        headerButton={true}
        headerButtonTitle="Lihat Detail"
        headerButtonAction={handleThankYouPageOrderDetail}>
        <View style={ThankYouPageStyle.defaultContentPadding}>
          <SnbText.H3 color={color.red50}>
            {toCurrency(
              Number(thankYouPageData?.totalOrderPriceAfterTax) ?? 0,
              {
                withFraction: false,
              },
            )}
          </SnbText.H3>
          <View style={ThankYouPageStyle.defaultContentPadding}>
            <TouchableOpacity onPress={() => onOrderAmountCopied()}>
              <SnbText.B1 color={color.blue50}>{'Salin Jumlah'}</SnbText.B1>
            </TouchableOpacity>
          </View>
        </View>
      </ThankYouPageCard>
      </View>
    );
  };
  /** => Payment Detail */
  const renderPaymentDetail = () => {
    if (thankYouPageData === null || thankYouPageData === undefined) {
      return null;
    }
    return (
      <ThankYouPageCard title="Detail Pembayaran">
        <View style={ThankYouPageStyle.defaultContentPadding}>
          <View style={styles.shadowForBox5}>
            <View style={ThankYouPageStyle.paymentDetail}>
              <Image
                source={{
                  uri: thankYouPageData?.paymentIconUrl,
                }}
                style={ThankYouPageStyle.mediumIcon}
              />
              <View style={{ width: '60%' }}>
                <SnbText.H2>{thankYouPageData?.vaAccountNo}</SnbText.H2>
                <TouchableOpacity onPress={() => onVACopied()}>
                  <SnbText.B1 color={color.blue50}>
                    {'Salin no. Virtual Account'}
                  </SnbText.B1>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ThankYouPageCard>
    );
  };

  /** => Payment Detail v2 */
  const renderPaymentDetailV2 = () => {
    if (thankYouPageData === null || thankYouPageData === undefined) {
      return null;
    }
    return (
    <ThankYouPageCard
        title="Detail Pembayaran"
        headerButton={true}
        headerButtonTitle="Lihat Detail"
        headerButtonAction={handleThankYouPageOrderDetail}>
      <View style={{
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 0
      }}>
        <Image
          source={{
            uri: thankYouPageData?.paymentIconUrl,
          }}
          style={ThankYouPageStyle.mediumIcon}
        />
        <View style={{ width: '60%' }}>
          <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>Metode Pembayaran</SnbText2.Paragraph.Small>
          <SnbText2.Body.Default color={colorV2.textColor.default}>
            {virtualAccount[Number(thankYouPageData?.paymentMethodId)-1]+' Virtual Account'}
          </SnbText2.Body.Default>
        </View>
      </View>
      <View style={{paddingHorizontal: 0}}>
        <SnbText2.Paragraph.Small color={colorV2.textColor.secondary} align={'left'}>
          {"Nomor Virtual Account"}
        </SnbText2.Paragraph.Small>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <SnbText2.Body.Default color={colorV2.textColor.default} align={'left'}>
            {thankYouPageData?.vaAccountNo}
          </SnbText2.Body.Default>
          <TouchableOpacity onPress={() => onVACopied()}>
            <SnbText2.Body.Small color={colorV2.textColor.link} align={'center'}>{'Salin'}</SnbText2.Body.Small>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingTop: 16, paddingHorizontal: 0}}>
        <SnbText2.Paragraph.Small color={colorV2.textColor.secondary} align={'left'}>
          {"Total"}
        </SnbText2.Paragraph.Small>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <SnbText2.Body.Default color={colorV2.textColor.error} align={'left'}>
            {toCurrency(
              Number(thankYouPageData?.totalOrderPriceAfterTax) ?? 0,
              {
                withFraction: false,
              },
            )}
          </SnbText2.Body.Default>
          <TouchableOpacity onPress={() => onOrderAmountCopied()}>
            <SnbText2.Body.Small color={colorV2.textColor.link} align={'center'}>{'Salin'}</SnbText2.Body.Small>
          </TouchableOpacity>
        </View>
      </View>  
    </ThankYouPageCard>
    )
  }
  const generatePaymentGuideListData = (data: PaymentGuideListItem[]) => {
    return data.map((item: PaymentGuideListItem) => {
      return {
        name: item.title,
        instruction: item.content,
      };
    });
  };
  /** => Payment Guide List */
  const renderPaymentGuideList = (data: PaymentGuideListItem[]) => {
    return <ThankYouPageCustomAccordion data={generatePaymentGuideListData(data)} />;
  };
  /** => Payment Guide */
  const renderPaymentGuide = () => {
    return (
      <ThankYouPageCard title="Panduan Pembayaran">
        <View>
          {!thankYouPagePaymentGuideListLoading &&
            renderPaymentGuideList(thankYouPagePaymentGuidelistData)}
        </View>
      </ThankYouPageCard>
    );
  };
  /** => batalkan pesanan */
  const handleCancelOrder = () => {
    // confirmModalRef.current?.show(params.orderId);
    setConfirmationOpen(true)
  };
  const handleConfirmationCancelOrder = () => {
    // update order to cancelled and back to history list view
    thankYouPageCancelOrderAction.fetch(dispatchThankYouPage, {
      id: params.orderId,
      status: 'cancelled',
    });
    // setConfirmationOpen(false);
    setTimeout(() => {
      NavigationAction.navigate('HistoryListView');
    }, 1000);
  };
  /** => Order Notes */
  const renderOrderNotes = () => {
    if (thankYouPageData != null) {
      return (
        <ThankYouPageCard title="Informasi Pengiriman">
          <ThankYouPageCardItem
            title="Tanggal Pemesanan"
            value={
              thankYouPageData?.createdAt
                ? toLocalDateTime(thankYouPageData?.createdAt)
                : '-'
            }
          />
          <ThankYouPageCardItem
              title="Alamat Pengiriman"
              value={`${thankYouPageData?.buyerAddress} ${thankYouPageData?.buyerAddressNoteAddress}, ${thankYouPageData?.buyerAddressUrban}, ${thankYouPageData?.buyerAddressDistrict}, ${thankYouPageData?.buyerAddressCity}, ${thankYouPageData?.buyerAddressProvince}, ${thankYouPageData?.buyerAddressZipCode}`}
          />
          {/* {params.section == 'orderHistory' && (
            <ThankYouPageCardItem
              title="Alamat Pengiriman"
              value={`${thankYouPageData?.buyerAddress} ${thankYouPageData?.buyerAddressNoteAddress} ${thankYouPageData?.buyerAddressUrban} ${thankYouPageData?.buyerAddressDistrict} ${thankYouPageData?.buyerAddressCity} ${thankYouPageData?.buyerAddressProvince}, ${thankYouPageData?.buyerAddressZipCode}`}
            />
          )} */}
        </ThankYouPageCard>
      );
    }
  };
  /** => Thank You Page Content */
  const renderThankYouPageContent = () => (
    <ScrollView>
      <>
        {renderCountDown()}
        {renderPaymentDetailV2()}
        {/* {renderPaymentDetail()}
        {renderPaymentTotal()} */}
        {renderPaymentGuide()}
        {renderOrderNotes()}
      </>
    </ScrollView>
  );
  /** => Content */
  const renderContent = () => (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <View style={ThankYouPageStyle.headerExtension} />
      {renderThankYouPageContent()}
    </View>
  );
  /** => ModalOrderDetail */
  const renderModalOrderDetail = () => {
    return (
      <ModalThankYouPageOrderDetail
        isOpen={modalThankYouPageOrderDetail.isOpen}
        close={() => {
          modalThankYouPageOrderDetail.setData(null);
          // modalThankYouPageOrderDetail.setOpen(false);
        }}
        data={modalThankYouPageOrderDetail.data}
      />
    );
  };
  {
    /* confirmation  batalkan*/
  }
  const renderModalConfirmationCancelOrder = () => {
    return (
      <BottomSheetConfirmationV2
        isOpen={confirmationOpen}
        title="Batalkan Pesanan?"
        desc="Anda tidak perlu melakukan pembayaran setelah membatalkan pesanan"
        onSubmit={handleConfirmationCancelOrder}
        onCancel={() => setConfirmationOpen(false)}
      />
    );
  };

  /** => Footer */
  const renderFooter = () => (
    <>
      {params.section == 'orderHistory' ? (
        <View style={ThankYouPageStyle.footerCancelOrder}>
          <View style={ThankYouPageStyle.footerCancelOrderButton}>
            {/* <SnbButton.Single
              type="primary"
              title={'Batalkan Pesanan'}
              onPress={handleCancelOrder}
            /> */}
            <SnbButton2.Secondary
              full={true}
              outline={true}
              size="large"
              title={'Batalkan Pesanan'}
              onPress={handleCancelOrder}
            />
          </View>
        </View>
        // <FooterButton.Single
        //   title={'Batalkan Pesanan'}
        //   buttonPress={handleCancelOrder}
        // />
      ) : (
        <FooterButton.Dual
          title2={'Ke Beranda'}
          button2Press={goToHome}
          title1={'Cek Status'}
          button1Press={() => NavigationAction.navigate('HistoryListView')}
        />

        
      )}
    </>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      {thankYouPageLoading ? (
        <LoadingPage />
      ) : (
        <>
          <SnbTopNav.Type1 type="white" title={'Menunggu Pembayaran'} />

          {renderContent()}
          {renderFooter()}
          {renderModalOrderDetail()}
          {renderModalConfirmationCancelOrder()}
        </>
      )}
    </SnbContainer>
  );
};

export default OmsThankYouPageView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: m. irpan (valkyrie)
 * createDate: 10092021
 */
