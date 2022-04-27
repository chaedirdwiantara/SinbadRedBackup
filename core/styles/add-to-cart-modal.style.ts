import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const AddToCartModalStyle = StyleSheet.create({
  quantityModifierContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  mainContentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  image: {
    height: 70,
    borderRadius: 6,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulkPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  tooltipContainer: {
    maxWidth: 200,
    height: 50,
    position: 'absolute',
    bottom: 20,
    left: -23,
  },
  lineSeparator: {
    marginHorizontal: 10,
    borderRightWidth: 1,
    borderColor: color.black40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 12,
    marginTop: 16,
  },
});
