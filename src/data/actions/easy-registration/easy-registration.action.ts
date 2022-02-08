import * as models from '@models';
import * as types from '@types';

// SEARH LOCATION AFTER SUCCESS REGISTER
export const searchLocation = (
  data: models.ListProcessProps,
): models.ListProcessAction => {
  return {
    type: types.SEARCH_LOCATION_PROCESS,
    payload: data,
    contextDispatch: () => undefined,
  };
};

export const searchLocationSuccess = (
  data: models.ListSuccessProps<models.ISearchLocationsData>,
): models.ListSuccessAction<models.ISearchLocationsData> => {
  return {
    type: types.SEARCH_LOCATION_SUCCESS,
    payload: data,
  };
};

export const searchLocationFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return {
    type: types.SEARCH_LOCATION_FAILED,
    payload: data,
  };
};
