/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import HomeHeaderView from './home-header.view';
import { BannerHomeView } from '../../banner/views';
import { BrandHomeView } from '../../brand/views';
import { RecommendationHomeView } from '../../recommendation/views';
import { CategoryHomeView } from '../../category/views';
/** === IMPORT FUNCTION HERE === */
import { useHeaderChange, useRefresh } from '../functions';
import { useGetTokenNotLogin } from '@core/functions/firebase/get-fcm.function';
import { setFlagByDeviceId } from '@core/functions/firebase/flag-rtdb.function';
import { useCartTotalProductActions } from '@screen/oms/functions';
import { useDataTotalProductCart, useDataAuth } from '@core/redux/Data';
import { useCheckoutMaster } from '@screen/oms/functions';
import { useNotificationTotalActions } from '@screen/notification/functions';
/** === COMPONENT === */
const HomeView: React.FC = ({ navigation }: any) => {
  /** === HOOK === */
  const { stateHeaderChange, actionHeaderChange } = useHeaderChange();
  const { stateRefresh, actionRefresh } = useRefresh();
  const { data } = useDataTotalProductCart();
  const { setCartId } = useCheckoutMaster();
  const cartTotalProductActions = useCartTotalProductActions();
  const notificationTotalActions = useNotificationTotalActions();
  const { me } = useDataAuth();
  useGetTokenNotLogin();
  setFlagByDeviceId();
  /** === FUNCTION FOR HOOK === */
  const changeHeader = (height: number) => {
    height > 100 ? actionHeaderChange(true) : actionHeaderChange(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (me.data !== null) {
        cartTotalProductActions.fetch();
        notificationTotalActions.fetch();
      }
    });

    return unsubscribe;
  }, [navigation]);

  /** => listen changes data cart id */
  React.useEffect(() => {
    if (data && data.cartId) {
      setCartId({ cartId: data.cartId });
    }
  }, [data.cartId]);
  /** => header */
  const header = () => {
    return <HomeHeaderView headerChange={stateHeaderChange} />;
  };
  /** => content item */
  const contentItem = () => {
    return (
      <>
        <BannerHomeView />
        <CategoryHomeView />
        <RecommendationHomeView />
        <BrandHomeView />
        <View style={{ paddingBottom: 100 }} />
      </>
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={stateRefresh}
            onRefresh={() => actionRefresh(true)}
          />
        }
        scrollEventThrottle={16}
        onScroll={(event) => changeHeader(event.nativeEvent.contentOffset.y)}
        showsVerticalScrollIndicator={false}>
        {contentItem()}
      </ScrollView>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default HomeView;

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
