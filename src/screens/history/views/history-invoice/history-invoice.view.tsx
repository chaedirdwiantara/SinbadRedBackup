/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  SnbPdf,
} from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack } from '../../functions';
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
      <SnbTopNav.Type5
        type="red"
        title="Contoh Title"
        backAction={() => console.log('this example for back action')}
        iconValue={100}
        iconName="notifications"
        iconAction={() => console.log('this example for icon action')}
      />
    );
  };
  return (
    <SnbContainer color="white">
      {renderHeader()}
      <SnbPdf
        uri={
          'https://sinbad-payment.s3-ap-southeast-1.amazonaws.com/staging/payment/invoice/Sinbad_Invoice_110_20211130-120427.pdf'
        }
        cache={true}
      />
    </SnbContainer>
  );
};

export default HistoryInvoiceView;
