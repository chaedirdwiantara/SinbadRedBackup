export interface TrackCompletionData {
  dataUser: completionDataUser;
  dataBuyer: completionDataUser;
}

export interface completionDataUser {
  name?: string;
  idNo?: string;
  taxImageUrl?: string;
  taxNo?: string;
  selfieImageUrl?: string;
  email?: string;
}

export interface completionDataUser {
  name?: string;
  phoneNo?: string;
  imageUrl?: string;
  longitude?: string;
  latitude?: string;
  locationId?: string;
  address?: string;
  vehicleAccessibilityId?: number;
  vehicleAccessibilityAmount?: number;
  noteAddress?: string;
}
