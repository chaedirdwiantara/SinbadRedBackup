import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const UserStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  headerContainer: {
    alignItems: 'center',
  },
  backgroundHeader: {
    position: 'absolute',
    backgroundColor: color.red50,
    top: 0,
    width: '100%',
    height: '50%',
    zIndex: 0,
  },
  boxHeader: {
    marginVertical: 16,
    height: 100,
    width: 100,
  },
  imageProfile: {
    height: 100,
    width: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: color.white,
  },
  boxEditIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
export default UserStyles;
