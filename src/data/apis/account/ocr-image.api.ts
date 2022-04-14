import apiMapping from '@core/services/apiMapping';
import apiSecureUpload from '@core/services/apiSecureUpload';

const uploadImage = (data: string) => {
  return apiSecureUpload(data);
};

const verifyImage = (data: { imageId: string; type: string }) => {
  const path = 'profile-buyer/image-verification';
  return apiMapping('public', path, 'account', 'v1', 'UPDATE', data);
};

export const ocrImageApi = {
  uploadImage,
  verifyImage,
};
