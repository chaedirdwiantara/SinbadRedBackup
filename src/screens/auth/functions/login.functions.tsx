import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { LOGIN_OTP_VIEW } from '../screens_name';

const useLogin: any = () => {
  const navigation = useNavigation();
  const [type, setType] = React.useState('default');
  const [loading, setLoading] = React.useState(false);
  // STATE FOR LOGIN WITH PHONE
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  // STATE FOR LOGIN WITH ID
  const [storeID, setStoreID] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorID, setErrorID] = React.useState('');
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  React.useEffect(() => {
    const numberCountIsValid = /^[0-9]{10,14}$/.test(phone);
    const numberFormatIsValid = /^08[0-9]$/.test(phone) && phone.length > 1;

    if (phone && !numberFormatIsValid && phone[1] !== '8') {
      setType('error');
      setPhoneError('No. HP harus diawali dengan 08');
    } else if (phone && !numberCountIsValid) {
      setType('error');
      setPhoneError('No. HP harus 10-14 digit');
    } else {
      reinitializeState();
    }
  }, [phone]);

  React.useEffect(() => {
    setType('default');
    setErrorID('');
  }, [storeID, password]);

  const reinitializeState = () => {
    setType('default');
    setPhoneError('');
    setErrorID('');
  };

  const handleOnChangeTextPhone = (text: string) => {
    setType('default');
    text = text.replace(/[^0-9]/g, '');
    setPhone(text);
  };

  const handleOnChangeTextID = (text: string) => setStoreID(text);
  const handleOnChangeTextPassword = (text: string) => setPassword(text);
  const toggleVisibilityPassword = () => setVisiblePassword(!visiblePassword);

  const handleLoginPhoneProcess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reinitializeState();
      setPhone('');
      navigation.navigate(LOGIN_OTP_VIEW);
    }, 1000);
  };

  const handleLoginIDProcess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reinitializeState();
      // setStoreID('');
      // setPassword('');
      setType('error');
      setErrorID('ID Toko atau Password salah');
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home' }],
      // });
    }, 1000);
  };

  return {
    func: {
      handleOnChangeTextPhone,
      handleOnChangeTextID,
      handleOnChangeTextPassword,
      handleLoginPhoneProcess,
      handleLoginIDProcess,
      toggleVisibilityPassword,
      reinitializeState,
      setPhone,
      setType,
      setPhoneError,
      setPassword,
      setStoreID,
      setErrorID,
      setVisiblePassword,
    },
    state: {
      phone,
      type,
      phoneError,
      loading,
      storeID,
      password,
      errorID,
      visiblePassword,
    },
    ...navigation,
  };
};

export default useLogin;
