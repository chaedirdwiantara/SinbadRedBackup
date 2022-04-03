/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import React, { FC, useState } from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native';
import {
  SnbText,
  SnbDivider,
  color,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import * as models from '@models';
import { ScrollView } from 'react-native-gesture-handler';
import { ThankYouPageCardDivider } from '@screen/oms/components/thank-you-page-card-divider.component';
import { ThankYouPageStyle } from '@screen/oms/styles/thank-you-page/thank-you-page.style';

const { height } = Dimensions.get('window');

/** === INTERFACE === */
interface ModalThankYouPageOrderDetail {
  isOpen: boolean;
  close: () => void;
  data: models.ThankYouOrderDetailProps | null;
}
/** === COMPONENT === */
export const ModalThankYouPageOrderDetail : FC<ModalThankYouPageOrderDetail> = ({
  isOpen,
  close,
  data
}) => {
  const  [expandableLabelItemCount, setExpandableLabelItemCount] = useState(0);
  let count = -2;
  if(data != null){
    data.sellers.forEach((seller) => {
        count = count + seller.products.length;
    })
  }
  // setExpandableLabelItemCount(count - 2)  
  
  const [expanded, setExpanded] = useState(false);
  const productPerSellerList = (sellerData : models.OrderSeller) => {
    if(expanded){
      return sellerData.products.map((product, index) => (
          <>
            <View>
              <View style={ThankYouPageStyle.OrderDetailItem}>
                <View style={{ width: '50%'}}>
                    <SnbText.B1 color={color.black60}>{product.productName}  {product.qty}</SnbText.B1>
                </View>
                {/* <View> */}
                  <SnbText.B1 color={color.black60}>
                    {toCurrency(product.lastUsedPrice * product?.qty, { withFraction: false })}
                  </SnbText.B1>
                {/* </View> */}
              </View>
            </View>
            
          </>
      ))
    }else{
      return (
        <>
          <View>
            <View style={ThankYouPageStyle.OrderDetailItem}>
              <View style={{ width: '50%'}}>
                  <SnbText.B1 color={color.black60}>{sellerData.products[0]?.productName} {sellerData.products[1]?.qty}</SnbText.B1>
              </View>
              {/* <View> */}
                <SnbText.B1 color={color.black60}>
                  {toCurrency(sellerData.products[0]?.lastUsedPrice * sellerData.products[0]?.qty, { withFraction: false })}
                </SnbText.B1>
              {/* </View> */}
            </View>
          </View>
          {sellerData.products[1] != undefined &&
          <View>
            <View style={ThankYouPageStyle.OrderDetailItem}>
              <View style={{ width: '50%'}}>
                  <SnbText.B1 color={color.black60}>{sellerData.products[1]?.productName} {sellerData.products[1]?.qty}</SnbText.B1>
              </View>
              {/* <View> */}
                <SnbText.B1 color={color.black60}>
                  {toCurrency(sellerData.products[1]?.lastUsedPrice * sellerData.products[1]?.qty, { withFraction: false })}
                </SnbText.B1>
              {/* </View> */}
            </View>
          </View>
        }
        </>
     )
    }
  }
  const productPriceList = () => {
    if(expanded){
      return data?.sellers.map((dataSeller) => (
        <>
          <View>
                <View style={{marginVertical: 6}}>
                  <SnbText.H4 color={color.black60}>{dataSeller.sellerName}</SnbText.H4>
                </View>
                {productPerSellerList(dataSeller)}
          </View>
        </>
      ))
    }else{
    if(data != null){
      if(data.sellers[0].products.length >= 2){
        return (
          <>
          <View>
                  <View style={{marginVertical: 6}}>
                    <SnbText.H4 color={color.black60}>{data?.sellers[0].sellerName}</SnbText.H4>
                  </View>
                  {productPerSellerList(data.sellers[0])}
            </View>
          </>
        )
      }else{
        return data.sellers.map((dataSeller) => (
          <>
          <View>
                  <View style={{marginVertical: 6}}>
                    <SnbText.H4 color={color.black60}>{dataSeller.sellerName}</SnbText.H4>
                  </View>
                  {productPerSellerList(dataSeller)}
            </View>
          </>
        ))
      }
    } 
    }
  }
  const expandableButton = () => {
    return (
      <>
      {count > 0 &&
      <>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={ThankYouPageStyle.expandableButton}>
          {expanded ?
          (<SnbText.B3 color={color.blue50}>{`Sembunyikan ${count} Produk`}</SnbText.B3>)
          :
          (<SnbText.B3 color={color.blue50}>{`Tampilkan ${count} Produk Lainnya`}</SnbText.B3>)
          }
        </View>
      </TouchableOpacity>
      <ThankYouPageCardDivider />
      </>
      }
      </>
    )
  }
  const deliveryAndOtherCost = () => {
    return (
      <>
        <View>
          <View style={ThankYouPageStyle.OrderDetailItem}>
            <View>
                <SnbText.B1 color={color.black60}>Total Pengiriman</SnbText.B1>
            </View>
            <View >
              <SnbText.B1 color={color.green50}>
                {toCurrency(0, { withFraction: false })}
              </SnbText.B1>
            </View>
          </View>
        </View>
        <View>
          <View style={ThankYouPageStyle.OrderDetailItem}>
            <View >
                <SnbText.B1 color={color.black60}>Biaya Layanan</SnbText.B1>
            </View>
            <View >
              <SnbText.B1 color={color.green50}>
                {toCurrency(0, { withFraction: false })}
              </SnbText.B1>
            </View>
          </View>
        </View>
        <ThankYouPageCardDivider />
      </>
    )
  }
  const totalCost = () => {
    return (
      <>
      <View>
          <View style={ThankYouPageStyle.OrderDetailItem}>
            <View>
                <SnbText.H4 color={color.black100}>Total</SnbText.H4>
            </View>
            <View>
              <SnbText.B2 color={color.black100}>
                {toCurrency(Number(data?.totalOrderAmount), { withFraction: false })}
              </SnbText.B2>
            </View>
          </View>
        </View>
      </>
    )
  } 
  const orderDetail = () => {
      return(
        <View style={{ paddingBottom: 16 }}>
          {data !== null &&
            <> 
              {productPriceList()}
              
            </>
          }
          {expandableButton()}
          {deliveryAndOtherCost()}
          {totalCost()}
        </View>
        )
  }
  const content = () => {
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <ScrollView
          style={{ paddingVertical: 16, maxHeight: height * 0.6 }}
          showsVerticalScrollIndicator={false}>
          {orderDetail()}
        </ScrollView>
      </View>
    );
  }
  return (<SnbBottomSheet
  open={isOpen}
  content={content()}
  title={'Detail Pesanan'}
  closeAction={close}
  actionIcon={'close'}
/>)
  // return data !== null ? (
  //   <SnbBottomSheet
  //     open={isOpen}
  //     content={content()}
  //     title={'Detail Pesanan'}
  //     closeAction={close}
  //     actionIcon={'close'}
  //   />
  // ): (
  //   <View/>
  // )
}