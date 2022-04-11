/** === IMPORT PACKAGES === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import { NavigationAction } from '@navigation';
import * as Actions from '../../../data/actions';
import { useDataAuth } from '@core/redux/Data';
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
/** === EXPORT === */
export { usePageAfterIntro, useSetIntroSinbad };
