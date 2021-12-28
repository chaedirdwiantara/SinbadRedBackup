import apiMappingMock from '@core/services/apiMappingMock';
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** get payment detail */
const paymentDetail = (data: models.DetailProcessProps) => {
  const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = `billing/${data.id}`;
  return apiMapping<
    models.DetailSuccessProps<models.PaymentDetailSuccessProps>
  >('auth', path, 'payment', 'v1', 'DETAIL');
};
/** get invoice detail */
const paymentInvoiceDetail = (data: models.DetailProcessProps) => {
  const path = `invoice/${data.id}`;
  return apiMapping<
    models.DetailSuccessProps<models.PaymentInvoiceSuccessProps>
  >('auth', path, 'payment', 'v1', 'DETAIL');
};
/** update billing : activate VA */
const activateVA = (id: string) => {
  const path = `billing/${id}`;
  return apiMapping('auth', path, 'payment', 'v1', 'UPDATE', { id });
};
export const HistoryPaymentApi = {
  paymentDetail,
  paymentInvoiceDetail,
  activateVA,
};
