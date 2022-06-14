import { SnbBadge2 } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
// tag harga grosir
const BulkPricingTag: FC<ViewProps> = (props) => {
  return (
    <View style={props.style} testID="bulk_pricing_tag">
      <SnbBadge2 title="Harga Grosir" type="information" iconName="cart" />
    </View>
  );
};

export default BulkPricingTag;
