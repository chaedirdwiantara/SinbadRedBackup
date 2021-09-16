import { navigate } from '@core/navigations/RootNavigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as Actions from '@actions';
import * as models from '@models';
import { useDispatch, useSelector } from 'react-redux';
import {
  REGISTER_STEP_2_VIEW,
  REGISTER_STEP_3_VIEW,
  REGISTER_STEP_4_VIEW,
  REGISTER_STEP_5_VIEW,
  REGISTER_STEP_6_VIEW,
  REGISTER_STEP_7_VIEW,
} from '../screens_name';

export const useCheckPhoneNoAvailability = () => {
  const dispatch = useDispatch();
  const { checkPhoneNoAvailability } = useSelector((state: any) => state.auth);
  return {
    checkPhone: (data: models.ICheckPhoneNoAvailabilityProcess) => {
      dispatch(Actions.checkPhoneNoAvailabilityProcess(data));
    },
    resetCheckPhone: () => {
      dispatch(Actions.resetCheckPhoneNoAvailability());
    },
    state: checkPhoneNoAvailability,
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
    navigate('CameraView', {
      setImage,
      focusPoints: [{ focusPointHeight: 0.32, focusPointWidth: 0.9 }],
      title: 'Ambil Foto KTP',
      subtitle: 'Posisikan KTP Anda tepat berada di dalam bingkai',
    });
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
    navigate('CameraView', {
      setImage,
      focusPoints: [
        { focusPointHeight: 0.32, focusPointWidth: 0.9, marginBottom: 24 },
        { focusPointHeight: 0.18, focusPointWidth: 0.6 },
      ],
      title: 'Ambil Foto Selfie dengan KTP',
      subtitle:
        'Posisikan Foto Selfie dan KTP Anda tepat berada di dalam bingkai',
    });
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
    navigate('CameraView', {
      setImage,
      title: 'Ambil Foto NPWP',
      subtitle: 'Posisikan NPWP Anda tepat berada di dalam bingkai',
      focusPoints: [{ focusPointHeight: 0.32, focusPointWidth: 0.9 }],
    });
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

export const useRegisterStep5 = () => {
  const navigation = useNavigation();
  const [type, setType] = React.useState('default');
  const [storeName, setStoreName] = React.useState('');
  const [numOfEmployees, setnumOfEmployees] = React.useState('');
  const [storeSize, setStoreSize] = React.useState('');
  const [topBrand, setTopBrand] = React.useState('');
  const [wantedBrand, setWantedBrand] = React.useState('');

  const selectNumOfEmployees = () => {
    navigate('ListAndSearchView', { setValue: setnumOfEmployees });
  };

  const gotoStep6 = () => {
    navigate(REGISTER_STEP_6_VIEW);
  };

  const handleOnChangeTextStoreName = (text: string) => {
    setType('default');
    setStoreName(text);
  };
  const handleOnChangeTextStoreSize = (text: string) => {
    setType('default');
    setStoreSize(text);
  };
  const handleOnChangeTextTopBrand = (text: string) => {
    setType('default');
    setTopBrand(text);
  };
  const handleOnChangeTextWantedBrand = (text: string) => {
    setType('default');
    setWantedBrand(text);
  };

  return {
    func: {
      gotoStep6,
      selectNumOfEmployees,
      setStoreName,
      setnumOfEmployees,
      setStoreSize,
      setTopBrand,
      setWantedBrand,
      setType,
      handleOnChangeTextStoreName,
      handleOnChangeTextStoreSize,
      handleOnChangeTextTopBrand,
      handleOnChangeTextWantedBrand,
    },
    state: {
      storeName,
      numOfEmployees,
      storeSize,
      topBrand,
      wantedBrand,
      type,
    },
    ...navigation,
  };
};

export const useRegisterStep6 = () => {
  const navigation = useNavigation();
  const [type, setType] = React.useState('default');
  const [storeAddress, setStoreAddress] = React.useState('');
  const [storeNoteAddress, setStoreNoteAddress] = React.useState('');
  const [storeVehicleAccessibility, setStoreVehicleAccessibility] =
    React.useState('');
  const [storeRoadCapacity, setStoreRoadCapacity] = React.useState('');

  const gotoStep7 = () => {
    navigate(REGISTER_STEP_7_VIEW);
  };

  const goToMaps = () => {
    navigate('MapsView');
  };

  const handleOnChangeTextStoreAddress = (text: string) => {
    setType('default');
    setStoreAddress(text);
  };
  const handleOnChangeTextStoreNoteAddress = (text: string) => {
    setType('default');
    setStoreNoteAddress(text);
  };
  const selectStoreVehicleAccessibility = () => {
    navigate('ListAndSearchView', { setValue: setStoreVehicleAccessibility });
  };
  const selectStoreRoadCapacity = () => {
    navigate('ListAndSearchView', { setValue: setStoreRoadCapacity });
  };

  return {
    func: {
      setType,
      handleOnChangeTextStoreAddress,
      handleOnChangeTextStoreNoteAddress,
      selectStoreRoadCapacity,
      selectStoreVehicleAccessibility,
      gotoStep7,
      setStoreAddress,
      setStoreNoteAddress,
      setStoreVehicleAccessibility,
      setStoreRoadCapacity,
      goToMaps,
    },
    state: {
      storeAddress,
      storeNoteAddress,
      storeVehicleAccessibility,
      storeRoadCapacity,
      type,
    },
    ...navigation,
  };
};

export const useRegisterStep7 = () => {
  const navigation = useNavigation();
  const [imageStore, setImage] = React.useState(null);

  const gotoCamera = () => {
    navigate('CameraView', {
      setImage,
      title: 'Ambil Foto Depan Toko',
      subtitle: 'Posisikan depan toko Anda tepat berada di dalam bingkai',
      focusPoints: [{ focusPointHeight: 0.4, focusPointWidth: 0.9 }],
    });
  };

  const handleFinalRegisterProcess = () => {};

  React.useEffect(() => {
    console.log(imageStore);
  }, [imageStore]);
  return {
    func: {
      setImage,
      handleFinalRegisterProcess,
      gotoCamera,
    },
    state: {
      imageStore,
    },
    ...navigation,
  };
};
