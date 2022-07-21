/**
 * CHECK BUYER
 */
export interface CheckBuyer {
  buyerId: number;
  buyerName: string;
  buyerCode: string;
  buyerTaxNo: string;
  userFullName: string;
  userPhoneNumber: string;
  ownerId: number;
  ownerFullName: string;
  ownerPhoneNumber: string;
  ownerIdNo: string;
  latitude: string;
  longitude: string;
  province: string;
  city: string;
  district: string;
  urban: string;
  zipCode: string;
  address: string;
  noteAddress: string;
  locationId: string;
  imageId: string;
  isImageIdOcrValidation: boolean;
}
