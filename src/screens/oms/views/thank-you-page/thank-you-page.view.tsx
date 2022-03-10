/** === IMPORT PACKAGES === */
import LoadingPage from '@core/components/LoadingPage';
import { toCurrency } from '@core/functions/global/currency-format';
import Clipboard from '@react-native-clipboard/clipboard';
import { ThankYouPageCard } from '@screen/oms/components/thank-you-page-card.component';
import { useModalThankYouPageOrderDetail } from '@screen/oms/functions/thank-you-page/thank-you-page.function';
import { useThankYouPageAction, useThankYouPagePaymentGuideListAction } from '@screen/oms/functions/thank-you-page/thank-you-page-hook.function';
import { ThankYouPageStyle } from '@screen/oms/styles/thank-you-page/thank-you-page.style';
import { color, SnbButton, SnbContainer, SnbText, SnbToast, SnbTopNav, styles } from '@sinbad/react-native-sinbad-ui';
import React, { FC, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native'; 
import { ModalThankYouPageOrderDetail } from './thank-you-page-order-detail-modal.view';
import { useThankYouPageContext } from 'src/data/contexts/oms/thank-you-page/useThankYouPageContext';
import CustomAccordion from '@screen/history/components/CustomAccordion';
import { PaymentGuideListItem } from '@model/oms';
import ThankYouPageCardItem from '@screen/oms/components/thank-you-page-card-item';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { goToHome } from '@core/functions/product';
import { goToThankYouPage } from '@screen/oms/functions';
import moment from 'moment';
import { CountDownTimer } from '@screen/history/components';

const OmsThankYouPageView: FC = () => {
  const modalThankYouPageOrderDetail = useModalThankYouPageOrderDetail();
  /** => Get Order Detail */
  const thankYouPageAction = useThankYouPageAction();
  const [paymentMethodId, setPaymentMethodId]= useState('');
  const thankYouPagePaymentGuideListAction = useThankYouPagePaymentGuideListAction();
  const {
    stateThankYouPage: {
      detail: {
        data: thankYouPageData,
        loading: thankYouPageLoading,
        // error: thankYouPageError,
      },
      paymentGuide: {
        data: thankYouPagePaymentGuidelistData,
        loading: thankYouPagePaymentGuideListLoading
      }
    },
    dispatchThankYouPage
  } = useThankYouPageContext()
  
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
    thankYouPageAction.thankYoupageOrderDetail(dispatchThankYouPage,'6')
  }, [])

  useEffect(() => {
    if(thankYouPageData != null ){
      setPaymentMethodId(thankYouPageData.paymentMethodId)
    }
  }, [thankYouPageData])

  useEffect(() => {
    if(paymentMethodId != '' ){
      thankYouPagePaymentGuideListAction.fetch(dispatchThankYouPage,{paymentMethodId})
    }
  }, [paymentMethodId])

  /** => function to copy VA Number */
  const onVACopied = () => {
    const accountVa = thankYouPageData?.vaAccountNo || '';
    Clipboard.setString(accountVa.toString());
    SnbToast.show('Copied To Clipboard', 2000);
  };
  /** => function to copy Order Amount */
  const onOrderAmountCopied = () => {
    const orderAmount = thankYouPageData?.totalOrderAmount || '';
    Clipboard.setString(orderAmount.toString());
    SnbToast.show('Copied To Clipboard', 2000);
  };
  const handleThankYouPageOrderDetail = () => {
    modalThankYouPageOrderDetail.setData(thankYouPageData);
    modalThankYouPageOrderDetail.setOpen(true)
  };
  /** => render countdown */
  const renderCountDown = () => {
    if(thankYouPageData != null && thankYouPageData != undefined){
      console.log('irpan',thankYouPageData )
      const expiredPaymentTime = thankYouPageData?.expiredDate;

      return moment.utc(new Date()).local() <
        moment.utc(expiredPaymentTime).local() &&
        expiredPaymentTime !== null ? (
        <View style={styles.shadowForBox10}>
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <SnbText.H4 align="center">
              Silahkan lakukan pembayaran dalam waktu
            </SnbText.H4>
            <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <CountDownTimer
                type={'big'}
                expiredTime={thankYouPageData!.expiredDate}
              />
            </View>
            <SnbText.B3 color={color.black60} align="center">
              {`Sebelum ${moment(expiredPaymentTime).format('LLLL')} WIB`}
            </SnbText.B3>
          </View>
          <View style={{ height: 10, backgroundColor: color.black10 }} />
        </View>
      ) : (
        <View />
      );
    } 
    
  };
  /** => Payment Total */
  const renderPaymentTotal = () => {
    if(thankYouPageData === null || thankYouPageData === undefined) {
      return null;
    }
    return (
    <ThankYouPageCard 
    title="Total Pembayaran"
    headerButton={true}
    headerButtonTitle="Lihat Detail"
    headerButtonAction={handleThankYouPageOrderDetail}
    >
    <View
     style={ThankYouPageStyle.defaultContentPadding}
    >
      <SnbText.H4 color={color.red50}>{toCurrency(Number(thankYouPageData?.totalOrderAmount)?? 0, { withFraction: false })}</SnbText.H4>
      <View
      style={ThankYouPageStyle.defaultContentPadding}
      >
        <TouchableOpacity onPress={() => onOrderAmountCopied()}>
          <SnbText.B4 color={color.blue50}>{'Salin Jumlah'}</SnbText.B4>
        </TouchableOpacity>
      </View>
      
    </View> 
    </ThankYouPageCard>
    )
  }
  /** => Payment Detail */
  const renderPaymentDetail = () => {
    if(thankYouPageData === null || thankYouPageData === undefined) {
      return null;
    }
    return (
    <ThankYouPageCard title="Detail Pembayaran">
      <View
        style={ThankYouPageStyle.paymentDetail}>
        <Image
          source={{
            uri: thankYouPageData?.paymentIconUrl,
          }}
          style={ThankYouPageStyle.mediumIcon}
        />
        <View>
          <SnbText.H2>{thankYouPageData?.vaAccountNo}</SnbText.H2>
          <TouchableOpacity onPress={() => onVACopied()}>
            <SnbText.C1 color= {color.blue50}>{'Salin no. Virtual Account'}</SnbText.C1>
          </TouchableOpacity>
        </View>
              
      </View>
    </ThankYouPageCard>
    )
  }
  const generatePaymentGuideListData = (data: PaymentGuideListItem[]) => {
    return data.map ((item : PaymentGuideListItem) => {
        return {
          name: item.title,
          instruction: item.content
        }
    })
  }
  /** => Payment Guide List */
  const renderPaymentGuideList = (data: PaymentGuideListItem[]) => {
    return (
        <CustomAccordion data={generatePaymentGuideListData(data)}/>
    )
  }
  /** => Payment Guide */
  const renderPaymentGuide = () => {
    return (
      <ThankYouPageCard title="Panduan Pembayaran">
        <View style={ThankYouPageStyle.defaultContentPadding}>
          {!thankYouPagePaymentGuideListLoading &&
            renderPaymentGuideList(thankYouPagePaymentGuidelistData)
          }
        </View>
      </ThankYouPageCard>
    )
  }
  /** => Order Notes */
  const renderOrderNotes = () => {
    if(thankYouPageData != null){
      return (
        <ThankYouPageCard title="Catatan Pesanan">
          <ThankYouPageCardItem 
            title='Tanggal Pembelian'
            value={
              thankYouPageData?.createdAt ? toLocalDateTime(thankYouPageData?.createdAt) : '-'
            }
          />
        </ThankYouPageCard>
      )
    }
    
  }
  /** => Thank You Page Content */
  const renderThankYouPageContent = () => (
    <ScrollView
    >
    <>
    {renderCountDown()}
    {renderPaymentDetail()}
    {renderPaymentTotal()}
    {renderPaymentGuide()}
    {renderOrderNotes()}
    </>
    </ScrollView>
  );
  /** => Content */
  const renderContent = () => 
  (
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
          modalThankYouPageOrderDetail.setOpen(false);
        }}
        data={modalThankYouPageOrderDetail.data}
      />
    );
  };
  /** => Footer */
  const renderFooter = () => (
    <View
      style={ThankYouPageStyle.footer}>
        <SnbButton.Dynamic
          size="medium"
          type="secondary"
          title={'Kembali ke Beranda'}
          onPress={goToHome}
        />
        <SnbButton.Dynamic
          size="medium"
          type="primary"
          title={'Cek Status'}
          onPress={goToThankYouPage}
        />
    </View>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      {thankYouPageLoading ?
      (
        <LoadingPage/>
      ):
      (
      <>
      <SnbTopNav.Type1
        type="red"
        title={`Menunggu Pembayaran`}
      />
      
      {renderContent()}
      {renderFooter()}
      {renderModalOrderDetail()}
      </>
      )}
    </SnbContainer>
  );
}

export default OmsThankYouPageView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: m. irpan (valkyrie)
 * createDate: 10092021
 */