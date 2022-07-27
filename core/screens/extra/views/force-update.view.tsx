/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View, Linking } from 'react-native';
import {
  SnbContainer,
  Content,
  SnbTopNav2,
  SnbButton2,
  spacingV2,
} from '@sinbad/react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION === */
/** === COMPONENT === */
const ForceUpdateView: React.FC = () => {
  /** === HOOK === */
  /** === EFFECT === */
  /** => get auth me */
  React.useEffect(() => {}, []);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return <SnbTopNav2.Type1 title="Pembaruan Aplikasi" color="white" />;
  };
  /** => content */
  const content = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: spacingV2.spacing.lg,
        }}>
        {ilustration()}
        {button()}
      </View>
    );
  };
  /** => button */
  const button = () => {
    return (
      <SnbButton2.Primary
        full
        title="Perbarui Sekarang"
        size="medium"
        onPress={() => Linking.openURL('market://details?id=sinbad.app')}
      />
    );
  };
  /** => ilustration */
  const ilustration = () => {
    return (
      <View style={{ paddingVertical: spacingV2.spacing.xxl }}>
        <Content.Illustration
          image={require('@image/sinbad/app_update.png')}
          title="Mohon Perbarui Aplikasi Anda"
          description="Demi kenyamanan Anda dalam bertransaksi, mohon segera perbarui aplikasi Anda"
        />
      </View>
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

export default ForceUpdateView;
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
