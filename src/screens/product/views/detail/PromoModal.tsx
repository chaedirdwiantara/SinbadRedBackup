/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { SnbBottomSheet, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT TYPE ===  */
import * as models from '@models';
/** === TYPE ===  */
interface PromoModalProps {
  visible: boolean;
  onClose: () => void;
  promoList: Array<models.PotentialPromoProductFlexiCombo>;
}
/** === CONSTANT === */
const { height } = Dimensions.get('window');
/** === COMPONENT ===  */
export const PromoModal: FC<PromoModalProps> = ({
  visible,
  onClose,
  promoList,
}) => (
  <SnbBottomSheet
    open={visible}
    title="Promosi"
    actionIcon="close"
    closeAction={onClose}
    content={
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <SnbText.B4>Potongan Harga</SnbText.B4>
        <View style={{ height: height * 0.15, marginTop: 16 }}>
          <ScrollView>
            {promoList.map((promo, promoIndex) => (
              <View key={promoIndex} style={{ marginBottom: 8 }}>
                <SnbText.C1>{promo.shortDescription}</SnbText.C1>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    }
  />
);
