import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ShoppingCartStyles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 16,
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(37, 40, 43, 0.05)',
    borderStyle: 'solid',
  },
  topCardSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: color.black10,
  },
  verticalBottomCardSlot: {
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 12,
  },
  horizontalBottomCardSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  qtyText: {
    justifyContent: 'center',
    paddingBottom: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderStyle: 'solid',
    borderBottomColor: color.black10,
    borderBottomWidth: 1,
  },
  footerContainer: {
    borderTopColor: color.black10,
    borderStyle: 'solid',
    borderTopWidth: 1,
    paddingHorizontal: 16,
  },
  footerBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  voucherTagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
  },
  voucherTagLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 12,
    backgroundColor: color.green10,
    borderRadius: 4,
  },
  voucherTagRightContainer: {
    flexDirection: 'row',
  },
  voucherTagIconContainer: {
    marginRight: 8,
    padding: 8,
    backgroundColor: color.green50,
    borderRadius: 4,
  },
});
