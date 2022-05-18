/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { color, SnbButton, SnbIcon } from 'react-native-sinbad-ui';
/** === TYPE ===  */
interface ActionButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  loading?: boolean;
  onOpenChat: () => void;
}
/** === COMPONENT ===  */
export const ActionButton: FC<ActionButtonProps> = ({
  title,
  disabled = false,
  onPress,
  loading,
  onOpenChat,
}) => (
  <View style={{ height: 80, flexDirection: 'row' }}>
    <View style={{ justifyContent: 'center', marginLeft: 16 }}>
      <TouchableOpacity
        onPress={onOpenChat}
        style={{
          borderWidth: 1,
          padding: 16,
          borderRadius: 4,
          borderColor: color.red50,
        }}>
        <SnbIcon name="chat" color={color.red50} size={20} />
      </TouchableOpacity>
    </View>
    <SnbButton.Single
      loading={loading}
      type="primary"
      disabled={disabled}
      title={title}
      onPress={onPress}
    />
  </View>
);
