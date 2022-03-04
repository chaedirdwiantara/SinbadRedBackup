/** === IMPORT PACKAGES === */
import { toCurrency } from '@core/functions/global/currency-format';
import Clipboard from '@react-native-clipboard/clipboard';
import { ThankYouPageCard } from '@screen/oms/components/thank-you-page-card.component';
import { ThankYouPageStyle } from '@screen/oms/styles/thank-you-page/thank-you-page.style';
import { color, SnbContainer, SnbText, SnbToast, SnbTopNav } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const OmsThankYouPageView: FC = () => {
  const orderDetail = {
    "loading": false,
    "data":
    {
      
      "id": "1",
      "code": "1812251000",
      "expiredDate": "2020-11-05T01:54:09.463Z",
      "vaAccountNo": "132323",
      "payment_icon_url": "https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png",
      "totalOrderAmount": "403000",
      "sellers": [
          {
              "sellerId": 1,
              "sellerName": "Seller 1",
              "products": [
                  {
                      "productId": "53c9b0000000000000000000",
                      "warehouseId": 3,
                      "warehouseName": "ATAPI DC Kemang",
                      "categoryId": "e3a76d0b-4aa9-4588-8bdd-2840236e5ec4",
                      "brandId": "33d200000000000000000000",
                      "brandName": "ATAPI SGM",
                      "productName": "ATAPI SGM ANANDA 2 150 GR GRD 2.0",
                      "productImageUrl": "https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/15515/image_1617790108395.png",
                      "qty": 99,
                      "qtyPerBox": 40,
                      "uomLabel": "PCS",
                      "isPriceAfterTax": true,
                      "taxPercentage": 10,
                      "lastUsedPrice": 13707.099609375,
                      "leadTime": 10
                  }
              ]
          }
      ],
      "buyerAddress": {
          "longtitude": "106°49′35.76",
          "latitude": "6°10′30.00",
          "province": "DKI Jakarta",
          "city": "Jakarta Selatan",
          "district": "Jakarta",
          "urban": "Jakarta",
          "zipCode": "445351",
          "address": "Jalan Jakarta",
          "noteAddress": "pagar putih",
          "locationId": "53c9b0000000000000000000"
      },
      "createdAt": "2021-02-01T06:19:55.516Z",
      "updatedAt": "2021-02-01T06:19:55.516Z"
    }
  }
  /** => function to copy VA Number */
  const onVACopied = () => {
    const accountVa = orderDetail?.data?.vaAccountNo || '';
    Clipboard.setString(accountVa.toString());
    SnbToast.show('Copied To Clipboard', 2000);
  };
  /** => function to copy Order Amount */
  const onOrderAmountCopied = () => {
    const orderAmount = orderDetail?.data?.totalOrderAmount || '';
    Clipboard.setString(orderAmount.toString());
    SnbToast.show('Copied To Clipboard', 2000);
  };
  /** => Payment Total */
  const renderPaymentTotal = () => (
    <ThankYouPageCard 
    title="Total Pembayaran"
    headerButton={true}
    headerButtonTitle="Lihat Detail"
    >
    <View
     style={{
       paddingTop:12
     }}
    >
      <SnbText.H4 color={color.red50}>{toCurrency(Number(orderDetail?.data?.totalOrderAmount)?? 0, { withFraction: false })}</SnbText.H4>
      <View
      style={{
        paddingTop:12
      }}
      >
        <TouchableOpacity onPress={() => onOrderAmountCopied()}>
          <SnbText.B4 color={color.blue50}>{'Salin Jumlah'}</SnbText.B4>
        </TouchableOpacity>
      </View>
      
    </View> 
    </ThankYouPageCard>
  )
  /** => Payment Detail */
  const renderPaymentDetail = () => (
  <ThankYouPageCard title="Detail Pembayaran">
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 12,
        paddingHorizontal: 25
      }}>
      <Image
        source={{
          uri: orderDetail?.data?.payment_icon_url,
        }}
        style={ThankYouPageStyle.mediumIcon}
      />
      <View>
        <SnbText.H2>{orderDetail?.data?.vaAccountNo}</SnbText.H2>
        <TouchableOpacity onPress={() => onVACopied()}>
          <SnbText.C1 color= {color.blue80}>{'Salin no. Virtual Account'}</SnbText.C1>
        </TouchableOpacity>
      </View>
            
    </View>
  </ThankYouPageCard>
  )
  /** => Thank You Page Content */
  const renderThankYouPageContent = () => (
    <ScrollView
    >
    <>
    {renderPaymentDetail()}
    {renderPaymentTotal()}
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
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type1
        type="red"
        title={`Menunggu Pembayaran`}
      />
      {renderContent()}
      {/* {renderFooter()} */}
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