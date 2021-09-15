import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const VoucherCartListStyles = StyleSheet.create({
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
    marginBottom: 12,
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
    justifyContent: 'space-between',
    padding: 8,
    borderWidth: 1,
    borderColor: color.black10,
    borderRadius: 4,
    marginBottom: 8,
  },
  voucherCardLeftContent: {
    width: '70%',
  },
  voucherCardRightContent: {
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.white,
  },
});
