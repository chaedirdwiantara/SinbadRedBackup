import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import { useContext, useState, useRef } from 'react';
import { contexts } from '@contexts';

const useModalThankYouPageOrderDetail = () => {
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  return {
    setOpen: (value: boolean) => {
      setOpen(value)
    },
    isOpen,
    data,
    setData: (value: any) => {
      setData(value);
      if (value !== null) {
        setOpen(true);
      } else {
        setOpen(false);
      }
      // setOpen(true)
    }
  }
}

const formatTime = (timer: number) => {
  const seconds = `0${timer % 60}`.slice(-2);
  const minutesNumber = Math.floor(timer / 60);
  const minutes = `0${minutesNumber % 60}`.slice(-2);
  const hours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return { hours, minutes, seconds };
};

const useTimer = (
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

const calculateTime = (expiredTime: string) => {
  const transformExpiredTime = Math.floor(
    (new Date(expiredTime).getTime() - new Date().getTime()) / 1000,
  );

  return transformExpiredTime >= 1 ? transformExpiredTime : 0;
};

export {
  useModalThankYouPageOrderDetail,
  formatTime,
  useTimer,
  calculateTime
}