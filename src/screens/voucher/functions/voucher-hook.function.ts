/** === IMPORT PACKAGE HERE === */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher cart list action */
const useVoucherCartListAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.voucherCartListProcess(contextDispatch, { id: '1' }));
    },
  };
};
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
export { useSearchKeyword, useVoucherList, useVoucherCartListAction };
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
