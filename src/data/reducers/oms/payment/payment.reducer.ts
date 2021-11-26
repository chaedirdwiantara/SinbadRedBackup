/** === IMPORT HERE === */
// import * as models from '@models';
import {
  paymentTypesListReducer,
  paymentTypesListInitialState,
} from './payment-types-list.reducer';
import {
  paymentChannelsListReducer,
  paymentChannelsListInitialState,
} from './payment-channels-list.reducer';
import {
  paymentTCCreateReducer,
  paymentTCCreateInitialState,
} from './payment-tc-create.reducer';
import {
  paymentTCDetailReducer,
  paymentTCDetailInitialState,
} from './payment-tc-detail.reducer';
import {
  paymentTermsAndConditionCreateInitialState,
  paymentTermsAndConditionCreateReducer,
} from './payment-terms-and-condition-create.reducer';
import {
  paymentLastChannelCreateReducer,
  paymentLastChannelCreateInitialState,
} from './payment-last-channel-create.reducer';
import {
  paymentLastChannelDetailReducer,
  paymentLastChannelDetailInitialState,
} from './payment-last-channel-detail.reducer';
/** === TYPE HERE === */

/** === INITIAL HERE === */
export const paymentInitialState = {
  paymentTypesList: paymentTypesListInitialState,
  paymentChannelsList: paymentChannelsListInitialState,
  paymentTermsAndConditionCreate: paymentTermsAndConditionCreateInitialState,
  paymentTCCreate: paymentTCCreateInitialState,
  paymentTCDetail: paymentTCDetailInitialState,
  paymentLastChannelCreate: paymentLastChannelCreateInitialState,
  paymentLastChannelDetail: paymentLastChannelDetailInitialState,
};

/** === EXPORT ALL HERE === */
export const paymentReducer = (
  {
    paymentTypesList,
    paymentChannelsList,
    paymentTermsAndConditionCreate,
    paymentTCCreate,
    paymentTCDetail,
    paymentLastChannelCreate,
    paymentLastChannelDetail,
  }: any,
  action: any,
) => ({
  paymentTypesList: paymentTypesListReducer(paymentTypesList, action),
  paymentChannelsList: paymentChannelsListReducer(paymentChannelsList, action),
  paymentTCCreate: paymentTCCreateReducer(paymentTCCreate, action),
  paymentTCDetail: paymentTCDetailReducer(paymentTCDetail, action),
  paymentTermsAndConditionCreate: paymentTermsAndConditionCreateReducer(
    paymentTermsAndConditionCreate,
    action,
  ),
  paymentLastChannelCreate: paymentLastChannelCreateReducer(
    paymentLastChannelCreate,
    action,
  ),
  paymentLastChannelDetail: paymentLastChannelDetailReducer(
    paymentLastChannelDetail,
    action,
  ),
});
