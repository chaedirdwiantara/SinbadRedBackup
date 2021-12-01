/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { contexts } from '@contexts';
import { usePotentialPromoProductAction } from '@screen/promo/functions';
import { useProductContext } from 'src/data/contexts/product/useProductContext';
/** === CONSTANT ===  */
const { height } = Dimensions.get('window');
/** === COMPONENT ===  */
export const PromoSection: FC = () => {
  const {
    stateProduct: { detail: productDetailState },
  } = useProductContext();
  /**
   * Potential Promo Product
   * - only fetch when the product data is ready
   */
  const {
    statePromo: { potentialPromoProduct: potentialPromoProduct },
    dispatchPromo,
  } = React.useContext(contexts.PromoContext);
  const potentialPromoProductList = potentialPromoProduct.detail;
  const potentialPromoProductAction = usePotentialPromoProductAction();
  /** => potential promo product effect */
  React.useEffect(() => {
    if (productDetailState.data !== null) {
      const { id } = productDetailState.data;
      potentialPromoProductAction.reset(dispatchPromo);
      potentialPromoProductAction.detail(dispatchPromo, id);
    }
  }, [productDetailState.data]);

  if (
    potentialPromoProductList.data !== null &&
    potentialPromoProductList.data.flexiCombo.length > 0
  ) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <SnbText.B3 color={color.black60}>Promo</SnbText.B3>
        <View style={{ marginVertical: 8 }}>
          <SnbText.C1 color={color.black80}>
            Anda berpotensi mendapatkan Promo
          </SnbText.C1>
        </View>
        <View style={{ height: height * 0.15 }}>
          <ScrollView>
            {potentialPromoProductList.data.flexiCombo.map(
              (promo, promoIndex) => (
                <View key={promoIndex} style={{ marginBottom: 8 }}>
                  <SnbText.B3>{promo.shortDescription}</SnbText.B3>
                </View>
              ),
            )}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return null;
  }
};
