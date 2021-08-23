import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const HomeStyles = StyleSheet.create({
  topNavContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
    top: 0,
  },
  brandContainer: {
    height: 200,
    backgroundColor: color.yellow50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationContainer: {
    height: 300,
    backgroundColor: color.green50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    height: 300,
    backgroundColor: color.red40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  managementContainer: {
    height: 300,
    backgroundColor: color.yellow10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeStyles;
