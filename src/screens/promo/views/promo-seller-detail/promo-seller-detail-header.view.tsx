/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goBack } from '../../functions';
/** === COMPONENT ===  */
export const PromoSellerDetailHeader: FC = () => (
  <View style={{ width: '100%', position: 'absolute', zIndex: 1000, top: 0 }}>
    <SnbTopNav.Type5
      type={'transparent1'}
      backAction={() => goBack()}
      title={''}
      iconAction={() => {}}
      iconName={'cart'}
      iconValue={10}
    />
  </View>
);
