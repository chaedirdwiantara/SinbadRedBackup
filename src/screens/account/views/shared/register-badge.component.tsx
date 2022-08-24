import { useDataAuth } from '@core/redux/Data';
import { useNavigation } from '@react-navigation/native';
import { SELF_REGISTRATION_VIEW } from '@screen/auth/functions/screens_name';
import {
  colorV2,
  SnbButton2,
  SnbSvgIcon,
  SnbText2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { View } from 'react-native';

const RegisterBadge: React.FC = () => {
  const { navigate } = useNavigation();
  const { me } = useDataAuth();

  if (me.data === null && !me.loading) {
    return (
      <View
        style={{
          backgroundColor: colorV2.bgColor.light,
          padding: layout.spacing.md,
          marginHorizontal: layout.spacing.lg,
          marginVertical: layout.spacing.md,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <SnbSvgIcon name="sinbad" size={32} />
        <View style={{ flex: 1, marginHorizontal: layout.spacing.lg }}>
          <SnbText2.Body.Small>Mau Jualan Lebih Untung?</SnbText2.Body.Small>
          <SnbText2.Paragraph.Small>
            Daftar Sinbad sekarang
          </SnbText2.Paragraph.Small>
        </View>
        <SnbButton2.Primary
          title="Daftar"
          onPress={() => navigate(SELF_REGISTRATION_VIEW)}
          size="small"
        />
      </View>
    );
  }

  return null;
};

export default RegisterBadge;
