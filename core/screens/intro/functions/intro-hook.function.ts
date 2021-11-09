/** === IMPORT PACKAGES === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import { NavigationAction } from '@navigation';
import { useDataPermanent } from '@core/redux/Data';
import * as Actions from '../../../data/actions';
/** === FUNCTION === */
/** => go to page intro or home */
const usePageAfterIntro = () => {
  const dataPermanent = useDataPermanent();
  React.useEffect(() => {
    setTimeout(() => {
      if (dataPermanent.isIntroSinbad) {
        NavigationAction.resetToHome();
      } else {
        NavigationAction.resetToIntroSinbad();
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
