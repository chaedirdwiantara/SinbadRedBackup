/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from '@core/services/apiGeneral';
import * as models from '@models';
/** === FUNCTION === */
const uploadImage = (data: models.IUploadImage) => {
  const path = 'upload/store-images';
  return apiGeneral<models.IUploadImageSuccess>(
    'auth',
    path,
    'common',
    'v1',
    'POST',
    data,
  );
};
const getSelection = (data: models.IListSelection) => {
  let path = '';
  let module = 'common';
  let access: 'public' | 'auth' = data?.action === 'edit' ? 'auth' : 'public';
  let meta = `skip=${data.meta?.skip || 0}&limit=${
    data.meta?.limit || 10
  }&keyword=${data.meta?.keyword || ''}`;
  switch (data.type) {
    case 'listNumOfEmployee': {
      path = 'number-of-employees';
      module = 'account';
      break;
    }
    case 'listVehicleAccess': {
      path = `vehicle-accessibilities/all?keyword=${data.meta?.keyword || ''}`;
      module = 'account';
      break;
    }
    case 'listProvince': {
      path = `provinces/all?keyword=${data.meta?.keyword}`;
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
    case 'listUrbanID': {
      meta = `skip=${data.meta?.skip}&limit=${data.meta?.limit}`;
      path = `locations/search?${data.params}&${meta}`;
      break;
    }
    case 'listBank': {
      path = `banks/all?keyword=${data.meta?.keyword}`;
      module = 'account';
      access = 'auth';
      break;
    }
  }
  return apiGeneral<models.IGetSelectionSuccess<any>>(
    access,
    path,
    module,
    'v1',
    'GET',
  );
};

const getLocation = (data: models.IUrbanID) => {
  let meta = `skip=${data.meta?.skip || 0}&limit=${data.meta?.limit || 10}`;
  let path = `locations/search?${data.params}&${meta}`;
  return apiGeneral<models.IGetSelectionSuccess<any>>(
    'public',
    path,
    'common',
    'v1',
    'GET',
  );
};

/** === EXPORT FUNCTIONS === */
export const GlobalApi = {
  uploadImage,
  getSelection,
  getLocation,
};
