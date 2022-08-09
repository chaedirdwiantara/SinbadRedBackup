/** === IMPORT PACKAGES === */
import React, {
  FC,
  useCallback,
  useContext,
  memo,
  useMemo,
  useState,
} from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/native';
/** === IMPORT FUNCTIONS === */
import {
  goBack,
  goToHome,
  goToShoppingCart,
  backToLogin,
} from '@core/functions/product';
import { ProductListContext } from '@core/components/product/product-list';
import { useDataAuth } from '@core/redux/Data';
import { useRecentSearch } from '@screen/search/functions';
/** === IMPORT TYPE === */
import { contexts } from '@contexts';
/** === TYPE === */
interface NavigationHeaderProps {
  onFetch: (params: { keyword: string }) => void;
}
type SearchProductRouteParams = {
  SearchProduct: {
    keyword: string;
  };
};

type SearchProductRouteProps = RouteProp<
  SearchProductRouteParams,
  'SearchProduct'
>;
/** === COMPONENT === */
const header: FC<NavigationHeaderProps> = (props) => {
  const { onFetch } = props;

  const {
    params: { keyword },
  } = useRoute<SearchProductRouteProps>();

  const [localKeyword, setLocalKeyword] = useState(keyword);

  const { stateCart } = useContext(contexts.CartContext);

  const { setState } = useContext(ProductListContext);

  const { me } = useDataAuth();

  const { addKeyword } = useRecentSearch();
  // memoize jumlah cart agar tidak rerender
  const cartCount = useMemo(
    () => stateCart.total.data?.totalProducts || 0,
    [stateCart.total.data?.totalProducts],
  );
  // validasi ketika tap cart icon
  const validateCartVisit = useCallback(() => {
    if (me.data === null) {
      backToLogin();
    } else {
      goToShoppingCart();
    }
  }, [me.data]);

  const onSearch = useCallback(() => {
    if (/^\s*$/.test(localKeyword)) {
      setLocalKeyword('');
      return void 0;
    }
    addKeyword(localKeyword);
    // onFetch({ ...derivedQueryOptions, keyword: localKeyword });
    onFetch({ keyword: localKeyword });
    setState((prev) => ({
      ...prev,
      query: { ...prev.query, keyword: localKeyword },
    }));
  }, [localKeyword, onFetch, setState]);

  return (
    <SnbTopNav2.Type8
      testID="pdp-list-header"
      backAction={goBack}
      color="white"
      onClearText={() => setLocalKeyword('')}
      placeholder="Cari di Sinbad"
      inputValue={localKeyword}
      onEnter={onSearch}
      onChangeText={(text) => setLocalKeyword(text)}
      icon2Name="home"
      icon2Action={goToHome}
      icon1Value={cartCount}
      icon1Name="cart"
      icon1Action={validateCartVisit}
    />
  );
};

export const Header = memo(header);
