/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => supplier list */
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

/** === EXPORT FUNCTIONS === */
export const PaymentApi = {
    paymentTypesList
  };