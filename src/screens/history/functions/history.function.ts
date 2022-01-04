import { useState, useRef } from 'react';
import { NavigationAction } from '@navigation';
import { IHistoryDetailStatus } from '@screen/history/views/history-detail/history-detail-status.view';

export const goBack = () => {
  NavigationAction.back();
};

export const goToHistoryDetail = (
  section: string,
  id: number,
  billingId: number,
) => {
  NavigationAction.navigate('HistoryDetailView', { section, id, billingId });
};

export const goToHistoryInvoice = (data: object) => {
  NavigationAction.navigate('HistoryInvoiceView', data);
};

export const goToHistoryDetailStatus = (data: IHistoryDetailStatus) => {
  NavigationAction.navigate('HistoryDetailStatusView', data);
};

export const formatTime = (timer: number) => {
  const seconds = `0${timer % 60}`.slice(-2);
  const minutesNumber = Math.floor(timer / 60);
  const minutes = `0${minutesNumber % 60}`.slice(-2);
  const hours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return { hours, minutes, seconds };
};

export const useTimer = (
  initialTime: number,
  type: 'forward' | 'backward' = 'backward',
) => {
  const [timer, setTimer] = useState(() => initialTime);
  const countRef = useRef<ReturnType<typeof setInterval>>();

  const start = (timeDiff: number) => {
    setTimer(timeDiff);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (type === 'backward') {
          return prevTimer - 1;
        } else {
          return prevTimer + 1;
        }
      });
    }, 1000);
  };

  const reset = () => {
    clearInterval(countRef.current as any);
    setTimer(0);
  };

  return { timer, start, reset };
};

export const calculateTime = (expiredTime: string) => {
  const transformExpiredTime = Math.floor(
    (new Date(expiredTime).getTime() - new Date().getTime()) / 1000,
  );

  return transformExpiredTime >= 1 ? transformExpiredTime : 0;
};

export const resetDateTime = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};
