/** === IMPORT PACKAGE HERE === */
// import React from 'react';
import { BackHandler } from 'react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === TYPE === */
/** => param default */
interface ParamListDefault {
  id: string;
  name: string;
}

type ParamList<T> = {
  Data: ParamListDefault & T;
};
/** === FUNCTION === */
/** => custom back for hardware */
const useCustomBackHardware = (BackAction: () => void) => {
  useFocusEffect(() => {
    const backAction = () => {
      BackAction();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });
};
/** => get data from navigation's params */
const useGetNavParams = <T = object>() => {
  return useRoute<RouteProp<ParamList<T>, 'Data'>>();
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
