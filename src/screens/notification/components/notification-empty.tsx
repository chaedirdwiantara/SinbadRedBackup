import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SnbText2, colorV2, spacingV2 } from '@sinbad/react-native-sinbad-ui';
import { ImagesSinbad } from '../../../assets/images/sinbad_image';

// constant
const { textColor } = colorV2;
const { spacing } = spacingV2;

const NotificationEmpty = () => {
  return (
    <View style={styles.container}>
      <Image source={ImagesSinbad.notification} width={240} height={240} />
      <View style={styles.title}>
        <SnbText2.Headline.Default>
          Belum ada Notifikasi
        </SnbText2.Headline.Default>
      </View>
      <View>
        <SnbText2.Paragraph.Default color={textColor.secondary}>
          Tunggu info terbaru Sinbad, ya!
        </SnbText2.Paragraph.Default>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { marginTop: spacing.xl, marginBottom: spacing.xxsm },
});

export default NotificationEmpty;
