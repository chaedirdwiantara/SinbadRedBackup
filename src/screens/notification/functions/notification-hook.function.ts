/** === IMPORT PACKAGE HERE === */
// import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { useDataTotalNotification } from '@core/redux/Data';
/** === FUNCTION === */
/** === call fetch === */
const callList = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
) => {
  return Actions.notificationListProcess(contextDispatch, {
    loading,
    skip,
    limit,
  });
};
/** => notification action */
export const useNotificationAction = () => {
  const dispatch = useDispatch();
  const limit = 10;
  return {
    list: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.notificationListReset());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    refresh: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.notificationListRefresh());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      list: models.ListItemProps<models.NotificationListSuccessProps[]>,
    ) => {
      if (list.data.length < list.total) {
        contextDispatch(Actions.notificationListLoadMore());
        dispatch(callList(contextDispatch, false, list.skip + limit, limit));
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.notificationListReset());
    },
  };
};

export const useNotificationTotalActions = () => {
  const totalNotification: models.NotificationTotalSuccess =
    useDataTotalNotification().data;
  const dispatch = useDispatch();
  return {
    totalNotification: totalNotification,
    fetch: () => {
      dispatch(Actions.notificationTotalProcess());
    },
    reset: () => {
      dispatch(Actions.notificationTotalReset());
    },
  };
};
