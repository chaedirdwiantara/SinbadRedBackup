/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import {
  useParcelDetailModal,
  handleTransformProductBrands,
} from '@screen/oms/functions';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutSKUListView } from './checkout-sku-list.view';
import { CheckoutShipmentDetailView } from './checkout-shipment-detail.view';
import { CheckoutPaymentTypeView } from './checkout-payment-type.view';
import { CheckoutPaymentDetailView } from './checkout-payment-detail.view';
/** === TYPE === */
import * as models from '@models';

interface CheckoutInvoiceGroupViewProps {
  data: models.IInvoiceCheckout;
  openModalPaymentType: (value: boolean) => void;
  openModalParcelDetail: (value: boolean) => void;
  index: number;
}
/** === COMPONENT === */
export const CheckoutInvoiceGroupView: FC<CheckoutInvoiceGroupViewProps> = ({
  data,
  openModalPaymentType,
  openModalParcelDetail,
  index,
}) => {
  /** === HOOK === */

  return (
    <View style={CheckoutStyle.invoiceGroupListContainer}>
      <View>
        <View style={CheckoutStyle.headerSection}>
          <SnbText.H4>{data.invoiceGroupName}</SnbText.H4>
          <TouchableOpacity onPress={() => openModalParcelDetail}>
            <SnbText.B2 color={color.red50}>Lihat Lebih</SnbText.B2>
          </TouchableOpacity>
        </View>
        <CheckoutSKUListView
          products={handleTransformProductBrands(data.brands)}
        />
      </View>
      <CheckoutShipmentDetailView />
      <CheckoutPaymentTypeView
        data={data}
        openModalPaymentType={openModalPaymentType}
        index={index}
      />
      <CheckoutPaymentDetailView data={data} />
    </View>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
