/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbButton } from 'react-native-sinbad-ui';
/** === TYPE ===  */
interface ActionButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  loading: boolean;
}
/** === COMPONENT ===  */
export const ActionButton: FC<ActionButtonProps> = ({
  title,
  disabled = false,
  onPress,
  loading,
}) => (
  <View style={{ height: 80 }}>
    <SnbButton.Single
      loading={loading}
      type="primary"
      disabled={disabled}
      title={title}
      onPress={onPress}
    />
  </View>
);
