import { MapsViewType2 } from '@screen/account/views';
import {
  CameraView,
  CameraWithOCRView,
  ListAndSearchView,
  OCRResultView,
} from '@screen/shared/views';

const SharedNav = {
  CameraView: {
    component: CameraView,
  },
  CameraWithOCRView: {
    component: CameraWithOCRView,
  },
  ListAndSearchView: {
    component: ListAndSearchView,
  },
  MapsViewType2: {
    component: MapsViewType2,
  },
  OCRResultView: {
    component: OCRResultView,
  },
};

export default SharedNav;
