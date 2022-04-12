import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const UserStyles = StyleSheet.create({
  headerInformationContainer: {
    backgroundColor: color.red50,
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 22,
  },
  imageContainer: {
    height: 50,
    width: 50,
    marginRight: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: color.white,
  },
  userInfo: {
    justifyContent: 'space-between',
    paddingVertical: 5,
    width: '80%',
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
  appButtonContainer: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 18,
    flexDirection: 'row'
  },
  appButtonText: {
    fontSize: 14,
    paddingHorizontal: 10,
    // letterSpacing: 1,
    alignSelf: "flex-start",
    fontWeight: '500',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    color: '#52575C'
  }
});
export default UserStyles;
