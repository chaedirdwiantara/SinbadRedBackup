import { StyleSheet } from 'react-native';

const OtpStyle = StyleSheet.create({
  image: {
    height: 190,
    width: undefined,
    aspectRatio: 1 / 1,
  },
  imageOtp: {
    height: 100,
    width: undefined,
    aspectRatio: 1 / 1,
    alignSelf: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 14,
  },
  resend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    paddingVertical: 8,
  },
});

export default OtpStyle;
