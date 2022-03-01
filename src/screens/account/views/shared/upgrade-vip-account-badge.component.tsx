import { useNavigation } from '@react-navigation/native';
import { color, SnbIcon, SnbText } from '@sinbad/react-native-sinbad-ui';
import Svg from '@svg';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DATA_COMPLETENESS_INTRO_VIEW } from '@screen/account/functions/screens_name';

const UpgradeVIPAccountBadge: React.FC = () => {
  const { navigate } = useNavigation();
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
        alignItems: 'center',
      }}>
      <Svg name="info" size={40} />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <SnbText.H4>Daftar Anggota VIP Sinbad Sekarang!</SnbText.H4>
        <View style={{ marginVertical: 2 }} />
        <SnbText.B1 color={color.black60}>
          Belanja lebih hemat, diskon menarik dan berbagai manfaat lainnya
          menanti Anda.
        </SnbText.B1>
      </View>
      <SnbIcon name="chevron_right" size={24} color={color.yellow50} />
    </TouchableOpacity>
  );
};

export default UpgradeVIPAccountBadge;
