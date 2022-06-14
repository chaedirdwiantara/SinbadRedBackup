import { StyleSheet } from 'react-native';
import { colorV2 } from 'react-native-sinbad-ui';

export const PaymentMethodStyle = StyleSheet.create({
  mainBodyContainer: {
    backgroundColor: colorV2.neutral.cloud10,
    padding: 16,
  },
  listContainer: {
    backgroundColor: colorV2.bgColor.light,
    borderColor: colorV2.strokeColor.default,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
    elevation: 4,
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
  modalComponentStyle: {
    marginBottom: 8,
    marginTop: -40,
  },
  loadList: {
    backgroundColor: colorV2.bgColor.neutral,
    height: 24,
    marginRight: 8,
  },
});

export default PaymentMethodStyle;
