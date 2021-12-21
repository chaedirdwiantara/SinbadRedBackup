import React, { FC, useEffect, useState, useRef } from 'react';
import { View, AppState } from 'react-native';
import { color, SnbText } from 'react-native-sinbad-ui';

import { formatTime, useTimer, calculateTime } from '../functions';
import { HistoryStyle } from '../styles';

interface CountDownTimerProps {
  expiredTime: string;
}

export const CountDownTimer: FC<CountDownTimerProps> = ({ expiredTime }) => {
  const appState = useRef(AppState.currentState);
  const [, setAppStateVisible] = useState(appState.current);
  const [timeDiff, setTimeDiff] = useState(0);
  const { timer, start, reset } = useTimer(timeDiff);
  const { hours, minutes, seconds } = formatTime(timer);

  const renderTimeBlock = (value: string) => (
    <View style={HistoryStyle.cardTimeBlock}>
      <SnbText.C1 color={color.white}>{value}</SnbText.C1>
    </View>
  );

  useEffect(() => {
    const expiredTimeData = calculateTime(expiredTime);
    setTimeDiff(expiredTimeData + 60);
  }, []);

  useEffect(() => {
    if (timeDiff > 0) {
      start(timeDiff);
    }

    return () => reset();
  }, [timeDiff]);

  useEffect(() => {
    if (timer <= 0) {
      reset();
    }
  }, [timer]);

  /** App State Listener */
  const subscription = (nextAppState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      reset();
      const expiredTimeData = calculateTime(expiredTime);
      setTimeDiff(expiredTimeData + 30);
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    AppState.addEventListener('change', subscription);

    return () => {
      AppState.removeEventListener('change', subscription);
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
      }}>
      <SnbText.C1 color={color.black60}>Waktu Bayar : </SnbText.C1>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {renderTimeBlock(hours)}
        <SnbText.C1 color={color.black60}> : </SnbText.C1>
        {renderTimeBlock(minutes)}
        <SnbText.C1 color={color.black60}> : </SnbText.C1>
        {renderTimeBlock(seconds)}
      </View>
    </View>
  );
};
