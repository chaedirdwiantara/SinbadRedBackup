import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const BrandCardStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginTop: 4,
    marginBottom: 10,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  image: {
    resizeMode: 'contain',
    aspectRatio: 1,
    width: '100%',
  },
  shadowForBox5: {
    borderWidth: 0,
    backgroundColor: color.white,
    shadowColor: color.black100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
