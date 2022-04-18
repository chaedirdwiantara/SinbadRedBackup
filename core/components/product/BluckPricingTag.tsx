import { SnbBadge } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
// tag harga grosir
const BulkPricingTag: FC<ViewProps> = (props) => {
  return (
    <View style={props.style} testID="bulk_pricing_tag">
      <SnbBadge.Label
        iconName="cart"
        type="information"
        value="Harga Grosir"
        testID="bulk_pricing_tag"
      />
    </View>
  );
};

export default BulkPricingTag;
