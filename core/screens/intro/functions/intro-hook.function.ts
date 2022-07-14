/** === IMPORT PACKAGES === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import { NavigationAction } from '@navigation';
import * as Actions from '../../../data/actions';
import { useDataAuth } from '@core/redux/Data';
import { Update } from '@core/functions/global/updateApp/UpdateModule';
/** === FUNCTION === */
/** => go to page intro or home */
const usePageAfterIntro = () => {
  const { me } = useDataAuth();
  React.useEffect(() => {
    setTimeout(() => {
      if (me.data === null) {
        NavigationAction.resetToIntroSinbad();
      } else {
        NavigationAction.resetToHome();
      }
    }, 1000);
  }, []);
};
/** => set intro sinbad to true */
const useSetIntroSinbad = () => {
  const dispatch = useDispatch();
  return {
    setIntroSinbad: (value: boolean) => {
      dispatch(Actions.isIntroSinbad(value));
    },
  };
};
/** => set update availbale */
const useSetUpdateAvailable = () => {
  const dispatch = useDispatch();
  return {
    setUpdateAvailable: () => {
      Update().checkAppUpdate((data: boolean) => {
        if (data) {
          dispatch(Actions.updateApp(data));
        }
      });
    },
    setUpdateFalse: () => {
      dispatch(Actions.updateApp(false));
    },
  };
};
/** === EXPORT === */
export { usePageAfterIntro, useSetIntroSinbad, useSetUpdateAvailable };
