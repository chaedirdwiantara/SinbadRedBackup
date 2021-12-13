/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider } from 'react-native-sinbad-ui';
import { VerificationOrderDetailNonPromoList } from '@models';
import { VerificationOrderStyle } from '../../styles';
import { VerificationOrderNonDiscountItem} from './verification-order-non-discount-item.view';
/** === INTERFACE ===  */
interface VerificationOrderNonDiscountListProps {
  nonPromoProducts: VerificationOrderDetailNonPromoList[];
}
/** === COMPONENT ===  */
export const VerificationOrderNonDiscountList: FC<VerificationOrderNonDiscountListProps> =
  ({ nonPromoProducts }) => {
    if (nonPromoProducts.length === 0) {
      return null;
    }

    return (
      <View>
        <View style={VerificationOrderStyle.listHeader}>
          <SnbText.B4>{'Produk Tidak Mendapatkan Potongan Harga'}</SnbText.B4>
        </View>
        {nonPromoProducts.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <VerificationOrderNonDiscountItem data={item} />
              <SnbDivider style={VerificationOrderStyle.listDivider} />
            </React.Fragment>
          );
        })}
      </View>
    );
  };
