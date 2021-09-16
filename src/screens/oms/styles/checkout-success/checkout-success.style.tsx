import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const CheckoutSuccessStyles = StyleSheet.create({
  containerBottomBorder: {
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(37, 40, 43, 0.05)',
    borderStyle: 'solid',
  },
  successImageContainer: {
    padding: 16,
    alignItems: 'center',
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topCardSlot: {
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 8,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: color.black10,
  },
  paymentDetailContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 6,
    elevation: 1,
    shadowColor: 'rgba(37, 40, 43, 0.102)',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
  },
  paymentGuidanceSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
});
