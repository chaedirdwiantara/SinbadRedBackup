import { combineReducers } from 'redux';
import { capturedImage } from './captured-image.reducer';
import { listSelection, selectedItem } from './list-selection.reducer';
import { locations } from './location.reducer';
import { searchLocations } from './search-locations.reducer';

export const global = combineReducers({
  capturedImage,
  listSelection,
  selectedItem,
  locations,
  searchLocations,
});
