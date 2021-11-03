/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */
/** === Fetch Brand Related === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
) => {
  return Actions.brandListProcess(contextDispatch, {
    loading,
    skip,
    limit,
  });
};

const useBrandListAction = () => {
  const dispatch = useDispatch();
  const limit = 10;

  return {
    fetch: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.brandListReset());
      dispatch(callProcessAction(contextDispatch, true, 0, limit));
    },
    refresh: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.brandListRefresh());
      dispatch(callProcessAction(contextDispatch, true, 0, limit));
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      list: models.ListItemProps<models.BrandListSuccessProps[]>,
    ) => {
      if (list.data.length < list.total) {
        contextDispatch(Actions.brandListLoadMore());
        dispatch(
          callProcessAction(contextDispatch, false, list.skip + limit, limit),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.brandListReset());
    },
  };
};

export { useBrandListAction };
