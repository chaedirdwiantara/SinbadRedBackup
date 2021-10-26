/** === IMPORT PACKAGE HERE === */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Keyboard } from 'react-native';
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
/** => product detail action */
const useProductDetailAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.productDetailProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.productDetailReset());
    },
  };
};
/** => Add to Cart Modal */
/** => Modal Visibility */
const useModalVisibility = () => {
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  const toggleModalVisible = () => {
    setOrderModalVisible((prevVisible) => !prevVisible);
  };

  return { orderModalVisible, setOrderModalVisible, toggleModalVisible };
};
/** => Order Quantity */
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
/** => Keyboard Listener */
const useKeyboardListener = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const showKeyboard = () => setKeyboardVisible(true);
  const hideKeyboard = () => setKeyboardVisible(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      showKeyboard,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      hideKeyboard,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return { keyboardVisible };
};
/** === EXPORT === */
export {
  useProductListAction,
  useProductDetailAction,
  useTabCategory,
  useTag,
  useModalVisibility,
  useOrderQuantity,
  useKeyboardListener,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: aliisetia
 * updatedDate: 14-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
