/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
/** === FUNCTION === */
/** => call action */
const useUploadImageAction = () => {
  const dispatch = useDispatch();
  return {
    save: (contextDispatch: (action: any) => any, imageUri: string) => {
      dispatch(Actions.uploadImageReset(contextDispatch));
      dispatch(
        Actions.uploadImageSave(contextDispatch, {
          imageUri,
        }),
      );
    },
    upload: (contextDispatch: (action: any) => any, imageUri: string) => {
      dispatch(Actions.uploadImageProcess(contextDispatch, { imageUri }));
    },
  };
};
/** === EXPORT === */
export { useUploadImageAction };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
