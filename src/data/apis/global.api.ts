/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from '@core/services/apiGeneral';
import * as models from '@models';
/** === FUNCTION === */
const uploadImage = (data: models.IUploadImage) => {
  const path = 'upload/store-images';
  return apiGeneral<models.IUploadImageSuccess>(
    path,
    'common',
    'v1',
    'POST',
    data,
  );
};
const getSelection = (data: string) => {
  let path = '';
  switch (data) {
    case 'listNumOfEmployee': {
      path = 'number-of-employees';
      return apiGeneral<models.IGetSelectionSuccess<models.INumOfEmployee>>(
        path,
        'account',
        'v1',
        'GET',
      );
    }
    case 'listVehicleAccess': {
      path = 'vehicle-accessibilities/all';
      return apiGeneral<models.IGetSelectionSuccess<any>>(
        path,
        'account',
        'v1',
        'GET',
      );
    }
  }
};

/** === EXPORT FUNCTIONS === */
export const GlobalApi = {
  uploadImage,
  getSelection,
};
