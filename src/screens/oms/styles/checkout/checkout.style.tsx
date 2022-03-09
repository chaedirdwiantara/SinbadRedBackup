import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const CheckoutStyle = StyleSheet.create({
  invoiceGroupListContainer: {
    marginTop: 8,
    backgroundColor: color.white,
  },
  invoiceGroupListField: {
    marginBottom: 8,
    backgroundColor: color.white,
    padding: 16,
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
    paddingVertical: 8,
    paddingHorizontal: 9,
    marginTop: 8,
    borderWidth: 2,
    borderColor: color.black10,
    borderRadius: 5,
  },
  shipmentTxt: {
    padding: 5,
    backgroundColor: color.black10,
    borderRadius: 5,
  },
  productsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shipmentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skuImage: {
    height: 60,
    width: 60,
  },
  deliveryIcon: {
    height: 35,
    width: 35,
  },
  productsDescription: {
    paddingLeft: 15,
  },
  bottomContentContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  addessSection: {
    padding: 16,
    backgroundColor: color.white,
  },
  paymentPromoBadgeContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: color.yellow10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  selectPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  smallIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  mediumIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  detailItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailExpandButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  modalDetailItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalDetailTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warningTimer: {
    backgroundColor: color.white,
  },
  warningTextContainer: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: color.yellow10,
    borderRadius: 5,
    justifyContent: 'space-around',
  },
  showMoreProduct: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckoutStyle;
