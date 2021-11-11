/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbSvgIcon } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION === */
import { usePageAfterIntro } from '../functions';
/** === IMPORT STYLE HERE === */
import IntroStyle from '../styles/intro.style';
/** === COMPONENT === */
const IntroSplashView: React.FC = () => {
  /** === HOOK === */
  usePageAfterIntro();
  /** === EFFECT === */
  /** === VIEW === */
  /** => main */
  return (
    <SnbContainer color="white">
      <View style={IntroStyle.sinbadLogo}>
        <SnbSvgIcon name="sinbad" size={140} />
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
