/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import HomeHeaderView from './home-header.view';
import { BannerHomeView } from '../../banner/views';
import { BrandHomeView } from '../../brand/views';
import { RecommendationHomeView } from '../../recommendation/views';
import { CategoryHomeView } from '../../category/views';
/** === IMPORT FUNCTION HERE === */
import { HomeHookFunc } from '../functions';
import { useAuthCoreAction } from '@core/functions/auth';
import { useGetTokenNotLogin } from '@core/functions/firebase/get-fcm.function';
import { setFlagByDeviceId } from '@core/functions/firebase/flag-rtdb.function';
/** === COMPONENT === */
const HomeView: React.FC = () => {
  /** === HOOK === */
  const { action, state } = HomeHookFunc.useHeaderChange();
  useGetTokenNotLogin();
  setFlagByDeviceId();
  const { me } = useAuthCoreAction();
  /** === FUNCTION FOR HOOK === */
  const changeHeader = (height: number) => {
    height > 100 ? action(true) : action(false);
  };
  /** === VIEW === */
  React.useEffect(() => {
    me();
  }, []);
  /** => header */
  const header = () => {
    return <HomeHeaderView headerChange={state} />;
  };
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
