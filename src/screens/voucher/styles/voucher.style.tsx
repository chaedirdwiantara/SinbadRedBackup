import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const VoucherCartListStyles = StyleSheet.create({
  parentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    backgroundColor: color.white,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchSectionTextField: {
    width: '65%',
  },
  searchSectionButton: {
    marginLeft: 8,
  },
  voucherSection: {
    padding: 16,
  },
  voucherSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  voucherSectionTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voucherSectionTitleTextContainer: {
    marginLeft: 10,
  },
  voucherSectionRightIcon: {
    flexDirection: 'row',
  },
  voucherCard: {
    flexDirection: 'row',
    padding: 8,
    borderWidth: 1,
    borderColor: color.black10,
    borderRadius: 4,
  },
});

export default VoucherCartListStyles;
