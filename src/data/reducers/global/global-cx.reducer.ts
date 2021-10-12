/** === IMPORT HERE === */
import {
  uploadImageReducer,
  uploadImageInitialState,
  UploadImageInitialProps,
} from './upload-image.reducer';
/** === TYPE HERE === */
type GlobalContextProps = {
  uploadImage: UploadImageInitialProps;
};
export type GlobalInitialProps = GlobalContextProps;
/** === INITIAL HERE === */
export const globalInitialState = {
  uploadImage: uploadImageInitialState,
};
/** === EXPORT ALL HERE === */
export const globalReducer = ({ uploadImage }: any, action: any) => ({
  uploadImage: uploadImageReducer(uploadImage, action),
});
