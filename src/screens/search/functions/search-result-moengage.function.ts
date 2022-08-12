import { useEffect } from 'react';
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useProductListContext } from '@core/components/product/product-list/function/product-list.util';
import { searchResultPageEventMoengage } from './search.function';

// hooks send moengage report every product list success get
export const useSearchResultEventPageMoengage = () => {
  const {
    stateProduct: {
      list: { data, error, loading },
    },
  } = useProductContext();
  const {
    state: {
      query: { keyword },
    },
  } = useProductListContext();

  useEffect(() => {
    if (!loading) {
      if (!error) {
        if (keyword) {
          const isKeywordFound = !!data.length;
          searchResultPageEventMoengage(keyword, isKeywordFound);
        }
      }
    }
  }, [loading, error, data, keyword]);
};
