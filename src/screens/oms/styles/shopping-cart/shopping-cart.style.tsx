import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ShoppingCartStyles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 16,
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(37, 40, 43, 0.102)',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopColor: color.black10,
    borderStyle: 'solid',
    borderTopWidth: 1,
  },
});
