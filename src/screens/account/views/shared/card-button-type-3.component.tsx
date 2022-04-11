import { renderIF } from '@screen/auth/functions';
import { color, SnbIcon, SnbText } from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  svgIcon: () => Element;
  onPress: () => void;
  title: string;
  desc: string;
  showBadge: boolean;
}

const SnbCardButtonType3: React.FC<Props> = ({
  svgIcon,
  onPress,
  title,
  desc,
  showBadge,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: color.black10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {svgIcon()}
        <View style={{ marginHorizontal: 8 }} />
        <View style={{ flex: 1 }}>
          <SnbText.H3>{title}</SnbText.H3>
          <View style={{ marginVertical: 4 }} />
          <SnbText.B1>{desc}</SnbText.B1>
        </View>
        <SnbIcon name="chevron_right" size={24} />
      </View>
      {renderIF(
        showBadge,
        <>
          <View style={{ marginVertical: 8 }} />
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: color.blue10,
              borderRadius: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SnbIcon
              name="assignment_complete"
              size={16}
              color={color.blue50}
            />
            <View style={{ marginHorizontal: 4 }} />
            <View style={{ flex: 1 }}>
              <SnbText.B3 color={color.blue50}>Registrasi Selesai</SnbText.B3>
            </View>
          </View>
        </>,
      )}
    </TouchableOpacity>
  );
};

export default SnbCardButtonType3;
