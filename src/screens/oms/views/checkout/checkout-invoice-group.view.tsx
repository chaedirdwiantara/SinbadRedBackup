/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { useParcelDetailModal } from '../../functions/checkout';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutSKUListView } from './checkout-sku-list.view';
import { CheckoutShipmentDetailView } from './checkout-shipment-detail.view';
import { CheckoutPaymentTypeView } from './checkout-payment-type.view';
import { CheckoutPaymentDetailView } from './checkout-payment-detail.view';
/** === TYPE === */
import { IProductCheckout } from './checkout-sku-list.view';
import * as models from '@models';

interface CheckoutInvoiceGroupViewProps {
  products: IProductCheckout[];
  data: models.IInvoiceCheckout;
  openModalPaymentType: (value: boolean) => void;
}
/** === COMPONENT === */
export const CheckoutInvoiceGroupView: FC<CheckoutInvoiceGroupViewProps> = ({
  products,
  data,
  openModalPaymentType,
}) => {
  /** === HOOK === */
  const parcelDetailModal = useParcelDetailModal();

  return (
    <View style={CheckoutStyle.invoiceGroupListContainer}>
      {Array.isArray(data.brands) &&
        data.brands.length > 0 &&
        data.brands.map((brand) => (
          <View key={brand.brandId}>
            <View style={CheckoutStyle.headerSection}>
              <SnbText.H4>{brand.brandName}</SnbText.H4>
              <TouchableOpacity
                onPress={() => parcelDetailModal.setModalOpen(true)}>
                <SnbText.B2 color={color.red50}>Lihat Lebih</SnbText.B2>
              </TouchableOpacity>
            </View>
            <CheckoutSKUListView products={products} />
          </View>
        ))}
      <CheckoutShipmentDetailView />
      <CheckoutPaymentTypeView
        data={data}
        openModalPaymentType={openModalPaymentType}
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
