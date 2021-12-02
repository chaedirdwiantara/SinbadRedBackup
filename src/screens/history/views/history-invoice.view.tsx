/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
} from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack } from '../functions';
type HistoryInvoiceParam = {
  Invoice: {};
};

type HistoryInvoiceRouteProp = RouteProp<HistoryInvoiceParam, 'Invoice'>;
/** === COMPONENT === */
const HistoryInvoiceView: FC = () => {
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Detail Faktur'}
        backAction={() => goBack()}
      />
    );
  };
  return (
    <SnbContainer color="white">
      {renderHeader()}
      <SnbText.H1>Invoice</SnbText.H1>
    </SnbContainer>
  );
};

export default HistoryInvoiceView;
