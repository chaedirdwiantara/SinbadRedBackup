import { Dispatch, SetStateAction } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const copyToClipboard = (
  data: number,
  message: string,
  setShowToast: () => void,
  setToastMessage: Dispatch<SetStateAction<string>>,
) => {
  Clipboard.setString(data.toString());
  setToastMessage(message);
  setShowToast();
};

export { copyToClipboard };
