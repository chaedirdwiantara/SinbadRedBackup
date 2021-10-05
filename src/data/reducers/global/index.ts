import { combineReducers } from 'redux';
import { capturedImage } from './captured-image.reducer';
import { uploadedImage } from './upload-image.reducer';
import { listSelection, selectedItem } from './list-selection.reducer';
import { locations } from './location.reducer';

export const global = combineReducers({
  capturedImage,
  uploadedImage,
  listSelection,
  selectedItem,
  locations,
});
