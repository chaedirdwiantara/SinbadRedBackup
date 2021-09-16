/** === IMPORT PACKAGE HERE === */
import { useState } from 'react';
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
  return Actions.productListProcess(contextDispatch, {
    loading,
    skip,
    limit,
  });
};
/** => set tab category */
const useTabCategory = () => {
  const categories = [
    'Tabs 1',
    'Tabs 2',
    'Tabs 3',
    'Tabs 4',
    'Tabs 5',
    'Tabs 6',
    'Tabs 7',
    'Tabs 8',
  ];
  const [activeTabs, setActiveTabs] = useState(0);
  return {
    changeTab: (nextTabs: number) => {
      setActiveTabs(nextTabs);
    },
    activeTabs,
    categories,
  };
};
/** => set tag */
const useTag = () => {
  const tags = [
    'Tag 1',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    'Tag 5',
    'Tag 6',
    'Tag 7',
    'Tag 8',
  ];
  return {
    selectTab: (items: string[]) => {
      console.log(items);
    },
    tags,
  };
};
/** => call list action */
const useProductListAction = () => {
  const dispatch = useDispatch();
  const limit = 10;
  return {
    list: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.productListReset());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    refresh: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.productListRefresh());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      list: models.ListItemProps<models.ProductList[]>,
    ) => {
      if (list.data.length < list.total) {
        contextDispatch(Actions.productListLoadMore());
        dispatch(callList(contextDispatch, false, list.skip + limit, limit));
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.productListReset());
    },
  };
};
/** === EXPORT === */
export { useProductListAction, useTabCategory, useTag };
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
