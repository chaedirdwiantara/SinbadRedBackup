import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ShoppingCartStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: color.white,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sellerContainer: {
    marginTop: 16,
    marginBottom: 2,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    backgroundColor: color.white,
  },
  unavailableHeaderContainer: {
    marginTop: 16,
    marginBottom: 2,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.white,
  },
  horizontalCardContent: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  checkboxContainer: {
    marginRight: 20,
    justifyContent: 'center',
  },
  productImg: {
    width: 65,
    height: 65,
    marginRight: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 12,
  },
  unavailableActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },
  footerContainer: {
    padding: 16,
    backgroundColor: color.white,
    justifyContent: 'flex-end',
    elevation: 10,
  },
});
