import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const UserStyles = StyleSheet.create({
  headerInformationContainer: {
    flex: 1,
  },
  imageContainer: {
    height: 50,
    width: 50,
    margin: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: color.white,
  },
  userInfo: {
    paddingVertical: 5,
    width: '80%',
    alignSelf: 'center',
  },
  bodyTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  headerBackground: {
    backgroundColor: color.red50,
    height: 30,
    width: '100%',
  },
  shadowStyle: {
    shadowColor: color.black100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  cardBody: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  /** Pagination */
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: color.red50,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: color.black40,
  },
  appButtonContainer: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
  },
  appButtonText: {
    fontSize: 14,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    fontWeight: '500',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    color: '#52575C',
  },
  carouselContainer: {
    backgroundColor: color.white,
    borderRadius: 8,
  },
  carouselText: {
    marginLeft: 16,
    alignSelf: 'center',
    width: 185,
  },
  carouselButton: {
    backgroundColor: color.red50,
    height: 24,
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    paddingBottom: 2,
  },
});
export default UserStyles;
