import React, {
  createContext,
  Dispatch,
  FC,
  memo,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

/** => Types */
import type * as models from '@models';

/**Interface */
type Props = {
  children: ReactNode;
};

type PropValue = {
  modal: {
    sort: boolean;
    filter: boolean;
    addToCart: boolean;
    needLogin: boolean;
    errorStock: boolean;
    errorProduct: boolean;
  };
  layout: 'grid' | 'list';
  productSelected: string;
  query: models.ProductListQueryOptions;
  category?:
    | models.CategoryLevel
    | models.CategoryLevel2
    | models.CategoryLevel3;
};

type PropContext = {
  state: PropValue;
  setState: Dispatch<SetStateAction<PropValue>>;
};
/** => Initial Variable */
const defaultValue: PropValue = {
  modal: {
    sort: false,
    filter: false,
    addToCart: false,
    needLogin: false,
    errorStock: false,
    errorProduct: false,
  },
  productSelected: '',
  layout: 'grid',
  query: {
    brandId: undefined,
    sellerId: undefined,
    keyword: undefined,
    categoryId: undefined,
    sort: undefined,
    sortBy: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    tags: [],
  },
  category: undefined,
};
/** Context */
export const ProductListContext = createContext<PropContext>({
  state: defaultValue,
  setState: () => {},
});

const Provider: FC<Props> = ({ children }) => {
  const [state, setState] = useState(defaultValue);
  return (
    <ProductListContext.Provider value={{ state, setState }}>
      {children}
    </ProductListContext.Provider>
  );
};

export const ProductListProvider = memo(Provider);
