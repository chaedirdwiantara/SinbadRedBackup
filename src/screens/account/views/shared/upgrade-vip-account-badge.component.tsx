import { useNavigation } from '@react-navigation/native';
import {
  colorV2,
  SnbIcon,
  SnbText2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DATA_COMPLETENESS_INTRO_VIEW } from '@screen/account/functions/screens_name';
import { useSelector } from 'react-redux';

interface Props {
  getLayout: (result: any) => void;
}

const UpgradeVIPAccountBadge: React.FC<Props> = ({ getLayout }) => {
  const { navigate } = useNavigation();
  const { meV2 } = useSelector((state: any) => state.authCore);

  if (
    typeof meV2.data?.data?.isDataCompleted === 'boolean' &&
    meV2.data?.data?.isDataCompleted === false
  ) {
    return (
      <TouchableOpacity
        onLayout={(ev) => getLayout(ev.nativeEvent.layout)}
        activeOpacity={0.75}
        onPress={() => navigate(DATA_COMPLETENESS_INTRO_VIEW)}
        style={{
          backgroundColor: colorV2.bgColor.yellow,
          paddingHorizontal: layout.spacing.lg,
          paddingVertical: layout.spacing.md,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <SnbIcon name="info" size={22} color={colorV2.iconColor.yellow} />
        <View style={{ flex: 1, marginHorizontal: layout.spacing.lg }}>
          <SnbText2.Body.Small>Upgrade Account Sinbad</SnbText2.Body.Small>
          <View style={{ marginVertical: 2 }} />
          <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
            Dapatkan keuntungan lebih dalam berbelanja melalui akun VIP
          </SnbText2.Paragraph.Small>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <SnbIcon
            name="chevron_right"
            size={24}
            color={colorV2.iconColor.yellow}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

export default UpgradeVIPAccountBadge;
