/** === IMPORT PACKAGE HERE === */
import { useState } from 'react';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => set search keyword */
const useSearchKeyword = () => {
  const [keyword, setKeyword] = useState('');
  return {
    changeKeyword: (newValue: string) => {
      setKeyword(newValue);
    },
    keyword,
  };
};
/** => set voucher list local data */
const useVoucherList = () => {
  const [supplierVoucher, setSupplierVoucher] = useState([]);
  const [sinbadVoucher, setSinbadVoucher] = useState([]);
  return {
    updateVoucherList: (supplierVoucherList, sinbadVoucherList) => {
      setSupplierVoucher(supplierVoucherList);
      setSinbadVoucher(sinbadVoucherList);
    },
    supplierVoucher,
    sinbadVoucher,
  };
};
/** === EXPORT === */
export { useSearchKeyword, useVoucherList };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (team)
 * createDate: 15092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
