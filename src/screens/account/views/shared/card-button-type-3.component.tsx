import { renderIF } from '@screen/auth/functions';
import {
  borderV2,
  colorV2,
  SnbIcon,
  SnbText2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
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
        padding: layout.spacing.lg,
        borderWidth: 1,
        borderRadius: borderV2.radius.md,
        borderColor: colorV2.neutral.cloud30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {svgIcon()}
        <View style={{ marginHorizontal: layout.spacing.lg }} />
        <View style={{ flex: 1 }}>
          <SnbText2.Body.Large>{title}</SnbText2.Body.Large>
          <View style={{ marginVertical: layout.spacing.xxsm }} />
          <SnbText2.Paragraph.Small>{desc}</SnbText2.Paragraph.Small>
        </View>
        <SnbIcon name="chevron_right" size={24} />
      </View>
      {renderIF(
        showBadge,
        <>
          <View style={{ marginVertical: layout.spacing.sm }} />
          <View
            style={{
              paddingVertical: layout.spacing.md,
              paddingHorizontal: layout.spacing.lg,
              backgroundColor: colorV2.bgColor.green,
              borderRadius: borderV2.radius.sm,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SnbIcon name="quest" size={16} color={colorV2.iconColor.green} />
            <View style={{ marginHorizontal: layout.spacing.xxsm }} />
            <View style={{ flex: 1 }}>
              <SnbText2.Paragraph.Small color={colorV2.textColor.success}>
                Selesai
              </SnbText2.Paragraph.Small>
            </View>
          </View>
        </>,
      )}
    </TouchableOpacity>
  );
};

export default SnbCardButtonType3;
