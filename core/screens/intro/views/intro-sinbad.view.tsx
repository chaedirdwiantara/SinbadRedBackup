/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbContainer, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION === */
import { goToHome, useSetIntroSinbad } from '../functions';
/** === IMPORT STYLE HERE === */
import IntroStyle from '../styles/intro.style';
/** === COMPONENT === */
const IntroSinbadView: React.FC = () => {
  /** === HOOK === */
  const { setIntroSinbad } = useSetIntroSinbad();
  /** === EFFECT === */
  /** === VIEW === */
  /** => main */
  return (
    <SnbContainer color="white">
      <TouchableOpacity
        onPress={() => {
          setIntroSinbad(true);
          goToHome();
        }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SnbText.B1>Intro Sinbad</SnbText.B1>
      </TouchableOpacity>
    </SnbContainer>
  );
};

export default IntroSinbadView;
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
