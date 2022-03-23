import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SnbText, color } from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

type Props = {
  doneAt: string;
};

const joinZero = (num: number | string) => (num < 10 ? `0${num}` : num);

type CounterProp = number | string | Date;
const counter = (time1: CounterProp, time2: CounterProp) => {
  const doneAt = new Date(time1).getTime();
  const timeNow = new Date(time2).getTime();
  // setup time
  const diff = doneAt - timeNow;
  const duration = moment.duration(diff, 'milliseconds');
  const seconds = duration.asSeconds();
  const ss = joinZero(duration.seconds());
  const hh = joinZero(duration.hours());
  const mm = joinZero(duration.minutes());

  if (Number(seconds) <= 0) return '00:00:00';
  return `${hh}:${mm}:${ss}`;
};

const ConfirmationTime: FC<Props> = (props) => {
  const ticking = useRef<any>();
  const doneAt = useRef(new Date(props.doneAt).getTime()).current;
  const [time, setTime] = useState(counter(doneAt, new Date()));

  const timeTicking = useCallback(() => {
    ticking.current = setInterval(() => {
      // setup time
      const timeNow = new Date().getTime();
      const seconds = moment
        .duration(doneAt - timeNow, 'milliseconds')
        .asSeconds();

      if (isNaN(seconds)) {
        setTime(counter(doneAt, new Date()));
        clearInterval(ticking.current);
        return void 0;
      }
      // if time is over, stop interval
      if (Number(seconds) <= 0) {
        clearInterval(ticking.current);
        setTime('00:00:00');
        return void 0;
      }

      setTime(counter(doneAt, new Date()));
    }, 1000);
  }, []);

  useEffect(() => {
    timeTicking();
    return () => {
      clearInterval(ticking.current);
    };
  }, []);

  return (
    <View style={styles.timer}>
      <SnbText.C1 color={color.yellow80}>
        Batas waktu konfirmasi:{' '}
        <SnbText.B4 color={color.yellow80}>{time}</SnbText.B4>
      </SnbText.C1>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    marginTop: 12,
    backgroundColor: color.yellow10,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default memo(ConfirmationTime);
