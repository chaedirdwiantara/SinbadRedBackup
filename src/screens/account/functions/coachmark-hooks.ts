import { useDispatch } from 'react-redux';
import * as actions from '@actions';

export const useCoachmark = () => {
  const dispatch = useDispatch();
  const getCoachmark = () => {
    return dispatch(actions.getCoachmarkProcess());
  };
  const updateCoachmark = () => {
    return dispatch(actions.updateCoachmarkProcess());
  };
  return { getCoachmark, updateCoachmark };
};
