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

const ConfirmationTime: FC<Props> = (props) => {
  const ticking = useRef<any>();
  const doneAt = useRef(new Date(props.doneAt).getTime()).current;
  const [time, setTime] = useState('-:-:-');

  const timeTicking = useCallback(() => {
    ticking.current = setInterval(() => {
      const timeNow = new Date().getTime();
      const diff = doneAt - timeNow;
      const duration = moment.duration(diff, 'milliseconds');
      const seconds = duration.asSeconds();
      const ss = joinZero(duration.seconds());
      const hh = joinZero(duration.hours());
      const mm = joinZero(duration.minutes());

      if (Number(seconds) <= 0) {
        clearInterval(ticking.current);
        setTime('00:00:00');
      } else {
        setTime(`${hh}:${mm}:${ss}`);
      }
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
