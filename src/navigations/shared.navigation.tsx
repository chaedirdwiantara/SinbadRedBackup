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
  OCRResultView: {
    component: OCRResultView,
  },
  MapsViewType2: {
    component: MapsViewType2,
  },
};

export default SharedNav;
