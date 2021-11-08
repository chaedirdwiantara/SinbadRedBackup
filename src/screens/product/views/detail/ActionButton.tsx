/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbButton } from 'react-native-sinbad-ui';
/** === TYPE ===  */
interface ActionButtonProps {
  title: string;
  disabled: boolean;
  onPress: () => void;
}
/** === COMPONENT ===  */
export const ActionButton: FC<ActionButtonProps> = ({
  title,
  disabled,
  onPress,
}) => (
  <View style={{ height: 80 }}>
    <SnbButton.Single
      type="primary"
      disabled={disabled}
      title={title}
      onPress={onPress}
    />
  </View>
);
