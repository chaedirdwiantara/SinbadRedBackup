/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbSvgIcon, SnbProgress } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION === */
// import { usePageAfterIntro } from '../functions';
import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth } from '@core/redux/Data';
import { NavigationAction } from '@navigation';
/** === IMPORT STYLE HERE === */
import IntroStyle from '../styles/intro.style';
/** === COMPONENT === */
const IntroSplashView: React.FC = () => {
  const { meV2 } = useDataAuth();
  /** === HOOK === */
  // usePageAfterIntro();
  const authCoreAction = useAuthCoreAction();
  /** === EFFECT === */
  /** => get auth me */
  React.useEffect(() => {
    authCoreAction.me();
    authCoreAction.meV2();
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      if (!meV2.data && !meV2.loading) {
        NavigationAction.resetToIntroSinbad();
      } else {
        NavigationAction.resetToHome();
        // if (meV2.data?.data?.isBuyerCategoryCompleted) {
        //   NavigationAction.resetToHome();
        // } else {
        //   console.log('disini');
        // }
      }
    }, 2000);
  }, [meV2.data, meV2.loading, meV2.error]);
  /** === VIEW === */
  /** => main */
  return (
    <SnbContainer color="white">
      <View style={IntroStyle.sinbadLogo}>
        <SnbSvgIcon name="sinbad" size={140} />
      </View>
      <View style={{ marginBottom: 16 }}>
        <SnbProgress size={50} />
      </View>
    </SnbContainer>
  );
};

export default IntroSplashView;
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
