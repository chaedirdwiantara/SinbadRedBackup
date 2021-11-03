/** === IMPORT PACKAGE HERE === */
import firestore from '@react-native-firebase/firestore';
import { uniqueId } from '../global/device-data';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => */
/** => get FCM by device id */
const getFcmByDeviceId = async () => {
  return firestore()
    .collection('sinbadRed')
    .doc('notifications')
    .collection('fcm')
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
const deleteFcmByDeviceId = async () => {
  return getFcmByDeviceId().then((data) => {
    if (data !== null) {
      return firestore()
        .collection('sinbadRed')
        .doc('notifications')
        .collection('fcm')
        .doc(data.id)
        .delete()
        .then(() => true);
    }
  });
};
/** => set user id to FCM */
const setUserFCM = async (userId: number | null) => {
  return getFcmByDeviceId().then((data) => {
    if (data !== null) {
      return firestore()
        .collection('sinbadRed')
        .doc('notifications')
        .collection('fcm')
        .doc(data.id)
        .update({
          userId,
        })
        .then(() => true);
    }
  });
};
/** => save FCM not login */
const saveFCMNotLogin = async (fcm: string) => {
  firestore()
    .collection('sinbadRed')
    .doc('notifications')
    .collection('fcm')
    .doc(uniqueId)
    .set({
      deviceId: uniqueId,
      fcm,
      userId: null,
    })
    .then(() => {
      console.log('User added!');
    });
};
/** === EXPORT === */
export { getFcmByDeviceId, deleteFcmByDeviceId, saveFCMNotLogin, setUserFCM };
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
