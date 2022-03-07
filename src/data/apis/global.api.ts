/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from '@core/services/apiGeneral';
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

type TModule =
  | 'account'
  | 'cart'
  | 'product'
  | 'discount'
  | 'auth'
  | 'common'
  | 'banner'
  | 'order'
  | 'payment'
  | 'warehouse'
  | 'order'
  | 'quests'
  | 'location';

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
  let module: TModule = 'location';
  let access: 'public' | 'auth' = data?.action === 'edit' ? 'auth' : 'public';
  let meta = `page=${data.meta?.page || 1}&perPage=${data.meta?.perPage || 10}`;
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
      path = `location/province?${meta}`;
      break;
    }
    case 'listCity': {
      path = `location/city?${data.params}&${meta}`;
      break;
    }
    case 'listDistrict': {
      path = `location/district?${data.params}&${meta}`;
      break;
    }
    case 'listUrban': {
      path = `location/urban?${data.params}&${meta}`;
      break;
    }
    case 'listUrbanID': {
      meta = `skip=${data.meta?.page}&limit=${data.meta?.perPage}`;
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
  return apiMapping<models.IGetSelectionSuccess<any>>(
    access,
    path,
    module,
    'v1',
    'DETAIL',
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
