/** === IMPORT PACKAGE HERE === */
// import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { useDataTotalNotification } from '@core/redux/Data';
import React, { useCallback } from 'react';
import { navigate, goToMenu } from '@core/navigations/RootNavigation';
/** === FUNCTION === */
/** === call fetch === */
const callList = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  page: number,
  perPage: number,
) => {
  return Actions.notificationListProcess(contextDispatch, {
    loading,
    page,
    perPage,
  });
};

const perPage = 10;
const page = 1;
/** => notification action */
export const useNotificationAction = () => {
  const { stateNotification, dispatchNotification } = React.useContext(
    contexts.NotificationContext,
  );
  const dispatch = useDispatch();

  const onFetch = useCallback(() => {
    dispatchNotification(Actions.notificationListReset());
    dispatch(callList(dispatchNotification, true, page, perPage));
  }, [dispatchNotification]);

  const onLoadMore = useCallback(() => {
    const state = stateNotification.list;
    if (state.page < state.totalPage) {
      dispatchNotification(Actions.notificationListLoadMore());
      dispatch(
        callList(dispatchNotification, false, state.page + 1, state.perPage),
      );
    }
  }, [stateNotification.list, dispatchNotification]);

  const onRefresh = useCallback(() => {
    dispatchNotification(Actions.notificationListRefresh());
    dispatch(callList(dispatchNotification, true, page, perPage));
  }, [dispatchNotification, dispatch]);

  const onReset = useCallback(() => {
    dispatchNotification(Actions.notificationListReset());
  }, [dispatchNotification]);

  const navigateToPages = useCallback(
    (data: models.NotificationListSuccessProps) => {
      if (data.screen) {
        switch (data.screen) {
          case 'HistoryListView':
            goToMenu(data.screen, data.data);
            break;
          case 'UserView':
            goToMenu(data.screen, data.data);
            break;
          default:
            navigate(data?.screen, data.data);
            break;
        }
      }
    },
    [],
  );

  const onMarkRead = useCallback(
    (data: models.NotificationListSuccessProps) => {
      navigateToPages(data);
      // cant dispatch if has read
      if (data.isRead) return void 0;
      dispatch(
        Actions.notificationMarkReadProcess(dispatchNotification, { data }),
      );
    },
    [],
  );

  return {
    onFetch,
    onRefresh,
    onLoadMore,
    onReset,
    onMarkRead,
    stateNotification,
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
