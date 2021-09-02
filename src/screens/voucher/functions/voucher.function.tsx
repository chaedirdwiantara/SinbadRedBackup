/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => GO BACK */
const goBack = () => {
  NavigationAction.back();
};
/** => SEARCH VOUCHER */
const searchVoucher = (
  keyword: string,
  supplierVoucherList: [],
  sinbadVoucherList: [],
) => {
  const filteredSupplierVoucher = supplierVoucherList.filter((item) => {
    return item.voucherHeader.toLowerCase().includes(keyword.toLowerCase());
  });

  const filteredSinbadVoucher = sinbadVoucherList.filter((item) => {
    return item.voucherHeader.toLowerCase().includes(keyword.toLowerCase());
  });

  groupingVoucher({
    sinbadVouchers: filteredSinbadVoucher,
    supplierVouchers: filteredSupplierVoucher,
  });
};
/** => GROUPING VOUCHER */
const groupingVoucher = (voucherData: {
  sinbadVouchers: [];
  supplierVouchers: [];
}) => {
  // group supplier voucher base on faktur
  const supplierVoucherData = voucherData.supplierVouchers.reduce(
    (result, currentValue) => {
      (result[currentValue.invoiceGroupId] =
        result[currentValue.invoiceGroupId] || []).push(currentValue);
      return result;
    },
    [],
  );
  const sinbadVoucherData = [...voucherData.sinbadVouchers];
  // return the data
  return [sinbadVoucherData, supplierVoucherData];
};

export const VoucherFunc = { goBack };
