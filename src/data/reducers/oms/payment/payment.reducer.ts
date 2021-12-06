/** === IMPORT HERE === */
// import * as models from '@models';
import {
  paymentTypesListReducer,
  paymentTypesListInitialState,
  PaymentTypesListInitialProps,
} from './payment-types-list.reducer';
import {
  paymentChannelsListReducer,
  paymentChannelsListInitialState,
  PaymentChannelsListInitialProps,
} from './payment-channels-list.reducer';
import {
  paymentTCCreateReducer,
  paymentTCCreateInitialState,
  PaymentTCCreateInitialProps,
} from './payment-tc-create.reducer';
import {
  paymentTCDetailReducer,
  paymentTCDetailInitialState,
  PaymentTCDetailInitialProps,
} from './payment-tc-detail.reducer';
import {
  paymentLastChannelCreateReducer,
  paymentLastChannelCreateInitialState,
  PaymentLastChannelCreateInitialProps,
} from './payment-last-channel-create.reducer';
import {
  paymentLastChannelDetailReducer,
  paymentLastChannelDetailInitialState,
  PaymentLastChannelDetailInitialProps,
} from './payment-last-channel-detail.reducer';
/** === TYPE HERE === */

/** === INITIAL HERE === */
export const paymentInitialState = {
  paymentTypesList: paymentTypesListInitialState,
  paymentChannelsList: paymentChannelsListInitialState,
  paymentTCCreate: paymentTCCreateInitialState,
  paymentTCDetail: paymentTCDetailInitialState,
  paymentLastChannelCreate: paymentLastChannelCreateInitialState,
  paymentLastChannelDetail: paymentLastChannelDetailInitialState,
};

export interface paymentInitialState {
  paymentTypesList: PaymentTypesListInitialProps;
  paymentChannelsList: PaymentChannelsListInitialProps;
  paymentTCCreate: PaymentTCCreateInitialProps;
  paymentTCDetail: PaymentTCDetailInitialProps;
  paymentLastChannelCreate: PaymentLastChannelCreateInitialProps;
  paymentLastChannelDetail: PaymentLastChannelDetailInitialProps;
}

/** === EXPORT ALL HERE === */
export const paymentReducer = (
  {
    paymentTypesList,
    paymentChannelsList,
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
  paymentLastChannelCreate: paymentLastChannelCreateReducer(
    paymentLastChannelCreate,
    action,
  ),
  paymentLastChannelDetail: paymentLastChannelDetailReducer(
    paymentLastChannelDetail,
    action,
  ),
});
