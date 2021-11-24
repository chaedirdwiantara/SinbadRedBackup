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
/** => potential promo product */
const potentialPromoProduct = (data: models.DetailProcessProps) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `potential-promo-product/${data.id}`;
  return apiMappingMock<models.PotentialPromoProductProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'LIST',
  );
};
/** => delete reserve discount */
const deleteReserveDiscount = (data: models.DeleteProcessProps) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `reserve-discount/${data.id}`;
  return apiMappingMock<models.DeleteSuccessProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'DELETE',
  );
};
/** => create reserve discount */
const createReserveDiscount = (
  data: models.CreateProcessProps<models.ReserveDiscountPostPayload>,
) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = 'reserve-discount';
  return apiMappingMock<models.CreateSuccessProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};
/** => reserve discount detail */
const reserveDiscountDetail = (data: models.DetailProcessProps) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `reserved-discount/${data.id}`;
  return apiMappingMock<models.ReserveDiscountDetail>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** => check promo payment */
const checkPromoPayment = (data: models.CheckPromoPaymentGetPayload) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  let arrPaymentChannelId = '';
  data.paymentChannelId.map((item, index) => {
    if (index === 0) {
      arrPaymentChannelId = `${item}`;
    } else {
      arrPaymentChannelId = `${arrPaymentChannelId},${item}`;
    }
  });
  const path = `check-promo-payment?paymentTypeId=${data.paymentTypeId}&paymentChannelId=${arrPaymentChannelId}&parcelPrice=${data.parcelPrice}&invoiceGroupId=${data.invoiceGroupId}&sellerId=${data.sellerId}`;
  return apiMappingMock<models.CheckPromoPaymentGetData[]>(
    mockHost,
    path,
    'discount',
    'v1',
    'LIST',
  );
};
/** => create check all promo payment */
const createCheckAllPromoPayment = (
  data: models.CreateProcessProps<models.CheckAllPromoPaymentPostPayload[]>,
) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = 'check-all-promo-payment';
  return apiMappingMock<models.CreateSuccessProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};
/** => get check all promo payment */
const getCheckAllPromoPayment = (data: models.DetailProcessProps) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `check-all-promo-payment/${data.id}`;
  return apiMappingMock<models.CheckAllPromoPaymentGetData[]>(
    mockHost,
    path,
    'discount',
    'v1',
    'LIST',
  );
};

/** === EXPORT FUNCTIONS === */
export const PromoApi = {
  promoPaymentList,
  promoPaymentDetail,
  promoGeneralDetail,
  potentialPromoProduct,
  deleteReserveDiscount,
  createReserveDiscount,
  reserveDiscountDetail,
  checkPromoPayment,
  createCheckAllPromoPayment,
  getCheckAllPromoPayment,
};
