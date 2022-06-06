import { StyleSheet } from 'react-native';
import { colorV2 } from 'react-native-sinbad-ui';

export const PaymentMethodStyle = StyleSheet.create({
  mainBodyContainer: {
    backgroundColor: colorV2.neutral.cloud10,
    padding: 16,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
  listImage: {
    height: 25,
    width: 55,
  },
  listName: {
    alignItems: 'center',
    marginLeft: 16,
  },
  detailContainer: {
    backgroundColor: colorV2.neutral.cloud10,
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  paymentStatusItem: {
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFooter: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default PaymentMethodStyle;
