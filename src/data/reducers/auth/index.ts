import { combineReducers } from 'redux';
import { checkPhoneNoAvailability } from './check-phone.reducer';
import { checkEmailAvailability } from './check-email.reducer';
import { loginUsername } from './login-id.reducer';
import { registerData } from './register-data.reducer';
import { capturedImage } from './captured-image.reducer';
import { uploadedImage } from './upload-image.reducer';

export const auth = combineReducers({
  checkPhoneNoAvailability,
  loginUsername,
  checkEmailAvailability,
  registerData,
  capturedImage,
  uploadedImage,
});
