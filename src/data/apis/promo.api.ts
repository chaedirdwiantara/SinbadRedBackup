/** === IMPORT EXTERNAL FUNCTION === */
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';
/** === FUNCTION === */
/** => promo payment list */
const promoPaymentList = (data) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `promo-payment/list?orderParcelId=${data.orderParcelId}`;
  return apiMappingMock<models.PromoPaymentListSuccessProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'LIST',
  );
};
/** => promo payment detail */
const promoPaymentDetail = (data: models.DetailProcessProps) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `promo-payment/detail/${data.id}`;
  return apiMappingMock<models.PromoPaymentDetailSuccessProps>(
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
};
