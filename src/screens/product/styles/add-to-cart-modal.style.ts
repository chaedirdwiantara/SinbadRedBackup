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
  exclusiveTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 88,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginBottom: 8,
    backgroundColor: color.yellow10,
    borderRadius: 50,
  },
  mainContentContainer: {
    flex: 1,
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
    marginVertical: 8,
  },
  tooltipContainer: {
    position: 'absolute',
    bottom: 22,
    right: -23,
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