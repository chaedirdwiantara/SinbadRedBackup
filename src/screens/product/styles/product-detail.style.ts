import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ProductDetailStyle = StyleSheet.create({
  carouselIndicatorContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  supplierLogo: {
    width: 48,
    height: 48,
    marginRight: 8,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.black5,
  },
  supplierButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.red70,
  },
  unavailableSKUFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: color.yellow10,
  },
  sectionSeparatorSkeleton: {
    marginLeft: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: color.black10,
  },
  sectionItemSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});
