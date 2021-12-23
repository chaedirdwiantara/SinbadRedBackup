import { useState, useRef } from 'react';
import { NavigationAction } from '@navigation';
import { IHistoryDetailStatus } from '../views/history-detail/history-detail-status.view';
import { PermissionsAndroid } from 'react-native';

export const goBack = () => {
  NavigationAction.back();
};

export const goToHistoryDetail = (section: string, id: number) => {
  NavigationAction.navigate('HistoryDetailView', { section, id });
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

  const start = () => {
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
export const useRequestWritePermission = async () => {
  const [downloadProgress, setDownloadProgress] = useState(true);
  const [accessGranted, setAccess] = useState(false);
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Sinbad App Permission',
        message:
          'Sinbad App needs access to your file ' +
          'so you can download the invoice file.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setAccess(true);
    } else {
      // alert("Storage permission denied")
      setDownloadProgress(false);
    }
  } catch (err) {
    // console.warn(err);
    setDownloadProgress(false);
  }

  return { downloadProgress, accessGranted };
};
