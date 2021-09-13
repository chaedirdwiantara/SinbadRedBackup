/** === IMPORT PACKAGE HERE === */
import firestore from '@react-native-firebase/firestore';
import { uniqueId } from '../global/device-data';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => */
/** => get FCM by device id */
const getFcmByDeviceId = async (table: 'global' | 'users') => {
  return firestore()
    .collection('sinbadRed')
    .doc('notifications')
    .collection(table)
    .where('deviceId', '==', uniqueId)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        const data = querySnapshot.docs[0].data();
        data.id = querySnapshot.docs[0].id;
        return data;
      }
      return null;
    });
};
/** => delete FCM by device id  */
const deleteFcmByDeviceId = async (table: 'global' | 'users') => {
  return getFcmByDeviceId(table).then((data) => {
    if (data !== null) {
      return firestore()
        .collection('sinbadRed')
        .doc('notifications')
        .collection(table)
        .doc(data.id)
        .delete()
        .then(() => true);
    }
  });
};
/** => save FCM global data */
const saveFCMGlobal = async (fcm: string) => {
  firestore()
    .collection('sinbadRed')
    .doc('notifications')
    .collection('global')
    .add({
      deviceId: uniqueId,
      fcm,
    })
    .then(() => {
      console.log('User added!');
    });
};
/** === EXPORT === */
export { getFcmByDeviceId, deleteFcmByDeviceId, saveFCMGlobal };
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
