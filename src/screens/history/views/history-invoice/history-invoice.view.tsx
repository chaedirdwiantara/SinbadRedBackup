/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbPdf,
} from '@sinbad/react-native-sinbad-ui';
import { usePaymentInvoice, useRequestWritePermission } from '../../functions';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack } from '../../functions';
type HistoryInvoiceParam = {
  Invoice: { fileName: string; id: number; url: string };
};

type HistoryInvoiceRouteProp = RouteProp<HistoryInvoiceParam, 'Invoice'>;
/** === COMPONENT === */
const HistoryInvoiceView: FC = () => {
  const { params } = useRoute<HistoryInvoiceRouteProp>();
  const { reset } = usePaymentInvoice();
  const { accessGranted } = useRequestWritePermission();
  const { dispatchHistory } = React.useContext(contexts.HistoryContext);
  const goBackFunction = () => {
    goBack();
    reset(dispatchHistory);
  };

  const downloadFuction = () => {
    console.log('download');
    console.log(accessGranted);
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
        iconAction={() => downloadFuction()}
      />
    );
  };
  return (
    <SnbContainer color="white">
      {renderHeader()}
      <SnbPdf uri={params.url} cache={true} />
    </SnbContainer>
  );
};

export default HistoryInvoiceView;
