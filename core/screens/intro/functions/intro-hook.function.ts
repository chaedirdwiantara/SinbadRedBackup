/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import * as Actions from '../../../data/actions';
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
/** === EXPORT === */
export { useSetIntroSinbad };
