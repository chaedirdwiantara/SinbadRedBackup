/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => collect data */
/** => call fetch */
const callList = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
) => {
  return Actions.exampleListProcess(contextDispatch, {
    loading,
    skip,
    limit,
  });
};
/** => call list action */
const useExampleListAction = () => {
  const dispatch = useDispatch();
  const limit = 10;
  return {
    list: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.exampleListReset());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    refresh: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.exampleListRefresh());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      list: models.ListItemProps<models.Example[]>,
    ) => {
      if (list.data.length < list.total) {
        contextDispatch(Actions.exampleListLoadMore());
        dispatch(callList(contextDispatch, false, list.skip + limit, limit));
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.exampleListReset());
    },
  };
};
/** => call detail action */
const useExampleDetailAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.exampleDetailProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.exampleDetailReset());
    },
  };
};
/** === EXPORT === */
export { useExampleListAction, useExampleDetailAction };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
