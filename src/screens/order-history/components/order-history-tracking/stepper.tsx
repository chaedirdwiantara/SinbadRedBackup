import { toLocalDateTime } from '@core/functions/global/date-format';
import { color, SnbText } from '@sinbad/react-native-sinbad-ui';
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
            <SnbText.B2>{label}</SnbText.B2>
            {timeStamp && (
              <View style={styles.timestamp}>
                <SnbText.C1 color={color.black60}>
                  {toLocalDateTime(timeStamp)}
                </SnbText.C1>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flexDirection: 'row', marginBottom: 6 },
  indicator: { alignItems: 'center' },
  circle: {
    height: 18,
    width: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 2,
  },
  circleDone: {
    backgroundColor: color.red50,
    borderColor: color.red50,
  },
  circleProcess: {
    borderColor: color.red50,
    backgroundColor: color.red10,
  },
  circleWaiting: {
    backgroundColor: color.black10,
    borderColor: color.black40,
  },
  line: {
    height: 30,
    width: 1,
    borderWidth: 1,
  },
  lineProcess: { borderColor: color.black40 },
  lineDone: { borderColor: color.red50 },
  tracking: {
    flexDirection: 'row',
  },
  icon: { marginLeft: 16 },
  trackingWaiting: { opacity: 0.5 },
  status: { justifyContent: 'center', marginLeft: 16 },
  timestamp: { marginTop: 4 },
});

export default Stepper;
