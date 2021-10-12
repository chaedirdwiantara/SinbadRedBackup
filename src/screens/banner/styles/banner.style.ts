import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const BannerStyles = StyleSheet.create({
  bannerHomeContainer: {
    height: 400,
    backgroundColor: color.blue50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderColor: color.black10,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8
  },
  bannerCardContainer: {
    flexGrow: 1,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageCard: {
    flexGrow: 1,
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },

  footerCardBanner: {
    paddingHorizontal: 16, 
    paddingBottom: 16, 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },

  buttonDetail: {
    backgroundColor: color.red50,
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 8
  }
});