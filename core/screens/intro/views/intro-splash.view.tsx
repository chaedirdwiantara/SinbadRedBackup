/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View } from 'react-native';
import {
  SnbContainer,
  SnbProgress,
  color,
} from 'react-native-sinbad-ui';
import Svg from '@svg';
import LinearGradient from 'react-native-linear-gradient';
/** === IMPORT EXTERNAL FUNCTION === */
// import { usePageAfterIntro } from '../functions';
import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth } from '@core/redux/Data';
import { NavigationAction } from '@navigation';
import { useOTP } from '@screen/auth/functions';
/** === IMPORT STYLE HERE === */
import IntroStyle from '../styles/intro.style';
/** === COMPONENT === */
const IntroSplashView: React.FC = () => {
  const { meV2 } = useDataAuth();
  const { getLocationPermissions } = useOTP();
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
      if (!meV2.data && !meV2.loading && meV2.error) {
        NavigationAction.resetToIntroSinbad();
      } else {
        if (meV2.data?.data?.isBuyerCategoryCompleted === true && !meV2.error) {
          NavigationAction.resetToHome();
        }
        if (
          meV2.data?.data?.isBuyerCategoryCompleted === false &&
          !meV2.error
        ) {
          getLocationPermissions();
        }
      }
    }, 2000);
  }, [meV2.data, meV2.loading, meV2.error]);
  /** === VIEW === */
  /** => main */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#870100', '#d43238']}
          style={{
            paddingLeft: 10,
            paddingVertical: 5,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 2,
            flex: 1,
          }}>
          <View style={IntroStyle.sinbadLogo}>
            <Svg name={'white_sinbad_logo'} size={100} />
            <View style={{ marginBottom: -50 }}>
              <Svg name={'splash_highlight_text'} size={200} />
            </View>
            <Svg name={'sinbad_onboard'} size={240} />
          </View>
          <View style={{ marginBottom: 16 }}>
            <SnbProgress color={color.white} size={50} />
          </View>
        </LinearGradient>
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
