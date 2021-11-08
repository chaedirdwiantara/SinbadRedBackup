/** === IMPORT PACKAGE HERE === */
// import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** === call fetch === */
const callList = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
  search?: string,
) => {
  return Actions.bannerListProcess(contextDispatch, {
    loading,
    skip,
    limit,
    search,
  });
};
/** => banner action */
const useBannerAction = () => {
  const dispatch = useDispatch();
  const limit = 4;
  return {
    /** => list */
    list: (contextDispatch: (action: any) => any, search?: string) => {
      contextDispatch(Actions.bannerListReset());
      dispatch(callList(contextDispatch, true, 0, limit, search));
    },
    refresh: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.bannerListRefresh());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      list: models.ListItemProps<models.BannerListSuccessProps[]>,
    ) => {
      if (list.data.length < list.total) {
        contextDispatch(Actions.bannerListLoadMore());
        dispatch(callList(contextDispatch, false, list.skip + limit, limit));
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.bannerListReset());
    },
    /** => detail */
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.bannerDetailProcess(contextDispatch, { id }));
    },
    resetDetail: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.bannerDetailReset());
    },
  };
};
/** === EXPORT === */
export { useBannerAction };
