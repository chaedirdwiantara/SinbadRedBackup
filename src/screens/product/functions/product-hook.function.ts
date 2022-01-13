/** === IMPORT PACKAGES === */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */
/** === Fetch Product Related === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
  queryOptions?: models.ProductListQueryOptions,
  subModule?: models.ProductSubModule,
) => {
  return Actions.productListProcess(
    contextDispatch,
    {
      loading,
      skip,
      limit,
      ...queryOptions,
    },
    subModule,
  );
};

const useProductListActions = (subModule?: models.ProductSubModule) => {
  const dispatch = useDispatch();
  const limit = 10;

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.ProductListQueryOptions,
    ) => {
      contextDispatch(Actions.productListReset());
      dispatch(
        callProcessAction(
          contextDispatch,
          true,
          0,
          limit,
          queryOptions,
          subModule,
        ),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.ProductListQueryOptions,
    ) => {
      contextDispatch(Actions.productListRefresh());
      dispatch(
        callProcessAction(
          contextDispatch,
          true,
          0,
          limit,
          queryOptions,
          subModule,
        ),
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
            subModule,
          ),
        );
      }
    },
    clearContents: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.productListClearContents());
    },
  };
};

const useProductDetailAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.productDetailProcess(contextDispatch, { id }));
    },
    refresh: (contextDispatch: (action: any) => any, id: string) => {
      contextDispatch(Actions.productDetailRefresh());
      dispatch(Actions.productDetailProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.productDetailReset(contextDispatch));
    },
  };
};

const useProductDetailCartAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.productDetailCartProcess(contextDispatch, { id }));
    },
    refresh: (contextDispatch: (action: any) => any, id: string) => {
      contextDispatch(Actions.productDetailCartRefresh());
      dispatch(Actions.productDetailCartProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.productDetailCartReset(contextDispatch));
    },
  };
};

const useAddToCart = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.AddToCartPayload,
    ) => {
      dispatch(Actions.addToCartProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.addToCartReset(contextDispatch));
    },
  };
};

const useAddToCartDetailActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.AddToCartPayload,
    ) => {
      dispatch(Actions.addToCartDetailProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.addToCartDetailReset(contextDispatch));
    },
  };
};

/** === Fetch Product Tag List Related === */
const useTagListActions = () => {
  const dispatch = useDispatch();

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.TagListQueryOptions,
    ) => {
      contextDispatch(Actions.tagListReset());
      dispatch(
        Actions.tagListProcess(contextDispatch, {
          loading: true,
          ...queryOptions,
        }),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.TagListQueryOptions,
    ) => {
      contextDispatch(Actions.tagListRefresh());
      dispatch(
        Actions.tagListProcess(contextDispatch, {
          loading: true,
          ...queryOptions,
        }),
      );
    },
  };
};

/** => reserve stock action */
const useReserveStockAction = () => {
  const dispatch = useDispatch();
  return {
    del: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.deleteReserveStockProcess(contextDispatch, { id }));
    },
    create: (
      contextDispatch: (action: any) => any,
      data: models.ReserveStockPayload,
    ) => {
      dispatch(Actions.createReserveStockProcess(contextDispatch, data));
    },
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.detailReserveStockProcess(contextDispatch, { id }));
    },
    resetPostGet: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.createReserveStockReset(contextDispatch));
      dispatch(Actions.detailReserveStockReset(contextDispatch));
    },
    resetDelete: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.deleteReserveStockReset(contextDispatch));
    },
  };
};

const useOrderQuantity = ({ minQty }: { minQty: number }) => {
  const [orderQty, setOrderQty] = useState(minQty);

  const onChangeQty = (value: number) => {
    setOrderQty(value);
  };

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

  return { orderQty, onChangeQty, increaseOrderQty, decreaseOrderQty };
};

const useStockValidationAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.StockValidationProcessProps,
    ) => {
      dispatch(Actions.stockValidationProcess(contextDispatch, data));
    },
    refresh: (
      contextDispatch: (action: any) => any,
      data: models.StockValidationProcessProps,
    ) => {
      contextDispatch(Actions.stockValidationRefresh());
      dispatch(Actions.stockValidationProcess(contextDispatch, data));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.stockValidationReset(contextDispatch));
    },
  };
};

const useStockValidationDetailAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.StockValidationProcessProps,
    ) => {
      dispatch(Actions.stockValidationDetailProcess(contextDispatch, data));
    },
    refresh: (
      contextDispatch: (action: any) => any,
      data: models.StockValidationProcessProps,
    ) => {
      contextDispatch(Actions.stockValidationDetailRefresh());
      dispatch(Actions.stockValidationDetailProcess(contextDispatch, data));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.stockValidationDetailReset(contextDispatch));
    },
  };
};

const useStockInformationAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.stockInformationProcess(contextDispatch, { id }));
    },
    refresh: (contextDispatch: (action: any) => any, id: string) => {
      contextDispatch(Actions.stockValidationDetailRefresh());
      dispatch(Actions.stockInformationProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.stockInformationReset(contextDispatch));
    },
  };
};

export {
  useProductListActions,
  useOrderQuantity,
  useProductDetailAction,
  useAddToCart,
  useTagListActions,
  useReserveStockAction,
  useStockValidationAction,
  useStockValidationDetailAction,
  useStockInformationAction,
  useProductDetailCartAction,
  useAddToCartDetailActions,
};
