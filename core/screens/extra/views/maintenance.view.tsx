/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View } from 'react-native';
import {
  SnbContainer,
  Content,
  SnbButton2,
  spacingV2,
} from '@sinbad/react-native-sinbad-ui';
import { NavigationAction } from '@core/functions/navigation';
/** === IMPORT EXTERNAL FUNCTION === */
/** === COMPONENT === */
const MaintenanceView: React.FC = () => {
  /** === HOOK === */
  /** === EFFECT === */
  /** => get auth me */
  React.useEffect(() => {}, []);
  /** === VIEW === */
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
      </View>
    );
  };
  /** => ilustration */
  const ilustration = () => {
    return (
      <View style={{ paddingVertical: spacingV2.spacing.xxl }}>
        <Content.Illustration
          image={require('@image/sinbad/app_update.png')}
          title="Sinbad Segera Kembali"
          description="Kami sedang melakukan sedikit perbaikan, silahkan kembali beberapa saat lagi."
          caption={
            <SnbButton2.Primary
              title="Restart Sinbad"
              outline={true}
              size="medium"
              onPress={() => NavigationAction.navigate('Splash')}
            />
          }
        />
      </View>
    );
  };
  /** => main */
  return <SnbContainer color="white">{content()}</SnbContainer>;
};

export default MaintenanceView;
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
