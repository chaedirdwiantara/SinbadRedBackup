import { NavigationAction } from '@navigation';
import { useState, useRef } from 'react';

export const goBack = () => {
  NavigationAction.back();
};

export const goToHistoryDetail = (section: string) => {
  NavigationAction.navigate('HistoryDetailView', { section });
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
    setTimer(() => timeDiff);
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
  const formatExpiredTime =
    transformExpiredTime >= 1 ? transformExpiredTime : 0;

  return formatExpiredTime;
};
