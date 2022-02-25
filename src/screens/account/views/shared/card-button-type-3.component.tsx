import { color, SnbIcon, SnbText } from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  svgIcon: () => Element;
  onPress: () => void;
  title: string;
  desc: string;
}

const SnbCardButtonType3: React.FC<Props> = ({
  svgIcon,
  onPress,
  title,
  desc,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 16,
        borderRadius: 8,
        borderColor: color.black10,
      }}>
      {svgIcon()}
      <View style={{ marginHorizontal: 8 }} />
      <View style={{ flex: 1 }}>
        <SnbText.H3>{title}</SnbText.H3>
        <View style={{ marginVertical: 4 }} />
        <SnbText.B1>{desc}</SnbText.B1>
      </View>
      <SnbIcon name="chevron_right" size={24} />
    </TouchableOpacity>
  );
};

export default SnbCardButtonType3;
