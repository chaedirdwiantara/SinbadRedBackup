/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { handleTransformProductBrands } from '@screen/oms/functions';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutSKUListView } from './checkout-sku-list.view';
import { CheckoutShipmentDetailView } from './checkout-shipment-detail.view';
import { CheckoutPaymentTypeView } from './checkout-payment-type.view';
import { CheckoutPaymentDetailView } from './checkout-payment-detail.view';
/** === TYPE === */
import * as models from '@models';
import { CheckoutWarningTime } from './checkout-warning-time';

interface CheckoutInvoiceGroupViewProps {
  data: any;
  // data: models.IInvoiceCheckout;
  // openModalPaymentType: (value: boolean) => void;
  // openModalParcelDetail: any;
  // openModalProductList: (data: models.ProductCheckout[]) => void;
  // index: number;
}
/** === COMPONENT === */
export const CheckoutInvoiceGroupView: FC<CheckoutInvoiceGroupViewProps> = ({
  data,
  // openModalPaymentType,
  // openModalParcelDetail,
  // openModalProductList,
  // index,
}) => {
  /** === HOOK === */
  console.log(data, 'datax');

  return (
    <View style={CheckoutStyle.invoiceGroupListContainer}>
      <CheckoutWarningTime />
      <View style={CheckoutStyle.invoiceGroupListField}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={data.sellers}
          renderItem={({ item, index }) => (
            <>
              <View style={CheckoutStyle.headerSection}>
                {/* <SnbText.H4>{data.invoiceGroupName}</SnbText.H4> */}
                {/* <TouchableOpacity onPress={() => openModalParcelDetail(data as any)}>
            <SnbText.B2 color={color.red50}>Lihat Lebih</SnbText.B2>
          </TouchableOpacity> */}
                <SnbText.H4>{item.sellerName}</SnbText.H4>
                <TouchableOpacity onPress={() => {}}>
                  <SnbText.B2 color={color.blue50}>Lihat Detail</SnbText.B2>
                </TouchableOpacity>
              </View>
              {/* <CheckoutSKUListView
          products={handleTransformProductBrands(data.brands)}
          openModalProduct={openModalProductList}
        /> */}
              <CheckoutSKUListView products={item.products} />
              <CheckoutShipmentDetailView />
              {/* <CheckoutPaymentTypeView
          data={data}
          openModalPaymentType={openModalPaymentType}
          index={index}
        /> */}

              {/* WE DONT NEED CHECKOUT PAYMENT TYPE IN THIS PAGE */}
              {/* <CheckoutPaymentTypeView
          data={data}
          openModalPaymentType={openModalPaymentType}
          index={index}
        /> */}

              {/*  <CheckoutPaymentDetailView data={data} /> */}
              <CheckoutPaymentDetailView />
            </>
          )}
        />
      </View>
    </View>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: Andi Chaedir Dwiantara (Valkyrie)
 * updatedDate: 04032022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
