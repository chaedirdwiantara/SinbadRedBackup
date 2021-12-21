/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider } from 'react-native-sinbad-ui';
import { VerificationOrderDetailPromoProduct } from '@models';
import { VerificationOrderStyle } from '../../styles';
import { usePromoAccordion } from '../../functions';
import { VerificationOrderDiscountItem } from './verification-order-discount-item.view';
import { VerificationOrderDiscountDetail } from './verification-order-discount-detail.view';
/** === INTERFACE ===  */
interface VerificationOrderDiscountListProps {
  promoProducts: VerificationOrderDetailPromoProduct[];
}
/** === COMPONENT ===  */
export const VerificationOrderDiscountList: FC<
  VerificationOrderDiscountListProps
> = ({ promoProducts }) => {
  const promoAccordion = usePromoAccordion();

  if (promoProducts.length === 0) {
    return null;
  }

  return (
    <View>
      <View style={VerificationOrderStyle.listHeader}>
        <SnbText.B4>{`Produk Mendapatkan Potongan Harga (${promoProducts.length} SKU)`}</SnbText.B4>
      </View>
      {promoProducts.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <VerificationOrderDiscountItem data={item} />
            <SnbDivider style={VerificationOrderStyle.listDivider} />
            <VerificationOrderDiscountDetail
              promoList={item.promos}
              voucherList={item.vouchers}
              totalDiscount={item.promoPrice + item.voucherPrice}
              accordionIndex={promoAccordion.activeIndex}
              accordionSetter={promoAccordion.setIndex}
              itemIndex={index}
            />
          </React.Fragment>
        );
      })}
    </View>
  );
};
