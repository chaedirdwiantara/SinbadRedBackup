import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const loginOTPStyle = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    backgroundColor: color.black10,
    marginTop: 24,
    alignSelf: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 14,
  },
});

export default loginOTPStyle;
