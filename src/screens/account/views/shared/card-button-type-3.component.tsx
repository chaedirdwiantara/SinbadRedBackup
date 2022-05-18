import { renderIF } from '@screen/auth/functions';
import { color, SnbIcon, SnbText2 } from '@sinbad/react-native-sinbad-ui';
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
          <SnbText2.Body.Large>{title}</SnbText2.Body.Large>
          <View style={{ marginVertical: 4 }} />
          <SnbText2.Paragraph.Small>{desc}</SnbText2.Paragraph.Small>
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
            <View style={{ marginHorizontal: 8 }} />
            <View style={{ flex: 1 }}>
              <SnbText2.Paragraph.Small color={color.blue50}>
                Registrasi Selesai
              </SnbText2.Paragraph.Small>
            </View>
          </View>
        </>,
      )}
    </TouchableOpacity>
  );
};

export default SnbCardButtonType3;
