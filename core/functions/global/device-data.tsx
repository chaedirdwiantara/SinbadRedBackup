/** === IMPORT PACKAGE HERE === */
import DeviceInfo from 'react-native-device-info';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
const deviceId = DeviceInfo.getDeviceId();
const systemVersion = DeviceInfo.getSystemVersion();
const appVersion = DeviceInfo.getVersion();
const uniqueId = DeviceInfo.getUniqueId();
/** === EXPORT === */
export { deviceId, systemVersion, appVersion, uniqueId };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
