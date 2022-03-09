/** === IMPORT PACKAGE HERE === */
import React, { useContext } from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
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
import { goToCheckout, useGetTotalCartAction } from '@screen/oms/functions';
import { useDataAuth } from '@core/redux/Data';
// import { useCheckoutMaster } from '@screen/oms/functions';
import { useNotificationTotalActions } from '@screen/notification/functions';
import BottomSheetError from '@core/components/BottomSheetError';
import PushNotification from '@core/components/PushNotification';
import { contexts } from '@contexts';
/** === COMPONENT === */
const HomeView: React.FC = ({ navigation }: any) => {
  /** === STATE === */
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const [modalError, setModalError] = React.useState(false);
  /** === HOOK === */
  const { stateHeaderChange, actionHeaderChange } = useHeaderChange();
  const { stateRefresh, actionRefresh } = useRefresh();
  // const { data } = useDataTotalProductCart();
  // const { setCartId } = useCheckoutMaster();
  const totalCartActions = useGetTotalCartAction();
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
        totalCartActions.fetch(dispatchCart);
        notificationTotalActions.fetch();
      }
    });

    return unsubscribe;
  }, [navigation, me.data]);

  React.useEffect(() => {
    if (me.data !== null) {
      totalCartActions.fetch(dispatchCart);
      notificationTotalActions.fetch();
    }
  }, [me.data]);

  /** => listen changes data cart id */
  // React.useEffect(() => {
  //   if (data && data.cartId) {
  //     // setCartId({ cartId: data.cartId });
  //   }
  // }, [data.cartId]);

  React.useEffect(() => {
    if (me.error !== null && me.error.code === undefined) {
      setModalError(true);
    }
  }, [me.error]);
  /** => header */
  const header = () => {
    return <HomeHeaderView headerChange={stateHeaderChange} />;
  };
  /** => content item */
  const contentItem = () => {
    return (
      <>
        <PushNotification />
        <BannerHomeView />
        <CategoryHomeView />
        <TouchableOpacity
          onPress={goToCheckout}
          style={{ padding: 10, backgroundColor: 'silver' }}>
          <Text>GO CHECKOUT</Text>
        </TouchableOpacity>
        <RecommendationHomeView navigationParent={navigation} />
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
  /** => modal error connection */
  const bottomSheetError = () => {
    return (
      <BottomSheetError
        open={modalError}
        error={me.error}
        retryAction={() => {
          actionRefresh(true);
          setModalError(false);
        }}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      {bottomSheetError()}
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
