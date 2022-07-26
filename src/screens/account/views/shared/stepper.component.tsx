import React, { FC } from 'react';
import {
  SnbText2,
  colorV2 as colors,
  SnbButton2,
  spacingV2 as layout,
  borderV2,
  SnbProgress2,
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
        <SnbProgress2.Bar
          percentage={(props.complete / props.total) * 100}
          testID={props.testID}
        />
        <View style={{ marginTop: layout.spacing.xxsm }}>
          <SnbText2.Paragraph.Tiny
            testID={
              props.testID
            }>{`${props.complete} dari ${props.total} tahap selesai`}</SnbText2.Paragraph.Tiny>
        </View>
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
