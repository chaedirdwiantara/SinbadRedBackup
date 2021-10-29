/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';
/** === FUNCTION === */
/** => promo payment list */
const promoPaymentList = (data: models.PromoPaymentListProcessProps) => {
  const path = `promo-payment/list?invoiceGroupId=${data.invoiceGroupId}`;
  return apiMapping<models.PromoPaymentListSuccessProps>(
    'auth',
    path,
    'discount',
    'v1',
    'LIST',
  );
};
/** => promo payment detail */
const promoPaymentDetail = (data: models.DetailProcessProps) => {
  const path = `promo-payment/detail/${data.id}`;
  return apiMapping<models.PromoPaymentDetailSuccessProps>(
    'auth',
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** => promo general detail */
const promoGeneralDetail = (data: models.DetailProcessProps) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `banners/${data.id}`;
  return apiMappingMock<models.PromoGeneralDetailSuccessProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

/** === EXPORT FUNCTIONS === */
export const PromoApi = {
  promoPaymentList,
  promoPaymentDetail,
  promoGeneralDetail,
};
