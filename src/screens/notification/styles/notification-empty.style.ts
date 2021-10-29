import { StyleSheet } from 'react-native';

const NotificationEmptyStyles = StyleSheet.create({
  boxEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTitle: {
    width: '100%',
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 75,
  },
  boxDescription: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 75,
  },
  fullImage: {
    height: 190,
    width: undefined,
    aspectRatio: 1 / 1,
  },
});

export default NotificationEmptyStyles;
