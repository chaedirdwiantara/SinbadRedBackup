/** => for upload image */
export interface UploadImageSaveProps {
  imageUri: string;
}
export interface UploadImageDataProps {
  message: string;
  url: string;
}

export interface IOCRResult {
  nameOnKtp: string;
  idNumber: string;
}
