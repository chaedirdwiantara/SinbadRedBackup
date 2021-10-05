/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { navigate } from '@core/navigations/RootNavigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
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
  console.log('disini');
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
  };
};
/** === EXPORT === */
export const MerchantHookFunc = {
  useSupplierListAction,
  useRegisterStep4,
  useEditMerchant,
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
