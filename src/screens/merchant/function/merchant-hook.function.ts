import React, { useState } from 'react';
/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { navigate } from '@core/navigations/RootNavigation';
import { useNavigation } from '@react-navigation/native';
/** === FUNCTION === */
/** => collect data */
/** => call fetch */
const callList = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
) => {
  return Actions.supplierListProcess(contextDispatch, {
    loading,
    skip,
    limit,
  });
};
/** => call list action */
const useSupplierListAction = () => {
  const dispatch = useDispatch();
  const limit = 10;
  return {
    list: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.supplierListReset());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    refresh: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.supplierListRefresh());
      dispatch(callList(contextDispatch, true, 0, limit));
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      list: models.ListItemProps<models.SupplierList[]>,
    ) => {
      if (list.data.length < list.total) {
        contextDispatch(Actions.supplierListLoadMore());
        dispatch(callList(contextDispatch, false, list.skip + limit, limit));
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.supplierListReset());
    },
  };
};

const useRegisterStep4 = () => {
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

  React.useEffect(() => {
    console.log(imageNPWP);
  }, [imageNPWP]);
  return {
    func: {
      setImage,
      gotoCamera,
    },
    state: {
      imageNPWP,
    },
    ...navigation,
  };
};

/** => edit merchant */
const useEditMerchant = () => {
  const dispatch = useDispatch();
  return {
    editMerchant: (
      contextDispatch: (action: any) => any,
      data: models.UpdateProcessProps<{}>,
    ) => {
      dispatch(Actions.merchantEditProcess(contextDispatch, data));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.merchantEditReset());
    },
  };
};
/** => edit profile */
const useEditProfile = () => {
  const dispatch = useDispatch();
  return {
    editProfile: (
      contextDispatch: (action: any) => any,
      data: models.UpdateProcessProps<{}>,
    ) => {
      dispatch(Actions.profileEditProcess(contextDispatch, data));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.profileEditReset());
    },
  };
};
/** => number Of Employee List */
/** => call list action */
const useNumberOfEmployeeListAction = () => {
  const dispatch = useDispatch();
  return {
    numberOfEmployeeList: (
      contextDispatch: (action: any) => any,
      data: models.ListProcessProps,
    ) => {
      dispatch(Actions.numberOfEmployeeListProcess(contextDispatch, data));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.supplierListReset());
    },
  };
};
/** => useInput */
export const useInput = (initialState: string = '') => {
  const [value, setValue] = useState(initialState);
  const [valMsgError, setValMsgError] = useState('');
  const [type, setType] = useState('default');

  const onChangeText = (text: string) => {
    setType('default');
    setValue(text);
  };

  const clearText = () => {
    setValue('');
    setValMsgError('');
    setType('default');
  };

  const setMessageError = (message: string) => {
    setType('error');
    setValMsgError(message);
  };

  return {
    value,
    type,
    onChangeText,
    valMsgError,
    clearText,
    maxLength: 32,
    setMessageError,
    setValue,
  };
};
/** === EXPORT === */
export const MerchantHookFunc = {
  useSupplierListAction,
  useRegisterStep4,
  useEditMerchant,
  useEditProfile,
  useNumberOfEmployeeListAction,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
