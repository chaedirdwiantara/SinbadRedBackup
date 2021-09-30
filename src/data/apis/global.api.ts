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
const getSelection = (data: models.IListSelection) => {
  let path = '';
  let meta = `skip=${data.meta?.skip || 0}&limit=${
    data.meta?.limit || 10
  }&keyword=${data.meta?.keyword || ''}`;
  switch (data.type) {
    case 'listNumOfEmployee': {
      path = 'number-of-employees';
      break;
    }
    case 'listVehicleAccess': {
      path = 'vehicle-accessibilities/all';
      break;
    }
    case 'listProvince': {
      path = 'provinces/all';
      break;
    }
    case 'listCity': {
      path = `locations/city?${data.params}&${meta}`;
      break;
    }
    case 'listDistrict': {
      path = `locations/district?${data.params}&${meta}`;
      break;
    }
    case 'listUrban': {
      path = `locations/urban?${data.params}&${meta}`;
      break;
    }
  }
  return apiGeneral<models.IGetSelectionSuccess<any>>(
    path,
    'account',
    'v1',
    'GET',
  );
};

/** === EXPORT FUNCTIONS === */
export const GlobalApi = {
  uploadImage,
  getSelection,
};
