/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
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
/** => promo seller detail */
const promoSellerDetail = (data: models.DetailProcessProps) => {
  const path = `promo-seller-detail/${data.id}`;
  return apiMapping<models.PromoSellerDetailSuccessProps>(
    'auth',
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** => potential promo product */
const potentialPromoProduct = (data: models.DetailProcessProps) => {
  const path = `potential-promo-product/${data.id}`;
  return apiMapping<models.PotentialPromoProductProps>(
    'auth',
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** => delete reserve discount */
const deleteReserveDiscount = (data: models.DeleteProcessProps) => {
  const path = `reserved-discount/${data.id}`;
  return apiMapping<models.DeleteSuccessProps>(
    'auth',
    path,
    'discount',
    'v1',
    'DELETE',
  );
};
/** => create reserve discount */
const createReserveDiscount = (data: models.ReserveDiscountPostPayload) => {
  const path = 'reserved-discount';
  return apiMapping<models.CreateSuccessProps>(
    'auth',
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};
/** => reserve discount detail */
const reserveDiscountDetail = (data: models.DetailProcessProps) => {
  const path = `reserved-discount/${data.id}`;
  return apiMapping<models.ReserveDiscountDetail>(
    'auth',
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** => check promo payment */
const checkPromoPayment = (data: models.CheckPromoPaymentGetPayload) => {
  let arrPaymentChannelId = '';
  data.paymentChannelId.map((item, index) => {
    if (index === 0) {
      arrPaymentChannelId = `${item}`;
    } else {
      arrPaymentChannelId = `${arrPaymentChannelId},${item}`;
    }
  });
  const path = `check-promo-payment?paymentTypeId=${data.paymentTypeId}&paymentChannelId=${arrPaymentChannelId}&parcelPrice=${data.parcelPrice}&invoiceGroupId=${data.invoiceGroupId}`;
  return apiMapping<models.CheckPromoPaymentGetData[]>(
    'auth',
    path,
    'discount',
    'v1',
    'LIST',
  );
};
/** => create check all promo payment */
const createCheckAllPromoPayment = (
  data: models.CheckAllPromoPaymentPostPayload[],
) => {
  const path = 'check-all-promo-payment';
  return apiMapping<models.CreateSuccessProps>(
    'auth',
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};
/** => get check all promo payment */
const getCheckAllPromoPayment = (data: models.DetailProcessProps) => {
  const path = `check-all-promo-payment/${data.id}`;
  return apiMapping<models.CheckAllPromoPaymentGetData[]>(
    'auth',
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
  promoSellerDetail,
  potentialPromoProduct,
  deleteReserveDiscount,
  createReserveDiscount,
  reserveDiscountDetail,
  checkPromoPayment,
  createCheckAllPromoPayment,
  getCheckAllPromoPayment,
};
