import { StyleSheet } from 'react-native';

export const PromoPaymentListStyles = StyleSheet.create({
  singleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    paddingVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignContent: 'flex-start',
    marginRight: 16,
    alignSelf: 'center',
  },
});
