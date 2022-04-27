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
  boxEditIconContainer: {
    position: 'absolute',
    right: 2,
    bottom: 5,
    padding: 2,
    backgroundColor: color.white,
    borderRadius: 20
  },
  boxEditIcon: {
    padding: 5,
    backgroundColor: color.black40,
    borderRadius: 20,
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  badgeBox: {
    flexDirection: 'row',
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: color.blue10,
    borderRadius: 4,
  },
  separator: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#DAE0E7',
    marginHorizontal: 16,
    marginTop: 16,
  }
});
export default UserStyles;
