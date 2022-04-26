/**
 * CART BUYER ADDRESS
 */
export interface CartBuyerAddress {
  buyerId: number;
  buyerName: string;
  buyerCode: string;
  userFullName: string;
  userPhoneNumber: string;
  ownerId: number;
  ownerFullName: string;
  ownerPhoneNumber: string;
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
