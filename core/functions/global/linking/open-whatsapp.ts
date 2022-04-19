import { Linking } from 'react-native';

function openWhatsApp(phone: string, message: string) {
  Linking.openURL(`whatsapp://send?phone=${phone}&text=${message}`).catch(
    (err) => (err ? Linking.openURL('market://details?id=com.whatsapp') : null),
  );
}

export default openWhatsApp;
