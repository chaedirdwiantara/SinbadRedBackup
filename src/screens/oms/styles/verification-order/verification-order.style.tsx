import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const VerificationOrderStyle = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  mainDivider: {
    marginVertical: 16,
  },
  listHeader: {
    marginBottom: 24,
  },
  listDivider: {
    marginBottom: 12,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  listItemProductImage: {
    width: 69,
    height: 69,
    marginRight: 8,
  },
  listItemProductDetailContainer: {
    flex: 1,
  },
  listItemProductNameContainer: {
    width: '80%',
  },
  listItemProductPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemProductDiscountList: {
    marginLeft: 16,
  },
  listItemProductDiscountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listItemProductDiscountName: {
    width: '60%',
  },
  listItemProductDiscountTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listItemProductDiscountTotalTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    borderColor: color.black10,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomTextContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  bottomTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtonContainer: {
    height: 75,
  },
  singleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
