/** === IMPORT PACKAGE HERE === */
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
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
/** === COMPONENT === */
const HomeView: FC = () => {
  /** === HOOK === */
  const { action, state } = HomeHookFunc.useHeaderChange();
  /** === FUNCTION FOR HOOK === */
  const changeHeader = (height: number) => {
    height > 100 ? action(true) : action(false);
  };
  /** === VIEW === */
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
