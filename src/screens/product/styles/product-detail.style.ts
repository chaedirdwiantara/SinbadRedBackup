import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ProductDetailStyle = StyleSheet.create({
  headerNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 32,
    width: '100%',
    paddingHorizontal: 16,
    zIndex: 1,
  },
  navigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 40, 43, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    zIndex: 2,
  },
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
  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  sectionSeparator: {
    marginLeft: 16,
    marginBottom: 8,
    borderTopWidth: 1,
    borderColor: color.black10,
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
