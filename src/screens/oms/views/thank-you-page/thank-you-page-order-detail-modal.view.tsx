/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import React, { FC, useState, useEffect,forwardRef, useRef, useCallback, useImperativeHandle } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { SnbText2, colorV2, SnbBottomSheet2, SnbBottomSheet2Ref, SnbBottomSheetPart } from 'react-native-sinbad-ui';
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
export const ModalThankYouPageOrderDetail = forwardRef<
  SnbBottomSheet2Ref,
  ModalThankYouPageOrderDetail
>((props, ref) => {
  const {
    isOpen,
    close,
    data,
  } = props;
  //ref
  const modalRef = useRef<SnbBottomSheet2Ref>(null);
  // register ref
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }));
  // Function
  const onCloseModal = useCallback(() => {
    close && close();
    modalRef.current?.close();
  }, [modalRef.current]);
  // State Effect
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);
  const [expandableLabelItemCount, setExpandableLabelItemCount] = useState(0);
  let count = -2;
  if (data != null) {
    data.sellers.forEach((seller) => {
      count = count + seller.products.length;
    });
  }
  // setExpandableLabelItemCount(count - 2)

  const [expanded, setExpanded] = useState(false);
  const [modalHeight, setModalHeight] = useState(275)
  useEffect(() => {
    if(expanded){
      setModalHeight(424)
    }
    else{
      setModalHeight(275)
    }
  },[expanded])
  const productPerSellerList = (sellerData: models.OrderSeller) => {
    if (expanded) {
      return sellerData.products.map((product) => (
        <>
          <View>
            <View style={ThankYouPageStyle.OrderDetailItem}>
              <View style={{ width: '50%' }}>
                <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                  {product.productName} {product.qty}
                </SnbText2.Paragraph.Default>
              </View>
              {/* <View> */}
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                {toCurrency(product.productPriceAfterTax * product?.qty, {
                  withFraction: false,
                })}
              </SnbText2.Paragraph.Default>
              {/* </View> */}
            </View>
          </View>
        </>
      ));
    } else {
      return (
        <>
          <View>
            <View style={ThankYouPageStyle.OrderDetailItem}>
              <View style={{ width: '50%' }}>
                <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                  {sellerData.products[0]?.productName}{' '}
                  {sellerData.products[0]?.qty}
                </SnbText2.Paragraph.Default>
              </View>
              {/* <View> */}
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                {toCurrency(
                  sellerData.products[0]?.productPriceAfterTax *
                    sellerData.products[0]?.qty,
                  { withFraction: false },
                )}
              </SnbText2.Paragraph.Default>
              {/* </View> */}
            </View>
          </View>
          {sellerData.products[1] != undefined && (
            <View>
              <View style={ThankYouPageStyle.OrderDetailItem}>
                <View style={{ width: '50%' }}>
                  <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                    {sellerData.products[1]?.productName}{' '}
                    {sellerData.products[1]?.qty}
                  </SnbText2.Paragraph.Default>
                </View>
                {/* <View> */}
                <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                  {toCurrency(
                    sellerData.products[1]?.productPriceAfterTax *
                      sellerData.products[1]?.qty,
                    { withFraction: false },
                  )}
                </SnbText2.Paragraph.Default>
                {/* </View> */}
              </View>
            </View>
          )}
        </>
      );
    }
  };
  const productPriceList = () => {
    if (expanded) {
      return data?.sellers.map((dataSeller) => (
        <>
          <View>
            <View style={{ marginVertical: 6 }}>
              <SnbText2.Body.Default color={colorV2.textColor.secondary}>
                {dataSeller.sellerName}
              </SnbText2.Body.Default>
            </View>
            {productPerSellerList(dataSeller)}
          </View>
        </>
      ));
    } else {
      if (data != null) {
        if (data.sellers[0].products.length >= 2) {
          return (
            <>
              <View>
                <View style={{ marginVertical: 6 }}>
                  <SnbText2.Body.Default color={colorV2.textColor.secondary}>
                    {data?.sellers[0].sellerName}
                  </SnbText2.Body.Default>
                </View>
                {productPerSellerList(data.sellers[0])}
              </View>
            </>
          );
        } else {
          return data.sellers.map((dataSeller) => (
            <>
              <View>
                <View style={{ marginVertical: 6 }}>
                  <SnbText2.Body.Default color={colorV2.textColor.secondary}>
                    {dataSeller.sellerName}
                  </SnbText2.Body.Default>
                </View>
                {productPerSellerList(dataSeller)}
              </View>
            </>
          ));
        }
      }
    }
  };
  const expandableButton = () => {
    return (
      <>
        {count > 0 && (
          <>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <View style={ThankYouPageStyle.expandableButton}>
                {expanded ? (
                  <SnbText2.Body.Small
                    color={
                      colorV2.textColor.link
                    }>{`Sembunyikan ${count} Produk Lainnya`}</SnbText2.Body.Small>
                ) : (
                  <SnbText2.Body.Small
                    color={
                      colorV2.textColor.link
                    }>{`Tampilkan ${count} Produk Lainnya`}</SnbText2.Body.Small>
                )}
              </View>
            </TouchableOpacity>
            <ThankYouPageCardDivider />
          </>
        )}
      </>
    );
  };
  const deliveryAndOtherCost = () => {
    return (
      <>
        <View>
          <View style={ThankYouPageStyle.OrderDetailItem}>
            <View>
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>Biaya Pengiriman</SnbText2.Paragraph.Default>
            </View>
            <View>
              <SnbText2.Paragraph.Default color={colorV2.textColor.success}>
                {toCurrency(0, { withFraction: false })}
              </SnbText2.Paragraph.Default>
            </View>
          </View>
        </View>
        <View>
          <View style={ThankYouPageStyle.OrderDetailItem}>
            <View>
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>Biaya Layanan</SnbText2.Paragraph.Default>
            </View>
            <View>
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                {toCurrency(0, { withFraction: false })}
              </SnbText2.Paragraph.Default>
            </View>
          </View>
        </View>
        <ThankYouPageCardDivider />
      </>
    );
  };
  const totalCost = () => {
    return (
      <>
        <View>
          <View style={ThankYouPageStyle.OrderDetailItem}>
            <View>
              <SnbText2.Headline.Small color={colorV2.textColor.default}>Total</SnbText2.Headline.Small>
            </View>
            <View>
              <SnbText2.Headline.Small color={colorV2.textColor.default}>
                {toCurrency(Number(data?.totalOrderPriceAfterTax), {
                  withFraction: false,
                })}
              </SnbText2.Headline.Small>
            </View>
          </View>
        </View>
      </>
    );
  };
  const orderDetail = () => {
    return (
      <View style={{ paddingBottom: 16 }}>
        {data !== null && <>{productPriceList()}</>}
        {expandableButton()}
        {deliveryAndOtherCost()}
        {totalCost()}
      </View>
    );
  };
  const content = () => {
    return (
      <View style={{ marginBottom: 16 }}>
        <ScrollView
          style={{ paddingTop: 16, paddingBottom:24, maxHeight: height * 0.6 }}
          showsVerticalScrollIndicator={false}>
          {orderDetail()}
        </ScrollView>
      </View>
    );
  };
  return (
    <SnbBottomSheet2
      ref={modalRef}
      name="thank-you-order-detail"
      type="content"
      contentHeight={modalHeight}
      content={content()}
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={onCloseModal}
        />
      }
      title={
        <SnbBottomSheetPart.Title
          swipeIndicator
          title="Detail Pesanan"
          titleType="center"
        />
      }
      close={onCloseModal}
    />
  );
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
});
