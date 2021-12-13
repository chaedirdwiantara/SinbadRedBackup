/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT FUNCTION === */
import * as Actions from '@actions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === FUNCTIONS === */
/** === Fetch Brand Related === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
  queryOptions?: models.BrandListQueryOptions,
) => {
  return Actions.brandListProcess(contextDispatch, {
    loading,
    skip,
    limit,
    ...queryOptions,
  });
};

const useBrandListAction = () => {
  const dispatch = useDispatch();
  const limit = 10;

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.BrandListQueryOptions,
    ) => {
      contextDispatch(Actions.brandListReset());
      dispatch(
        callProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.BrandListQueryOptions,
    ) => {
      contextDispatch(Actions.brandListRefresh());
      dispatch(
        callProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      list: models.ListItemProps<models.BrandListItem[]>,
      queryOptions?: models.BrandListQueryOptions,
    ) => {
      if (list.data.length < list.total) {
        contextDispatch(Actions.brandListLoadMore());
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
      contextDispatch(Actions.brandListReset());
    },
  };
};

export { useBrandListAction };
