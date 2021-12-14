import apiMappingMock from '@core/services/apiMappingMock';
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const paymentDetail = (data: models.DetailProcessProps) => {
  const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = `billing/${data.id}`;
  console.log(data, 'data action');

  return apiMapping<
    models.DetailSuccessProps<models.PaymentDetailSuccessProps>
  >('auth', path, 'payment', 'v1', 'DETAIL');
};

const paymentInvoiceDetail = (data: models.DetailProcessProps) => {
  const path = `invoice/${data.id}`;
  return apiMapping<
    models.DetailSuccessProps<models.PaymentInvoiceSuccessProps>
  >('auth', path, 'payment', 'v1', 'DETAIL');
};
export const HistoryPaymentApi = {
  paymentDetail,
  paymentInvoiceDetail,
};
