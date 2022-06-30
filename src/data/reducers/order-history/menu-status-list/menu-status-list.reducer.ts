import simplifyReducer from "@core/redux/simplifyReducer";
import * as models from '@models';
import * as types from '@types';

export type ListMenuStatusProps = models.ListItemV3Props<Array<models.MenuStatusList>>;

/** === INITIAL STATE === */
export const listMenuStatusInitialState : ListMenuStatusProps = {
  data: [],
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  totalPage: 0,
  page:1,
  perPage: 10
}

/** === REDUCER === */
export const listMenuStatusReducer = simplifyReducer(listMenuStatusInitialState, {
  /** => Process */
  [types.MENU_STATUS_LIST_PROCESS](
    state = listMenuStatusInitialState
  ) {
    return {
      ...state,
      loading: true,
      error: null
    }
  },
  /** => Succeeded */
  [types.MENU_STATUS_LIST_SUCCESS](
    state = listMenuStatusInitialState,
    { payload }: models.ListSuccessV3Action<Array<models.MenuStatusList>>,
  ) {
    return {
      ... state,
      data: [...state.data, ...payload.data],
      loading: false,
      loadMore: false,
      refresh: false,
      error: null,
      totalPage: payload.meta.totalPage,
      page: payload.meta.page,
      perPage: payload.meta.perPage,
    }
  },
  /** => Failed */
  [types.MENU_STATUS_LIST_FAILED](
    state = listMenuStatusInitialState,
    { payload }: models.ListFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      loadMore: false,
      refresh: false,
      error: payload,
    };
  },

})