/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText2, colorV2 } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutSKUListView } from './checkout-sku-list.view';
import { CheckoutShipmentDetailView } from './checkout-shipment-detail.view';
import { CheckoutPaymentDetailView } from './checkout-payment-detail.view';
import { CheckoutWarningTime } from './checkout-warning-time';
/** === TYPE === */
import * as models from '@models';
import { testProps } from '@core/functions/global/test-props';
/** === INTERFACE === */
interface CheckoutInvoiceGroupViewProps {
  data: models.CheckoutResponse;
  handleSetParcelDetailData: (
    data: models.CheckoutCartProduct[],
    sellerName: string,
  ) => void;
  handleOpenModalParcelDetail: () => void;
  testID: string;
}
/** === COMPONENT === */
export const CheckoutInvoiceGroupView: FC<CheckoutInvoiceGroupViewProps> = ({
  data,
  handleSetParcelDetailData,
  handleOpenModalParcelDetail,
  testID,
}) => {
  /** === HOOK === */
  //get max lead time from product list
  const getMaxLeadTime = (products: models.CheckoutCartProduct[]) => {
    return Math.max.apply(
      Math,
      products.map(function (o) {
        return o.leadTime;
      }),
    );
  };

  return (
    <>
      <View style={CheckoutStyle.invoiceGroupListContainer}>
        <CheckoutWarningTime testID={testID} />
      </View>

      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={data?.sellers}
        renderItem={({ item }) => (
          <>
            <View style={CheckoutStyle.invoiceGroupListField}>
              <View style={CheckoutStyle.headerSection}>
                <SnbText2.Headline.Small
                  testID={`sellerName.seller${item.sellerId}.productContainer.${testID}`}
                  color={colorV2.textColor.default}>
                  {item.sellerName}
                </SnbText2.Headline.Small>
                <TouchableOpacity
                  {...testProps(
                    `btn-openParcelDetail.seller${item.sellerId}.productContainer.${testID}`,
                  )}
                  onPress={() => {
                    handleOpenModalParcelDetail();
                    handleSetParcelDetailData(item.products, item.sellerName);
                  }}>
                  <SnbText2.Body.Small
                    testID={`title.btn-openParcelDetail.seller${item.sellerId}.productContainer.${testID}`}
                    color={colorV2.textColor.link}>
                    Lihat Detail
                  </SnbText2.Body.Small>
                </TouchableOpacity>
              </View>
              <CheckoutSKUListView
                testID={`seller${item.sellerId}.productContainer.${testID}`}
                products={item.products}
              />
              <CheckoutShipmentDetailView
                testID={`seller${item.sellerId}.productContainer.${testID}`}
                leadTime={getMaxLeadTime(item.products)}
              />
              <CheckoutPaymentDetailView
                testID={`seller${item.sellerId}.productContainer.${testID}`}
                products={item.products}
              />
            </View>
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
