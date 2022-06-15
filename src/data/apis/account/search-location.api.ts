import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const searchLocation = (data: models.ISearchLocation) => {
  const path = `location?keyword=${data.keyword}&page=${data.page}&perPage=${data.perPage}`;
  return apiMapping<models.ListSuccessProps<models.ISearchLocationsData>>(
    'public',
    path,
    'location',
    'v1',
    'LIST',
  );
};

export const searchLocationApi = {
  searchLocation,
};
