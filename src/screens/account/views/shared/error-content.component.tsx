import React from 'react';
import {
  SnbButton2,
  SnbText2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
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
        padding: layout.spacing.xl,
      }}>
      <Image
        source={require('@image/sinbad_image/failed_error.png')}
        style={{ height: 160, width: 160 }}
      />
      <View style={{ marginTop: layout.spacing.lg }}>
        <SnbText2.Body.Default>Terjadi Kesalahan</SnbText2.Body.Default>
      </View>
      <View style={{ marginVertical: layout.spacing.sm }}>
        <SnbText2.Paragraph.Small>{message}</SnbText2.Paragraph.Small>
      </View>
      <SnbButton2.Link
        title="Coba Lagi"
        size="small"
        onPress={action}
        iconName="refresh"
      />
    </View>
  );
};

export default ErrorContent;
