import * as models from '@models';
import * as types from '@types';

// SEARH LOCATION AFTER SUCCESS REGISTER
export const searchLocation = (
  data: models.ISearchLocation,
): models.IAction<models.ISearchLocation> => ({
  type: types.SEARCH_LOCATION_PROCESS,
  payload: data,
});

export const searchLocationSuccess = (
  data: models.ListSuccessProps<models.ISearchLocationsData>,
): models.ListSuccessAction<models.ISearchLocationsData> => ({
  type: types.SEARCH_LOCATION_SUCCESS,
  payload: data,
});

export const searchLocationFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => ({
  type: types.SEARCH_LOCATION_FAILED,
  payload: data,
});

export const loadMoreSearchLocation = (
  data: models.ISearchLocation,
): models.IAction<models.ISearchLocation> => ({
  type: types.LOAD_MORE_SEARCH_LOCATION_PROCESS,
  payload: data,
});

export const loadMoreSearchLocationSuccess = (
  data: models.ListSuccessProps<models.ISearchLocationsData>,
): models.ListSuccessAction<models.ISearchLocationsData> => ({
  type: types.LOAD_MORE_SEARCH_LOCATION_SUCCESS,
  payload: data,
});

export const resetSearchLocation = () => ({
  type: types.SEARCH_LOCATION_RESET,
});

export const loadMoreSearchLocationFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => ({
  type: types.LOAD_MORE_SEARCH_LOCATION_FAILED,
  payload: data,
});
