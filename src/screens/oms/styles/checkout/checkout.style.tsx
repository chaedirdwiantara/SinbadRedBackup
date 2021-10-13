import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const CheckoutStyle = StyleSheet.create({
  invoiceGroupListContainer: {
    padding: 16,
    marginTop: 8,
    backgroundColor: color.white,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  shipmentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skuImage: {
    height: 60,
    width: 60,
  },
  bottomContentContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});

export default CheckoutStyle;
