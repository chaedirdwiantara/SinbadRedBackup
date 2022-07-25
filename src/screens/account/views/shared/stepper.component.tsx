import React, { FC } from 'react';
import {
  SnbText2,
  colorV2 as colors,
  SnbButton2,
  spacingV2 as layout,
  borderV2,
} from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet } from 'react-native';

interface StepperProps {
  complete: number;
  marker?: Array<string>;
  total: number;
  onPress: () => void;
  testID?: string;
}

const Stepper: FC<StepperProps> = (props) => {
  return (
    <View
      style={{
        margin: layout.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{ flex: 1 }}>
        <View
          style={{ flexDirection: 'row', marginBottom: layout.spacing.xxsm }}>
          <View style={[styles.progressBackground, { width: '100%' }]} />
          <View
            style={[
              styles.progress,
              { width: `${(props.complete / props.total) * 100}%` },
            ]}
          />
        </View>
        <SnbText2.Paragraph.Tiny>{`${props.complete} dari ${props.total} tahap selesai`}</SnbText2.Paragraph.Tiny>
      </View>
      <View style={{ marginHorizontal: layout.spacing.sm }} />
      <SnbButton2.Link
        title="Lihat"
        size="tiny"
        onPress={props.onPress}
        testID={props.testID}
      />
    </View>
  );
};

/** === STYLES === */
const styles = StyleSheet.create({
  progress: {
    height: 8,
    borderRadius: borderV2.radius.full,
    backgroundColor: colors.btnPriColor.default,
  },
  progressBackground: {
    height: 8,
    borderRadius: borderV2.radius.full,
    backgroundColor: colors.btnSecColor.disable,
    position: 'absolute',
  },
});

export default Stepper;
