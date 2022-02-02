import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, SnbIconHint, color } from 'react-native-sinbad-ui';
import { QuestTaskCompleteStoreStyles } from '../styles';

interface Props {
  type: string;
  time: string;
  onPress: () => void;
}

const ButtonClock: FC<Props> = (props) => {
  /** === FUNCTION === */
  const { type, time, onPress } = props;
  /** === VIEW === */
  /** => render main view */
  return (
    <TouchableOpacity
      style={QuestTaskCompleteStoreStyles.button}
      onPress={onPress}>
      <View style={QuestTaskCompleteStoreStyles.buttonIcon}>
        <SnbIconHint
          iconName={type === 'open' ? 'schedule' : 'watch_later'}
          size={30}
          iconColor={color.black100}
          badgeColor={'red'}
        />
      </View>
      <View style={{ flex: 1 }}>
        <SnbText.B3>{type === 'open' ? 'Buka' : 'Tutup'}:</SnbText.B3>
        <SnbText.B3 color={color.black80}>{time}</SnbText.B3>
      </View>
      <View style={{ flex: 1 }}>
        <SnbText.B4 align="right">Ganti</SnbText.B4>
      </View>
      <View
        style={[
          QuestTaskCompleteStoreStyles.buttonIcon,
          QuestTaskCompleteStoreStyles.chevron,
        ]}>
        <SnbIconHint
          iconName="chevron_right"
          size={30}
          iconColor={color.black100}
          badgeColor={'red'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonClock;
