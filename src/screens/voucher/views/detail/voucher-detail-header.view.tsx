/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE ===  */
import { goBack } from '../../functions';
/** === COMPONENT ===  */
export const VoucherDetailHeader: FC = () => (
  <View style={{ width: '100%', position: 'absolute', zIndex: 1000, top: 0 }}>
    <SnbTopNav.Type3
      type={'transparent1'}
      backAction={() => goBack()}
      title={''}
    />
  </View>
);
