/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => payment types list */
const paymentTypesList = (data: models.ListProcessProps) => {
  const path = `types?invoiceGroupId=${data.invoiceGroupId}&totalCartParcel=${data.totalCartParcel}&page=${data.page}`;
  return apiMapping<models.IPaymentTypesList[]>(
    'auth',
    path,
    'payment',
    'v1',
    'LIST',
  );
};
/** ==> payment channels list */
const paymentChannelsList = (data: models.ListProcessProps) => {
  const path = `channels?invoiceGroupId=${data.invoiceGroupId}&paymentTypeId=${data.paymentTypeId}&totalCartParcel=${data.totalCartParcel}`;
  return apiMapping<models.IPaymentChannelsList[]>(
    'auth',
    path,
    'payment',
    'v1',
    'LIST',
  );
};
/** === EXPORT FUNCTIONS === */
export const PaymentApi = {
    paymentTypesList,
    paymentChannelsList
  };