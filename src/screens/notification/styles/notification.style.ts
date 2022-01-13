import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const NotificationStyles = StyleSheet.create({
  boxFlatlist: {
    paddingBottom: 30,
  },
  boxNotification: {
    padding: 16,
    flexDirection: 'row',
  },
  boxNotificationItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 4,
  },
  image44Contain: {
    height: 44,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  lines: {
    borderTopWidth: 1,
    borderColor: color.black10,
  },
});

export default NotificationStyles;
