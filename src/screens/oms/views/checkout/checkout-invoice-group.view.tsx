/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText2, colorV2, SnbBottomSheet2Ref } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutSKUListView } from './checkout-sku-list.view';
import { CheckoutShipmentDetailView } from './checkout-shipment-detail.view';
import { CheckoutPaymentDetailView } from './checkout-payment-detail.view';
import { CheckoutWarningTime } from './checkout-warning-time';
import { ModalParcelDetail } from './parcel-detail-modal.view';
/** === TYPE === */
import * as models from '@models';

interface CheckoutInvoiceGroupViewProps {
  data: models.CheckoutResponse;
}
/** === COMPONENT === */
export const CheckoutInvoiceGroupView: FC<CheckoutInvoiceGroupViewProps> = ({
  data,
}) => {
  /** === HOOK === */

  const [dataModal, setDataModal]: any = useState([]);
  //get max lead time from product list
  const getMaxLeadTime = (products: models.CheckoutCartProduct[]) => {
    return Math.max.apply(
      Math,
      products.map(function (o) {
        return o.leadTime;
      }),
    );
  };

  /** => MODAL REF */
  const refParcelDetailModal = React.useRef<SnbBottomSheet2Ref>(null);

  return (
    <>
      <View style={CheckoutStyle.invoiceGroupListContainer}>
        <CheckoutWarningTime />
      </View>

      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={data?.sellers}
        renderItem={({ item }) => (
          <>
            <View style={CheckoutStyle.invoiceGroupListField}>
              <View style={CheckoutStyle.headerSection}>
                <SnbText2.Headline.Small color={colorV2.textColor.default}>
                  {item.sellerName}
                </SnbText2.Headline.Small>
                <TouchableOpacity
                  onPress={() => {
                    refParcelDetailModal.current?.open();
                    setDataModal(item.products);
                  }}>
                  <SnbText2.Body.Small color={colorV2.textColor.link}>
                    Lihat Detail
                  </SnbText2.Body.Small>
                </TouchableOpacity>
              </View>
              <CheckoutSKUListView products={item.products} />
              <CheckoutShipmentDetailView
                leadTime={getMaxLeadTime(item.products)}
              />
              <CheckoutPaymentDetailView products={item.products} />
            </View>
            <ModalParcelDetail
              parentRef={refParcelDetailModal}
              close={() => {
                refParcelDetailModal.current?.close();
              }}
              data={dataModal}
              sellerName={item.sellerName}
            />
          </>
        )}
      />
    </>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: Andi Chaedir Dwiantara (Valkyrie)
 * updatedDate: 08032022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
