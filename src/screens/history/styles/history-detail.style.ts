import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const HistoryDetailStyle = StyleSheet.create({
  headerExtension: {
    backgroundColor: color.red50,
    width: '100%',
    height: 50,
    position: 'absolute',
    zIndex: 0,
  },
  orderConfirmationCountDown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: color.yellow10,
  },
  statusDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productListCardHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  canceledProductListCardHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  seeMoreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});