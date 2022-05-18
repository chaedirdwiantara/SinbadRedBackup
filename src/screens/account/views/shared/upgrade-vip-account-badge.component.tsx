import { useNavigation } from '@react-navigation/native';
import { color, SnbIcon, SnbText2 } from '@sinbad/react-native-sinbad-ui';
import Svg from '@svg';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DATA_COMPLETENESS_INTRO_VIEW } from '@screen/account/functions/screens_name';
import { useSelector } from 'react-redux';

const UpgradeVIPAccountBadge: React.FC = () => {
  const { navigate } = useNavigation();
  const { meV2 } = useSelector((state: any) => state.authCore);

  if (
    typeof meV2.data?.data?.isDataCompleted === 'boolean' &&
    meV2.data?.data?.isDataCompleted === false
  ) {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigate(DATA_COMPLETENESS_INTRO_VIEW)}
        style={{
          backgroundColor: color.yellow10,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Svg name="info" size={22} />
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          <SnbText2.Body.Small>
            Daftar Anggota VIP Sinbad Sekarang!
          </SnbText2.Body.Small>
          <View style={{ marginVertical: 2 }} />
          <SnbText2.Paragraph.Small color={color.black60}>
            Belanja lebih hemat, diskon menarik dan berbagai manfaat lainnya
            menanti Anda.
          </SnbText2.Paragraph.Small>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <SnbIcon name="chevron_right" size={24} color={color.yellow50} />
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

export default UpgradeVIPAccountBadge;
