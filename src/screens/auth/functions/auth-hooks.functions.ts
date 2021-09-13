import { useEffect, useState } from 'react';

export const useInputPhone = () => {
  const [value, setValue] = useState('');
  const [valMsgError, setValueMsgError] = useState('');
  const [type, setType] = useState('default');

  useEffect(() => {
    const numberCountIsValid = /^[0-9]{10,14}$/.test(value);
    const numberFormatIsValid = /^08[0-9]$/.test(value) && value.length > 1;

    if (value && !numberFormatIsValid && value[1] !== '8') {
      setType('error');
      setValueMsgError('No. HP harus diawali dengan 08');
    } else if (value && !numberCountIsValid) {
      setType('error');
      setValueMsgError('No. HP harus 10-14 digit');
    }
  }, [value]);

  const onChangeText = (text: string) => {
    setType('default');
    text = text.replace(/[^0-9]/g, '');
    setValue(text);
  };

  const clearText = () => {
    setValue('');
    setValueMsgError('');
    setType('default');
  };

  return {
    value,
    type,
    onChangeText,
    valMsgError,
    clearText,
    maxLength: 16,
  };
};
