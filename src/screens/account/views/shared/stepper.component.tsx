import React, { FC } from 'react';
import {
  SnbText2,
  color as colors,
  SnbButton2,
} from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet } from 'react-native';

interface StepperProps {
  complete: number;
  marker?: Array<string>;
  total: number;
  onPress: () => void;
}

const Stepper: FC<StepperProps> = (props) => {
  return (
    <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.progressBackground, { width: '100%' }]} />
          <View
            style={[
              styles.progress,
              { width: `${(props.complete / props.total) * 100}%` },
            ]}
          />
        </View>
        <View style={{ marginVertical: 2 }} />
        <SnbText2.Caption.Small
          color={
            colors.black60
          }>{`${props.complete} dari ${props.total} tahap selesai`}</SnbText2.Caption.Small>
      </View>
      <View style={{ marginHorizontal: 10 }} />
      <SnbButton2.Link title="Lihat" size="tiny" onPress={props.onPress} />
    </View>
  );
};

/** === STYLES === */
const styles = StyleSheet.create({
  progress: {
    height: 8,
    borderRadius: 40,
    backgroundColor: colors.red50,
  },
  progressBackground: {
    height: 8,
    borderRadius: 40,
    backgroundColor: colors.black10,
    position: 'absolute',
  },
});

export default Stepper;
