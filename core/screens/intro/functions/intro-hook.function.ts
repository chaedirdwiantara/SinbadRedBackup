/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import * as Actions from '../../../data/actions';
import { Update } from '@core/functions/global/updateApp/UpdateModule';
/** === FUNCTION === */
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
export { useSetIntroSinbad, useSetUpdateAvailable };
