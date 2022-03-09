/** === IMPORT INTERNAL === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE === */
export type ThankYouPagePaymentGuideListInitialProps = models.ListItemProps<
  models.PaymentGuideListItem[]
>;
/** === INITIAL STATE === */
export const thankYouPagePaymentGuideListInitialState: ThankYouPagePaymentGuideListInitialProps = {
  data: [],
  loading: true,
  error: null,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === REDUCER === */
export const thankYouPagePaymentGuideListReducer = simplifyReducer(
  thankYouPagePaymentGuideListInitialState,
  {
    /** => Process */
    [types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_PROCESS](
      state = thankYouPagePaymentGuideListInitialState,
      { payload }: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_SUCCESS](
      state = thankYouPagePaymentGuideListInitialState,
      { payload }: models.ListSuccessAction<models.PaymentGuideListItem[]>,
    ) {
      state.error = null;
      return {
        ...state,
        data: [...state.data, ...payload.data],
        loading: false,
        loadMore: false,
        refresh: false,
        total: payload.meta.total,
        skip: payload.meta.skip,
      };
    },
    /** => list failed */
    [types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_FAILED](
      state = thankYouPagePaymentGuideListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        loadMore: false,
        refresh: false,
        error: action.payload,
      };
    },
    /** => Reset */
    [types.THANK_YOU_PAGE_PAYMENT_GUIDE_LIST_RESET]() {
      return thankYouPagePaymentGuideListInitialState;
    },
  },
);
