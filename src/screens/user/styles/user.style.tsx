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
    borderRadius: 5,
    marginHorizontal: 16,
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
export default UserStyles;
