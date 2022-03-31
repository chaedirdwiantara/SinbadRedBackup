import React, { FC, useEffect, useState, useRef } from 'react';
import { View, AppState } from 'react-native';
import { color, SnbText } from 'react-native-sinbad-ui';

import { formatTime, useTimer, calculateTime } from '../functions';
import { HistoryStyle } from '../styles';

interface CountDownTimerProps {
  expiredTime: string;
  type: 'small' | 'big' |'simple';
}

export const CountDownTimer: FC<CountDownTimerProps> = ({
  expiredTime,
  type,
}) => {
  const appState = useRef(AppState.currentState);
  const [, setAppStateVisible] = useState(appState.current);
  const [timeDiff, setTimeDiff] = useState(() => calculateTime(expiredTime));
  const { timer, start, reset } = useTimer(timeDiff);
  const { hours, minutes, seconds } = formatTime(timer);

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
      setTimeDiff(expiredTimeData);
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

  const renderTimeBlock = (value: string) => (
    <View style={HistoryStyle.cardTimeBlock}>
      <SnbText.C1 color={color.white}>{value}</SnbText.C1>
    </View>
  );

  const timerHistoryCard = () => (
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

  const timerCheckoutDone = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SnbText.H4>{hours} </SnbText.H4>
        <SnbText.B1> Jam:</SnbText.B1>
        <SnbText.H4> {minutes} </SnbText.H4>
        <SnbText.B1> Menit:</SnbText.B1>
        <SnbText.H4> {seconds} </SnbText.H4>
        <SnbText.B1>Detik</SnbText.B1>
      </View>
    </View>
  );
  const timerWaitingPaymentCard = () => (
    <View>
        <SnbText.B4 color={color.red50}>{`${hours} :${minutes} :${seconds}`}</SnbText.B4>
    </View>
  );

  const renderContent = () => {
    switch (type) {
      case 'small':
        return timerHistoryCard();
      case 'big':
        return timerCheckoutDone();
      case 'simple':
        return timerWaitingPaymentCard();
      default:
        return timerHistoryCard();
    }
  };

  return renderContent();
};
