import { call, debounce, put } from 'redux-saga/effects';
import * as types from '@types';
import * as models from '@models';
import { easyRegistrationApi } from '../apis/easy-registration.api';
import * as ActionCreators from '@actions';

/** check phone no */
function* searchLocation(
  action: models.IRegisterAction<models.ListProcessProps>,
) {
  try {
    const response: models.ListSuccessProps<models.ISearchLocationsData> =
      yield call(() => easyRegistrationApi.searchLocation(action.payload));
    yield put(ActionCreators.searchLocationSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.searchLocationFailed(error));
  }
}

function* EasyRegistrationSaga() {
  yield debounce(250, types.SEARCH_LOCATION_PROCESS, searchLocation);
}

export default EasyRegistrationSaga;
