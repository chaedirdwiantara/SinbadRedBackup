/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT FUNCTION === */
import * as Actions from '@actions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === FUNCTIONS === */
/** === Fetch Quest Related === */
const callProcessAction = (
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
  const limit = 2;

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions: models.QuestListQueryOptions,
    ) => {
      contextDispatch(Actions.questListReset());
      dispatch(
        callProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions: models.QuestListQueryOptions,
    ) => {
      contextDispatch(Actions.questListRefresh());
      dispatch(
        callProcessAction(contextDispatch, true, 0, limit, queryOptions),
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
          callProcessAction(
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

export { useQuestListAction };
