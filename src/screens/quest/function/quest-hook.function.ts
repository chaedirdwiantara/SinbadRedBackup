import React from 'react';
/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT FUNCTION === */
import * as Actions from '@actions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === FUNCTIONS === */
/** === Fetch Quest Related === */
const callListProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
  queryOptions: models.QuestListQueryOptions,
) => {
  return Actions.questListProcess(contextDispatch, {
    loading,
    skip,
    limit,
    ...queryOptions,
  });
};

const useQuestListAction = () => {
  const dispatch = useDispatch();
  const limit = 20;

  return {
    /** => LIST */
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions: models.QuestListQueryOptions,
    ) => {
      contextDispatch(Actions.questListReset());
      dispatch(
        callListProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions: models.QuestListQueryOptions,
    ) => {
      contextDispatch(Actions.questListRefresh());
      dispatch(
        callListProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      list: models.ListItemProps<models.QuestListItem[]>,
      queryOptions: models.QuestListQueryOptions,
    ) => {
      if (list.data.length < list.total) {
        contextDispatch(Actions.questListLoadMore());
        dispatch(
          callListProcessAction(
            contextDispatch,
            false,
            list.skip + limit,
            limit,
            queryOptions,
          ),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.questListReset());
    },
  };
};

const callDetailProcessAction = (
  contextDispatch: (action: any) => any,
  queryOptions: models.QuestDetailProcessProps,
) => {
  return Actions.questDetailProcess(contextDispatch, {
    ...queryOptions,
  });
};

const useQuestDetailAction = () => {
  const dispatch = useDispatch();

  return {
    /** => DETAIL */
    detail: (
      contextDispatch: (action: any) => any,
      queryOptions: models.QuestDetailProcessProps,
    ) => {
      dispatch(callDetailProcessAction(contextDispatch, queryOptions));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.questDetailReset());
    },
  };
};

const callTaskDetailProcessAction = (
  contextDispatch: (action: any) => any,
  queryOptions: models.QuestDetailProcessProps,
) => {
  return Actions.questTaskDetailProcess(contextDispatch, {
    ...queryOptions,
  });
};

const useQuestTaskAction = () => {
  const dispatch = useDispatch();

  return {
    /** TASK */
    update: (
      contextDispatch: (action: any) => any,
      data: models.UpdateProcessProps<{}>,
    ) => {
      dispatch(Actions.questTaskProcess(contextDispatch, data));
    },
    resetTask: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.questTaskReset());
    },
    detailTask: (
      contextDispatch: (action: any) => any,
      queryOptions: models.QuestDetailProcessProps,
    ) => {
      dispatch(callTaskDetailProcessAction(contextDispatch, queryOptions));
    },
  };
};

const useQuestVoucherAction = () => {
  const dispatch = useDispatch();

  return {
    /** VOUCHER */
    validateVoucher: (
      contextDispatch: (action: any) => any,
      queryOptions: models.QuestValidateVoucherProcessProps,
    ) => {
      dispatch(
        Actions.questTaskValidateVoucherProcess(contextDispatch, queryOptions),
      );
    },
    resetVoucher: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.questTaskValidateVoucherReset());
    },
    submitVoucher: (
      contextDispatch: (action: any) => any,
      data: models.UpdateProcessProps<{}>,
    ) => {
      dispatch(Actions.questTaskSubmitVoucherProcess(contextDispatch, data));
    },
    resetSubmitVoucher: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.questTaskSubmitVoucherReset());
    },
  };
};

export const useErrorModalState = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
  };
};

export { useQuestListAction, useQuestDetailAction, useQuestTaskAction };
