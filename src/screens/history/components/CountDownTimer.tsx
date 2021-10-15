import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { color, SnbText } from 'react-native-sinbad-ui';

import { formatTime, useTimer } from '@screen/history/functions';
import { HistoryStyle } from '@screen/history/styles';

interface CountDownTimerProps {
  timeInSeconds: number;
}

export const CountDownTimer: FC<CountDownTimerProps> = ({ timeInSeconds }) => {
  const { timer, start, reset } = useTimer(timeInSeconds);
  const { hours, minutes, seconds } = formatTime(timer);

  const renderTimeBlock = (value: string) => (
    <View style={HistoryStyle.cardTimeBlock}>
      <SnbText.C1 color={color.white}>{value}</SnbText.C1>
    </View>
  );

  useEffect(() => {
    start();

    return () => reset();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      reset();
    }
  }, [timer]);

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
