/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { BackHandler } from 'react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === TYPE === */
/** => for params route */
type ParamList = {
  Data: {
    id: string;
    name: string;
  };
};
/** === FUNCTION === */
/** => custom back for hardware */
const useCustomBackHardware = (BackAction: () => void) => {
  React.useEffect(() => {
    const backAction = () => {
      BackAction();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};
/** => get data from navigation's params */
const useGetNavParams = () => {
  return useRoute<RouteProp<ParamList, 'Data'>>();
};
/** === EXPORT === */
export { useGetNavParams, useCustomBackHardware, useFocusEffect };
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
