/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbSvgIcon } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
/** === IMPORT STYLE HERE === */
import IntroStyle from '../styles/intro.style';
/** === COMPONENT === */
const SplashView: FC = () => {
  /** === HOOK === */
  useEffect(() => {
    setTimeout(() => {
      NavigationAction.resetToHome();
    }, 1000);
  }, []);
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

export default SplashView;
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
