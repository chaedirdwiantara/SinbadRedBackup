/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { BannerApi } from '../apis/banner.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => banner slider */
function* bannerSlider(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.BannerSliderSuccessProps> =
      yield call(() => {
        return BannerApi.bannerSlider();
      });
    yield action.contextDispatch(ActionCreators.bannerSliderSuccess(response));
    yield put(ActionCreators.bannerSliderSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.bannerSliderFailed(error));
  }
}
/** ==> banner list */
function* bannerList(action: models.ListProcessAction) {
  console.log('run saga');
  try {
    const response: models.ListSuccessProps<models.BannerListSuccessProps> =
      yield call(() => {
        return BannerApi.bannerList(action.payload);
      });
    yield action.contextDispatch(ActionCreators.bannerListSuccess(response));
    yield put(ActionCreators.bannerListSuccess(response));
    console.log(response, 'resp');
  } catch (error: any) {
    yield put(ActionCreators.bannerListFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* BannerSaga() {
  yield takeLatest(types.BANNER_SLIDER_PROCESS, bannerSlider);
  yield takeLatest(types.BANNER_LIST_PROCESS, bannerList);
}

export default BannerSaga;
