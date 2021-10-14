/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type UploadImageSave = {
  image: string;
};
export type UploadImageInitialProps =
  models.DetailItemProps<models.UploadImageDataProps> & UploadImageSave;
/** === INITIAL STATE HERE === */
export const uploadImageInitialState: UploadImageInitialProps = {
  image: '',
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const uploadImageReducer = simplifyReducer(uploadImageInitialState, {
  /** ===> SET IMAGE */
  [types.UPLOAD_IMAGE_SAVE](
    state = uploadImageInitialState,
    action: models.uploadImageAction,
  ) {
    return {
      ...state,
      image: action.payload.imageUri,
    };
  },
  /** ===> DETAIL */
  /** => process */
  [types.UPLOAD_IMAGE_PROCESS](state = uploadImageInitialState) {
    return {
      ...state,
      loading: true,
    };
  },
  /** => success */
  [types.UPLOAD_IMAGE_SUCCESS](
    state = uploadImageInitialState,
    action: models.DetailSuccessAction<models.UploadImageDataProps>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => failed */
  [types.UPLOAD_IMAGE_FAILED](
    state = uploadImageInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => reset */
  [types.UPLOAD_IMAGE_RESET]() {
    return uploadImageInitialState;
  },
});
