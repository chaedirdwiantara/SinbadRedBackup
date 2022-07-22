export interface MoengageRecordCore {
  eventName: string;
  data: any;
  location?: MoengageLocation;
}

export interface MoengageAttribute {
  data: any;
  location?: MoengageLocation;
}

export interface MoengageLocation {
  latitude: number;
  longitude: number;
}
