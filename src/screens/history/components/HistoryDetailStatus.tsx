/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { SnbText, SnbIcon, color, styles } from 'react-native-sinbad-ui';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '../styles';
/** === TYPES === */
interface HistoryDetailStatusProps {
  status: string;
  description: string;
  onPress: () => void;
}
/** === COMPONENTS === */
export const HistoryDetailStatus: FC<HistoryDetailStatusProps> = ({
  status,
  description,
  onPress,
}) => {
  return (
    <View style={HistoryDetailStyle.statusContainer}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[HistoryDetailStyle.statusContent, styles.shadowForBox10]}>
          <View>
            <SnbText.B4>Status: {status}</SnbText.B4>
            <View style={{ marginTop: 8 }}>
              <SnbText.B3>{description}</SnbText.B3>
            </View>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <SnbIcon name="chevron_right" color={color.black100} size={24} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
