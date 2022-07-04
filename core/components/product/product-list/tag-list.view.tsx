import React, { FC, memo, useEffect, useMemo } from 'react';

import ProductTagList from '../list/ProductTagList';

import {
  // useBottomAction,
  // priceSortOptions,
  // useOrderModalVisibility,
  useProductTags,
  // usePriceRangeFilter,
} from '@core/functions/product';
import { useTagListActions } from '@screen/product/functions';
import { useTagContext } from 'src/data/contexts/product';
import { useProductListContext } from './function/product-list.function';

/** => INTERFACE */
type Props = {
  onFetch: (params: { tags: string[] }) => void;
};

const Main: FC<Props> = ({ onFetch }) => {
  const { trigerModal, state } = useProductListContext();
  const tagActions = useTagListActions();
  const { dispatchTag } = useTagContext();
  const { tags, selectedTags, handleTagPress } = useProductTags(
    (currentTags: Array<string>) => {
      // onFetch({ ...derivedQueryOptions, tags: currentTags });
      onFetch({ ...state.query, tags: currentTags });
    },
  );
  const keyword = useMemo(() => state.query.keyword, [state.query.keyword]);

  useEffect(() => {
    tagActions.fetch(dispatchTag, {
      // categoryId: selectedCategory?.id,
      keyword: keyword,
      // brandId: activeBrandId,
    });
  }, [keyword]);
  return (
    <ProductTagList
      tags={tags}
      onTagPress={handleTagPress}
      onFilterPress={() => trigerModal('filter', true)}
    />
  );
};

export const TagListView = memo(Main);
