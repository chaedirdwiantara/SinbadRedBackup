import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@actions';
import * as models from '@models';

export const useCoachmark = () => {
  const dispatch = useDispatch();
  const { coachmark: coachmarkState, updateCoachmark: updateCoachmarkState } =
    useSelector((state: any) => state.account);

  const getCoachmark = () => {
    return dispatch(actions.getCoachmarkProcess());
  };
  const updateCoachmark = (data: models.ICoachmarkAction) => {
    return dispatch(actions.updateCoachmarkProcess(data));
  };

  const resetCoachmark = () => {
    return dispatch(actions.resetCoachmark());
  };

  return {
    getCoachmark,
    updateCoachmark,
    coachmarkState,
    updateCoachmarkState,
    resetCoachmark,
  };
};
