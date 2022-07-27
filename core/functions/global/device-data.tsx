/** === IMPORT PACKAGE HERE === */
import DeviceInfo from 'react-native-device-info';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
const deviceId = DeviceInfo.getDeviceId();
const systemVersion = DeviceInfo.getSystemVersion();
const appVersion = DeviceInfo.getVersion();
const uniqueId = DeviceInfo.getUniqueId();
const isTab = DeviceInfo.isTablet();
const buildNumber = DeviceInfo.getBuildNumber();
/** === EXPORT === */
export { deviceId, systemVersion, appVersion, uniqueId, isTab, buildNumber };
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
