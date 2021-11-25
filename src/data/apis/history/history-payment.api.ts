import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';

const paymentDetail = () => {
  const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = 'billing';
  return apiMappingMock<models.DetailSuccessProps<models.PaymentDetailSuccessProps>>(
    mockHost,
    path,
    'payment',
    'v1',
    'DETAIL',
  );
};

export const HistoryPaymentApi = {
  paymentDetail,
};
