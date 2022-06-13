/** === IMPORT PACKAGES ===  */
import React, { FC, useCallback, memo } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTION ===  */
import { useDataAuth } from '@core/redux/Data';
import { goBack, goToShoppingCart, backToLogin } from '@core/functions/product';
/** === TYPE ===  */
interface ProductDetailHeaderProps {
  cartBadge: number;
}
/** === COMPONENT ===  */
const ProductDetailHeaderMemo: FC<ProductDetailHeaderProps> = ({
  cartBadge,
}) => {
  const { me } = useDataAuth();

  const validateCartVisit = useCallback(() => {
    if (me.data === null) {
      backToLogin();
    } else {
      goToShoppingCart();
    }
  }, [me.data]);

  return (
    <SnbTopNav2.Type12
      iconName="cart"
      color="white"
      title=""
      iconValue={cartBadge}
      backAction={goBack}
      iconAction={validateCartVisit}
    />
  );
};

export const ProductDetailHeader = memo(ProductDetailHeaderMemo);
