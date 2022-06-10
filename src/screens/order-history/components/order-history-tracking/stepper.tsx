import { toLocalDateTime } from '@core/functions/global/date-format';
import {
  color,
  colorV2,
  SnbText,
  SnbText2,
} from '@sinbad/react-native-sinbad-ui';
import Svg from '@svg';
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

type StepperProps = {
  label: string;
  timeStamp?: string;
  icon?: 'packed' | 'shiped' | 'delivered' | 'done_order';
  status: 'waiting' | 'process' | 'done';
  isEnd?: boolean;
};

const Stepper = (props: StepperProps) => {
  const { label, icon, status, timeStamp, isEnd } = props;
  //circle style config
  const selectStatusCircle = useMemo(
    () => ({
      done: styles.circleDone,
      process: styles.circleProcess,
      waiting: styles.circleWaiting,
    }),
    [],
  );
  const styleCircle = useMemo(
    () => StyleSheet.flatten([styles.circle, selectStatusCircle[status]]),
    [status],
  );
  // line style config
  const selectStatusLine = useMemo(
    () => ({
      done: styles.lineDone,
      process: styles.lineProcess,
      waiting: styles.lineProcess,
    }),
    [],
  );
  const styleLine = useMemo(
    () => StyleSheet.flatten([styles.line, selectStatusLine[status]]),
    [status],
  );
  // tracking desc style config
  const styleTracking = useMemo(
    () =>
      StyleSheet.flatten([
        styles.tracking,
        status !== 'done' && styles.trackingWaiting,
      ]),
    [status],
  );
  return (
    <View style={styles.main}>
      <View style={styles.indicator}>
        <View style={styleCircle} />
        {!isEnd && <View style={styleLine} />}
      </View>
      <View>
        <View style={styleTracking}>
          {icon && (
            <View style={styles.icon}>
              <Svg size={24} name={icon} />
            </View>
          )}
          <View style={styles.status}>
            <SnbText2.Body.Small>{label}</SnbText2.Body.Small>
            {timeStamp && (
              <View style={styles.timestamp}>
                <SnbText2.Paragraph.Tiny color={colorV2.textColor.secondary}>
                  {toLocalDateTime(timeStamp)}
                </SnbText2.Paragraph.Tiny>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flexDirection: 'row', marginBottom: 4 },
  indicator: { alignItems: 'center', paddingTop: 4 },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 18,
    borderWidth: 2,
    marginBottom: 8,
  },
  circleDone: {
    backgroundColor: colorV2.strokeColor.primary,
    borderColor: colorV2.strokeColor.primary,
  },
  circleProcess: {
    borderColor: colorV2.strokeColor.primary,
    backgroundColor: color.red10,
  },
  circleWaiting: {
    backgroundColor: colorV2.bgColor.light,
    borderColor: colorV2.strokeColor.default,
  },
  line: {
    height: 30,
    width: 1,
    borderWidth: 1,
  },
  lineProcess: { borderColor: colorV2.strokeColor.default },
  lineDone: { borderColor: colorV2.strokeColor.primary },
  tracking: {
    flexDirection: 'row',
  },
  icon: { marginLeft: 16 },
  trackingWaiting: { opacity: 0.5 },
  status: { justifyContent: 'center', marginLeft: 8 },
  timestamp: { marginTop: 4 },
});

export default Stepper;
