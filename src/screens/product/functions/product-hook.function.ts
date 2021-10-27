/** === IMPORT PACKAGES === */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */
/** === Fetch Product List Related === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
  queryOptions?: models.ProductListQueryOptions,
) => {
  return Actions.productListProcess(contextDispatch, {
    loading,
    skip,
    limit,
    ...queryOptions,
  });
};

const useProductListActions = () => {
  const dispatch = useDispatch();
  const limit = 10;

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.ProductListQueryOptions,
    ) => {
      contextDispatch(Actions.productListReset());
      dispatch(
        callProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.ProductListQueryOptions,
    ) => {
      contextDispatch(Actions.productListRefresh());
      dispatch(
        callProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      paginationQueries: { skip: number; canLoadMore: boolean },
      queryOptions?: models.ProductListQueryOptions,
    ) => {
      if (paginationQueries.canLoadMore) {
        contextDispatch(Actions.productListLoadMore());
        dispatch(
          callProcessAction(
            contextDispatch,
            false,
            paginationQueries.skip + limit,
            limit,
            queryOptions,
          ),
        );
      }
    },
  };
};

/** === Add to Cart Modal Related === */
const useOrderModalVisibility = () => {
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  const toggleModalVisible = () => {
    setOrderModalVisible((prevVisible) => !prevVisible);
  };

  return { orderModalVisible, setOrderModalVisible, toggleModalVisible };
};

const useOrderQuantity = ({ minQty = 1 }: { minQty?: number }) => {
  const [orderQty, setOrderQty] = useState(minQty);

  const increaseOrderQty = () => {
    setOrderQty((prevQty) => prevQty + 1);
  };

  const decreaseOrderQty = () => {
    setOrderQty((prevQty) => {
      if (prevQty - 1 >= minQty) {
        return prevQty - 1;
      }

      return prevQty;
    });
  };

  return { orderQty, increaseOrderQty, decreaseOrderQty };
};

export { useProductListActions, useOrderModalVisibility, useOrderQuantity };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: aliisetia
 * updatedDate: 27-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
