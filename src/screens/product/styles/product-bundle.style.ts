import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ProductBundleStyle = StyleSheet.create({
  promoSuggestionBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 56,
    backgroundColor: color.yellow40,
    opacity: 0.2,
  },
  promoSuggestionExclamationContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginLeft: -8,
    borderRadius: 100,
    backgroundColor: color.yellow40,
    opacity: 0.3,
  },
  promoSuggestionExclamationMark: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -6,
  },
  sectionTitleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.black10,
  },
  sectionTitleContainer: {
    width: '100%',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  mainInfoImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  tooltipContainer: {
    position: 'absolute',
    bottom: 22,
    right: 12,
  },
  textHorizontalDivider: {
    width: 16,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: color.black10,
    marginRight: 16,
  },
  quantityModifierContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
});
