import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardListener = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const showKeyboard = () => setKeyboardVisible(true);
  const hideKeyboard = () => setKeyboardVisible(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      showKeyboard,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      hideKeyboard,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return { keyboardVisible };
};
