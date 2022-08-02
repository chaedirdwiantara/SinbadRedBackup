/**
 * CHECK BUYER
 */
export interface CheckBuyer {
  buyerId: number;
  buyerName: string;
  buyerCode: string;
  buyerTaxNo: string;
  userFullname: string;
  userPhoneNumber: string;
  ownerId: number;
  ownerFullname: string;
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
