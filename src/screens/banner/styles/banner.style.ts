import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const BannerStyles = StyleSheet.create({
  bannerHomeContainer: {
    height: 400,
    backgroundColor: color.blue50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerCardContainer: {
    height: 300,
    flexGrow: 1,
    backgroundColor: 'salmon',
    marginBottom: 20,
    borderRadius: 8
  },
  imageCard: {
    flexGrow: 1,
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
});