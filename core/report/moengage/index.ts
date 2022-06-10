import ReactMoE, { MoEProperties, MoEGeoLocation } from 'react-native-moengage';
import { MoengageAttribute, MoengageRecordCore } from './moengage.model';

function SnbRecord(record: MoengageRecordCore) {
  try {
    const { data, location, eventName } = record;
    let properties = new MoEProperties();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        properties.addAttribute(key, data[key]);
      }
    }
    if (location) {
      properties.addLocationAttribute(
        'store_location',
        new MoEGeoLocation(location.latitude, location.longitude),
      );
    }
    ReactMoE.trackEvent(eventName, properties);
  } catch (error: any) {
    throw new Error(error);
  }
}

function SnbSetAttribute(attributes: MoengageAttribute) {
  const { data, location } = attributes;
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      ReactMoE.setUserAttribute(key, data[key]);
    }
  }
  if (location) {
    ReactMoE.setUserAttributeLocation(
      'Store Location',
      new MoEGeoLocation(location.latitude, location.longitude),
    );
  }
}

// function errorHandlingType(errorName: string) {
//   throw TypeError(`Wrong type given, expected ${errorName}`);
// }

export { SnbRecord, SnbSetAttribute };
