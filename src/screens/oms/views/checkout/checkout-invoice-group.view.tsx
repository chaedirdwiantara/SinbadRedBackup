/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutSKUListView } from './checkout-sku-list.view';
import { CheckoutShipmentDetailView } from './checkout-shipment-detail.view';
import { CheckoutPaymentDetailView } from './checkout-payment-detail.view';
import { CheckoutWarningTime } from './checkout-warning-time';
import { ModalParcelDetail } from './parcel-detail-modal.view';
/** === TYPE === */
import * as models from '@models';
// import { CheckoutWarningTime } from './checkout-warning-time';

interface CheckoutInvoiceGroupViewProps {
  data: any;
  //data: models.IInvoiceCheckout;
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

  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  return (
    <>
      <View style={CheckoutStyle.invoiceGroupListContainer}>
        <CheckoutWarningTime />
      </View>

      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={data.sellers}
        renderItem={({ item, index }) => (
          <>
            <View style={CheckoutStyle.invoiceGroupListField}>
              <View style={CheckoutStyle.headerSection}>
                <SnbText.H4>{item.sellerName}</SnbText.H4>
                <TouchableOpacity
                  onPress={() => {
                    setOpenModal(true), setDataModal(item.products);
                  }}>
                  <SnbText.B2 color={color.blue50}>Lihat Detail</SnbText.B2>
                </TouchableOpacity>
              </View>
              <CheckoutSKUListView products={item.products} />
              <CheckoutShipmentDetailView />
              <CheckoutPaymentDetailView products={item.products} />
            </View>
            <ModalParcelDetail
              isOpen={openModal}
              close={() => {
                setOpenModal(false);
              }}
              data={dataModal}
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
