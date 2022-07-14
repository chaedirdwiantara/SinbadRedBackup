declare module 'react-native-advertising-id' {
  function getAdvertisingId(): Promise<{
    advertisingId: string;
    isLimitAdTrackingEnabled: boolean;
  }>;
}

// {"advertisingId": "9133b26c-4f1d-4342-be4b-987ceea9c4a4", "isLimitAdTrackingEnabled": false}
