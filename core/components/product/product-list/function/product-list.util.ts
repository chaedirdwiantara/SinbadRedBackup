import { useCallback, useContext } from 'react';
import { ProductListContext } from '../product-list.context';

import type * as models from '@models';

const useProductListContext = () => {
  const { state, setState, orderQty, onChangeQty } =
    useContext(ProductListContext);

  const trigerModal = useCallback(
    (
      type:
        | 'sort'
        | 'filter'
        | 'addToCart'
        | 'needLogin'
        | 'errorStock'
        | 'errorProduct'
        | 'errorAddToCart',
      status: boolean,
    ) => {
      setState((prev) => {
        const value = { ...prev };
        value.modal[type] = status;
        return value;
      });
    },
    [],
  );

  const setSearch = useCallback((keyword: string | undefined) => {
    setState((prev) => {
      const value = { ...prev };
      value.query.keyword = keyword;
      return value;
    });
  }, []);

  const setQuery = useCallback((payload: models.ProductListQueryOptions) => {
    setState((prev) => {
      const value = { ...prev };
      const query = { ...prev.query, ...payload };
      value.query = query;
      return value;
    });
  }, []);

  const setCategory = useCallback(
    (
      payload?:
        | models.CategoryLevel
        | models.CategoryLevel2
        | models.CategoryLevel3,
    ) => {
      setState((prev) => {
        const value = { ...prev };
        const category = payload;
        value.query.categoryId = category?.id;
        value.category = category;

        return value;
      });
    },
    [],
  );

  const onChangeLayout = useCallback((layout: 'list' | 'grid') => {
    setState((prev) => {
      const value = { ...prev };
      value.layout = layout;
      return value;
    });
  }, []);

  const setSelectProduct = useCallback((id: string) => {
    setState((prev) => {
      const value = { ...prev };
      value.productSelected = id;
      return value;
    });
  }, []);

  return {
    state,
    orderQty,
    onChangeQty,
    trigerModal,
    setSearch,
    onChangeLayout,
    setQuery,
    setCategory,
    setSelectProduct,
  };
};

export { useProductListContext };
