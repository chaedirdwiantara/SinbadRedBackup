import React from 'react';
import { SnbButton, SnbText } from '@sinbad/react-native-sinbad-ui';
import { Image, View } from 'react-native';

const ErrorContent: React.FC<{ action: () => void; message: string }> = ({
  action,
  message,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
      <Image
        source={require('@image/sinbad_image/failed_error.png')}
        style={{ height: 160, width: 160 }}
      />
      <View style={{ marginTop: 16 }}>
        <SnbText.B2>{message}</SnbText.B2>
      </View>
      <SnbButton.Dynamic
        type="tertiary"
        title="Coba Lagi"
        size="small"
        onPress={action}
      />
    </View>
  );
};

export default ErrorContent;
