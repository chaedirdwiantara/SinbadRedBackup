/** === IMPORT PACKAGE HERE === */
import React, { FC, useEffect } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { SnbContainer, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import HomeHeaderView from './home-header.view';
import { BannerHomeView } from '../../banner/views';
import { BrandHomeView } from '../../brand/views';
import { RecommendationHomeView } from '../../recommendation/views';
import { CategoryHomeView } from '../../category/views';
import { ExampleHomeView } from '../../example/views';
import { Example2HomeView } from '../../example2/views';
/** === IMPORT FUNCTION HERE === */
import { HomeHookFunc } from '../functions';
import { useGetTokenNotLogin } from '@core/functions/firebase/get-fcm.function';
import messaging from '@react-native-firebase/messaging';
import { NavigationAction } from '@core/functions/navigation';
/** === COMPONENT === */
const HomeView: FC = () => {
  /** === HOOK === */
  const { action, state } = HomeHookFunc.useHeaderChange();
  useGetTokenNotLogin();
  /** === FUNCTION FOR HOOK === */
  const changeHeader = (height: number) => {
    height > 100 ? action(true) : action(false);
  };
  /** => effect */
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(JSON.stringify(remoteMessage));
    });
    // Unmount FCM if done
    return unsubscribe;
  }, []);
  /** === VIEW === */
  /** => voyager home view */
  const VoyagerHomeView = () => {
    return (
      <View
        style={{
          height: 300,
          backgroundColor: 'brown',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => NavigationAction.navigate('BannerListView')}>
        <SnbText.B1>Navigate to Banner List (layout only)</SnbText.B1>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationAction.navigate('PromoDetailView')}>
          <SnbText.B1>Navigate to Promo (layout only)</SnbText.B1>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationAction.navigate('PromoPaymentListView')}>
          <SnbText.B1>Navigate to Promo Payment (mock)</SnbText.B1>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationAction.navigate('VoucherCartListView')}>
          <SnbText.B1>Navigate to Voucher Cart (mock)</SnbText.B1>
        </TouchableOpacity>
      </View>
    );
  };
  /** => header */
  const header = () => {
    return <HomeHeaderView headerChange={state} />;
  };
  const contentItem = () => {
    return (
      <>
        <BannerHomeView />
        <VoyagerHomeView />
        <CategoryHomeView />
        <RecommendationHomeView />
        <BrandHomeView />
        <ExampleHomeView />
        <Example2HomeView />
      </>
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView
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
