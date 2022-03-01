import React, { FC } from 'react';
import { SnbText, color as colors } from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface StepperProps {
  complete: number;
  marker?: Array<string>;
  total: number;
  onPress: () => void;
}

const Stepper: FC<StepperProps> = (props) => {
  return (
    <View style={{ margin: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', width: '85%' }}>
          <View style={[styles.progressBackground, { width: '100%' }]} />
          <View
            style={[
              styles.progress,
              { width: `${(props.complete / props.total) * 100}%` },
            ]}
          />
        </View>
        <TouchableOpacity
          style={{ marginHorizontal: 16 }}
          onPress={props.onPress}>
          <SnbText.C2 color={colors.blue60}>Lihat</SnbText.C2>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <SnbText.C2
          color={
            colors.black60
          }>{`${props.complete} dari ${props.total} tahap selesai`}</SnbText.C2>
      </View>
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
