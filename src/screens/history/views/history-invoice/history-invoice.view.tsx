/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbPdf,
} from '@sinbad/react-native-sinbad-ui';
import { usePaymentInvoice } from '../../functions';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack } from '../../functions';
type HistoryInvoiceParam = {
  Invoice: {};
};

type HistoryInvoiceRouteProp = RouteProp<HistoryInvoiceParam, 'Invoice'>;
/** === COMPONENT === */
const HistoryInvoiceView: FC = () => {
  const { reset } = usePaymentInvoice();
  const { stateHistory, dispatchHistory } = React.useContext(
    contexts.HistoryContext,
  );
  const goBackFunction = () => {
    goBack();
    reset(dispatchHistory);
  };
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type5
        type="red"
        title="Detail Faktur"
        backAction={() => goBackFunction()}
        iconName="download"
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
