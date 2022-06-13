import React, { useState } from 'react';
/** === IMPORT PACKAGE HERE === */
import { useDispatch, useSelector } from 'react-redux';
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
/** => change email */
const useChangeEmail = () => {
  const dispatch = useDispatch();
  return {
    changeEmail: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.changeEmailProcess(contextDispatch, data));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.changeEmailReset());
    },
    verificationEmail: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.verificationEmailProcess(contextDispatch, data));
    },
    resetVerificationEmail: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.verificationEmailReset());
    },
  };
};
/** => change mobile phone */
const useChangeMobilePhone = () => {
  const dispatch = useDispatch();
  return {
    changeMobilePhone: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.changeMobilePhoneProcess(contextDispatch, data));
    },
    resetChangeMobilePhone: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.changeMobilePhoneReset());
    },
    verificationMobilePhone: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.verificationMobilePhoneProcess(contextDispatch, data));
    },
    resetVerificationMobilePhone: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.verificationMobilePhoneReset());
    },
  };
};
/** => change bank account */
const useChangeBankAccount = () => {
  const dispatch = useDispatch();
  return {
    changeBankAccount: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.changeBankAccountProcess(contextDispatch, data));
    },
    resetChangeBankAccount: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.changeBankAccountReset());
    },
    verificationBankAccount: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.verificationBankAccountProcess(contextDispatch, data));
    },
    resetVerificationBankAccount: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.verificationBankAccountReset());
    },
  };
};
type TField =
  | 'default'
  | 'error'
  | 'success'
  | 'information'
  | 'disabled'
  | 'readonly'
  | undefined;
/** => useInput */
export const useInput = (initialState: any = '') => {
  const [value, setValue] = useState(initialState);
  const [valMsgError, setValMsgError] = useState('');
  const [type, setType] = useState<TField>('default');

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

const useUsersStates = () => {
  const { users } = useSelector((state: any) => state);

  return {
    buyerDataState: users.userDetailReducer.data?.buyerData,
  };
};
/** === EXPORT === */
export const MerchantHookFunc = {
  useSupplierListAction,
  useRegisterStep4,
  useEditMerchant,
  useEditProfile,
  useChangeEmail,
  useChangeMobilePhone,
  useChangeBankAccount,
  useUsersStates,
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
