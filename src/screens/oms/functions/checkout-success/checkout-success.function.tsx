import { Dispatch, SetStateAction } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const copyToClipboard = (
  data: number,
  message: string,
  setShowToast: Dispatch<SetStateAction<boolean>>,
  setToastMessage: Dispatch<SetStateAction<string>>,
) => {
  Clipboard.setString(data.toString());
  setToastMessage(message);
  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
  }, 3000);
};

export { copyToClipboard };
