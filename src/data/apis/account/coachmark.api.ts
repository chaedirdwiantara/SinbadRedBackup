import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const getCoachmark = () => {
  const path = 'coachmark';
  return apiMapping<models.ICoachmarkData>(
    'auth',
    path,
    'auth',
    'v1',
    'DETAIL',
  );
};

const updateCoachmark = (data: models.ICoachmarkAction) => {
  const path = 'coachmark';
  return apiMapping<models.ICoachmarkData>(
    'auth',
    path,
    'auth',
    'v1',
    'UPDATE',
    { [data]: true },
  );
};

export const coachmarkApi = {
  getCoachmark,
  updateCoachmark,
};
