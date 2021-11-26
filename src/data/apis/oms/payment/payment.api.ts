/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';
/** === FUNCTION === */
/** => payment types list */
const paymentTypesList = (data: models.IPaymentTypeProcessProps) => {
  const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = `types?invoiceGroupId=${data.invoiceGroupId}&totalCartParcel=${data.totalCartParcel}&page=${data.page}`;
  return apiMappingMock<models.IPaymentTypesList[]>(
    mockHost,
    path,
    'payment',
    'v1',
    'LIST',
  );
};
/** ==> payment channels list */
const paymentChannelsList = (data: models.IPaymentChannelProcessProps) => {
  const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = `channels?invoiceGroupId=${data.invoiceGroupId}&paymentTypeId=${data.paymentTypeId}&totalCartParcel=${data.totalCartParcel}`;
  return apiMappingMock<models.IPaymentChannelsList[]>(
    mockHost,
    path,
    'payment',
    'v1',
    'LIST',
  );
};

/** ==> post terms and condition */
const postTermsAndCondition = (data: {}) => {
  // const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = 'terms-conditions';
  return apiMapping('auth', path, 'payment', 'v1', 'CREATE', data);
};

/** => payment terms and condition create */
const paymentTCCreate = (data: {}) => {
  // const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = 'terms-conditions';
  return apiMapping('auth', path, 'payment', 'v1', 'CREATE', data);
};

/** =>  payment terms and condition detail */
const paymentTCDetail = (data: models.DetailProcessProps) => {
  // const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = `data/${data.id}`;
  return apiMapping<models.IPaymentTermsAndConditionDetailProps>(
    'auth',
    path,
    'payment',
    'v1',
    'DETAIL',
  );
};
/** => payment last payment channel create */
const paymentLastChannelCreate = (data: {}) => {
  // const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = 'last-channels';
  return apiMapping('auth', path, 'payment', 'v1', 'CREATE', data);
};

/** =>  payment last payment channel detail */
const paymentLastChannelDetail = (data: models.DetailProcessProps) => {
  const mockHost = 'https://e83f8833-2b3c-4ebe-8fbb-e0d4b8e30b81.mock.pstmn.io';
  const path = `data/${data.id}`;
  return apiMappingMock<models.IPaymentTermsAndConditionDetailProps>(
    mockHost,
    path,
    'payment',
    'v1',
    'DETAIL',
  );
};
/** === EXPORT FUNCTIONS === */
export const PaymentApi = {
  paymentTypesList,
  paymentChannelsList,
  postTermsAndCondition,
  paymentTCCreate,
  paymentTCDetail,
  paymentLastChannelCreate,
  paymentLastChannelDetail,
};
