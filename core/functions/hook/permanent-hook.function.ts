/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import * as Actions from '../../data/actions';
/** === FUNCTION === */
/** => save app version */
const useSaveAppVersion = () => {
  const dispatch = useDispatch();
  return {
    saveAppVersion: (value: any) => {
      dispatch(Actions.appVersion(value));
    },
  };
};
/** === EXPORT === */
export { useSaveAppVersion };
