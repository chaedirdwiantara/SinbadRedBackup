import { navigate } from '@core/navigations/RootNavigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  REGISTER_OTP_VIEW,
  REGISTER_STEP_2_VIEW,
  REGISTER_STEP_3_VIEW,
  REGISTER_STEP_4_VIEW,
  REGISTER_STEP_5_VIEW,
} from '../screens_name';

export const useRegister: any = () => {
  const navigation = useNavigation();
  const [type, setType] = React.useState('default');
  const [loading, setLoading] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');

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

  const reinitializeState = () => {
    setType('default');
    setPhoneError('');
  };

  const handleOnChangeTextPhone = (text: string) => {
    setType('default');
    text = text.replace(/[^0-9]/g, '');
    setPhone(text);
  };

  const handleRegisterProcess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPhone('');
      setPhoneError('');
      navigation.navigate(REGISTER_OTP_VIEW);
    }, 1000);
  };

  return {
    func: {
      handleOnChangeTextPhone,
      reinitializeState,
      handleRegisterProcess,
      setType,
      setLoading,
      setPhone,
    },
    state: {
      type,
      loading,
      phoneError,
      phone,
    },
    ...navigation,
  };
};

export const useRegisterStep1: any = () => {
  const navigation = useNavigation();
  const [type, setType] = React.useState('default');
  const [name, setName] = React.useState('');
  const [idNumber, setIdNumber] = React.useState('');
  const [taxNumber, setTaxNumber] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleOnChangeTextName = (text: string) => {
    setType('default');
    setName(text);
  };

  const handleOnChangeTextIdNumber = (text: string) => {
    setType('default');
    setIdNumber(text);
  };

  const handleOnChangeTextTaxNumber = (text: string) => {
    setType('default');
    setTaxNumber(text);
  };

  const handleOnChangeTextEmail = (text: string) => {
    setType('default');
    setEmail(text);
  };

  const goToStep2 = () => {
    navigation.navigate(REGISTER_STEP_2_VIEW);
  };
  return {
    func: {
      handleOnChangeTextName,
      handleOnChangeTextIdNumber,
      handleOnChangeTextTaxNumber,
      handleOnChangeTextEmail,
      goToStep2,
      setType,
      setName,
      setIdNumber,
      setTaxNumber,
      setEmail,
    },
    state: {
      type,
      name,
      idNumber,
      taxNumber,
      email,
    },
    ...navigation,
  };
};

export const useRegisterStep2 = () => {
  const navigation = useNavigation();
  const [imageKTP, setImage] = React.useState(null);

  const gotoCamera = () => {
    navigate('CameraView', { setImage });
  };

  const gotoStep3 = () => {
    navigate(REGISTER_STEP_3_VIEW);
  };

  React.useEffect(() => {
    console.log(imageKTP);
  }, [imageKTP]);
  return {
    func: {
      setImage,
      gotoStep3,
      gotoCamera,
    },
    state: {
      imageKTP,
    },
    ...navigation,
  };
};

export const useRegisterStep3 = () => {
  const navigation = useNavigation();
  const [imageSelfieKTP, setImage] = React.useState(null);

  const gotoCamera = () => {
    navigate('CameraView', { setImage });
  };

  const gotoStep4 = () => {
    navigate(REGISTER_STEP_4_VIEW);
  };

  React.useEffect(() => {
    console.log(imageSelfieKTP);
  }, [imageSelfieKTP]);
  return {
    func: {
      setImage,
      gotoStep4,
      gotoCamera,
    },
    state: {
      imageSelfieKTP,
    },
    ...navigation,
  };
};

export const useRegisterStep4 = () => {
  const navigation = useNavigation();
  const [imageNPWP, setImage] = React.useState(null);

  const gotoCamera = () => {
    navigate('CameraView', { setImage });
  };

  const gotoStep5 = () => {
    navigate(REGISTER_STEP_5_VIEW);
  };

  React.useEffect(() => {
    console.log(imageNPWP);
  }, [imageNPWP]);
  return {
    func: {
      setImage,
      gotoStep5,
      gotoCamera,
    },
    state: {
      imageNPWP,
    },
    ...navigation,
  };
};
