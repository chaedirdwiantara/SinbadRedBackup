/** === IMPORT PACKAGE HERE === */
import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
/** === FUNCTION === */
/** => voucher cart list action */
const useVoucherCartListAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any) => {
      dispatch(
        Actions.voucherCartListProcess(contextDispatch, { id: 'unused' }),
      );
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
/** => set selected supplier voucher */
const useSelectedSupplierVoucher = () => {
  const [selectedSupplierVoucher, setSelectedSupplierVoucher] = useState<
    models.SupplierVoucherListProps[]
  >([]);
  return {
    setSelectedSupplierVoucher: (
      voucher: models.SupplierVoucherListProps[],
    ) => {
      setSelectedSupplierVoucher(voucher);
    },
    resetSelectedSupplierVoucher: () => {
      setSelectedSupplierVoucher([]);
    },
    selectedSupplierVoucher,
  };
};
/** => set selected sinbad voucher */
const useSelectedSinbadVoucher = () => {
  const [selectedSinbadVoucher, setSelectedSinbadVoucher] =
    useState<models.SinbadVoucherProps | null>(null);
  return {
    setSelectedSinbadVoucher: (voucher: models.SinbadVoucherProps) => {
      setSelectedSinbadVoucher(voucher);
    },
    resetSelectedSinbadVoucher: () => {
      setSelectedSinbadVoucher(null);
    },
    selectedSinbadVoucher,
  };
};
/** => set voucher list local data */
const useVoucherList = () => {
  const [supplierVoucher, setSupplierVoucher] = useState<
    models.SupplierVoucherProps[]
  >([]);
  const [sinbadVoucher, setSinbadVoucher] = useState<
    models.SinbadVoucherProps[]
  >([]);
  const { stateVoucher } = useContext(contexts.VoucherContext);
  return {
    updateVoucherList: (
      supplierVoucherList: models.SupplierVoucherProps[] | [],
      sinbadVoucherList: models.SinbadVoucherProps[] | [],
    ) => {
      setSupplierVoucher(supplierVoucherList);
      setSinbadVoucher(sinbadVoucherList);
    },
    searchVoucher: (keyword: string) => {
      if (stateVoucher.detail.data !== null) {
        const filteredSupplierVoucher: Array<models.SupplierVoucherProps> = [];
        stateVoucher.detail.data.supplierVouchers.map((item) => {
          const filteredSubSupplierVoucher = item.voucherList.filter(
            (element) => {
              return element.voucherName
                .toLowerCase()
                .includes(keyword.toLowerCase());
            },
          );
          if (filteredSubSupplierVoucher.length > 0) {
            filteredSupplierVoucher.push({
              invoiceGroupId: item.invoiceGroupId,
              invoiceGroupName: item.invoiceGroupName,
              voucherList: filteredSubSupplierVoucher,
            });
          }
        });
        const filteredSinbadVoucher =
          stateVoucher.detail.data.sinbadVouchers.filter((item) => {
            return item.voucherName
              .toLowerCase()
              .includes(keyword.toLowerCase());
          });
        setSupplierVoucher(filteredSupplierVoucher);
        setSinbadVoucher(filteredSinbadVoucher);
      }
    },
    resetVoucherData: () => {
      if (stateVoucher.detail.data !== null) {
        setSupplierVoucher(stateVoucher.detail.data.supplierVouchers);
        setSinbadVoucher(stateVoucher.detail.data.sinbadVouchers);
      }
    },
    supplierVoucher,
    sinbadVoucher,
  };
};
/** === EXPORT === */
export {
  useSearchKeyword,
  useVoucherList,
  useVoucherCartListAction,
  useSelectedSinbadVoucher,
  useSelectedSupplierVoucher,
};
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
