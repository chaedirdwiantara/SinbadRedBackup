/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
/** === FUNCTION === */
/** => voucher cart list action */
const useVoucherDetailAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.voucherDetailProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.voucherDetailReset());
    },
  };
};
/** => set voucher tnc & instruction modal */
const useVoucherListItemModal = () => {
  const [isTncModalOpen, setTncModalOpen] = React.useState(false);
  const [isInstructionModalOpen, setInstructionModalOpen] =
    React.useState(false);
  return {
    handleOpenTncModal: () => {
      setTncModalOpen(true);
    },
    handleCloseTnCModal: () => {
      setTncModalOpen(false);
    },
    handleOpenInstructionModal: () => {
      setInstructionModalOpen(true);
    },
    handleCloseInstructionModal: () => {
      setInstructionModalOpen(false);
    },
    isTncModalOpen,
    isInstructionModalOpen,
  };
};
/** => voucher cart list action */
const useVoucherCartListAction = () => {
  const dispatch = useDispatch();
  return {
    list: (contextDispatch: (action: any) => any) => {
      dispatch(
        Actions.voucherCartListProcess(contextDispatch, { id: 'unused' }),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.voucherCartListReset());
    },
  };
};
/** => set search keyword */
const useSearchKeyword = () => {
  const [keyword, setKeyword] = React.useState('');
  return {
    changeKeyword: (newValue: string) => {
      setKeyword(newValue);
    },
    keyword,
  };
};
/** => set selected supplier voucher */
const useSelectedSupplierVoucher = () => {
  const [selectedSupplierVoucher, setSelectedSupplierVoucher] = React.useState<
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
    React.useState<models.SinbadVoucherProps | null>(null);
  return {
    setSelectedSinbadVoucher: (voucher: models.SinbadVoucherProps | null) => {
      setSelectedSinbadVoucher(voucher);
    },
    resetSelectedSinbadVoucher: () => {
      setSelectedSinbadVoucher(null);
    },
    selectedSinbadVoucher,
  };
};
/** => set voucher list local data (this is for list more view) */
const useVoucherListMore = () => {
  const [voucherListData, setVoucherListData] = React.useState<
    models.SinbadVoucherProps[] | models.SupplierVoucherListProps[]
  >([]);
  return {
    setVoucherListData: (
      voucher: models.SinbadVoucherProps[] | models.SupplierVoucherListProps[],
    ) => {
      setVoucherListData(voucher);
    },
    searchVoucherListData: (
      initialData:
        | models.SupplierVoucherListProps[]
        | models.SinbadVoucherProps[],
      keyword: string,
    ) => {
      const filteredVoucher = initialData.filter((item) => {
        return item.voucherName.toLowerCase().includes(keyword.toLowerCase());
      });
      setVoucherListData(filteredVoucher);
    },
    voucherListData,
  };
};
/** => set voucher list local data (this is for list view) */
const useVoucherList = () => {
  const [supplierVoucher, setSupplierVoucher] = React.useState<
    models.SupplierVoucherProps[]
  >([]);
  const [sinbadVoucher, setSinbadVoucher] = React.useState<
    models.SinbadVoucherProps[]
  >([]);
  const { stateVoucherCart } = React.useContext(contexts.VoucherCartContext);
  return {
    updateVoucherList: (
      supplierVoucherList: models.SupplierVoucherProps[],
      sinbadVoucherList: models.SinbadVoucherProps[],
    ) => {
      setSupplierVoucher(supplierVoucherList);
      setSinbadVoucher(sinbadVoucherList);
    },
    searchVoucher: (keyword: string) => {
      if (stateVoucherCart.detail.data !== null) {
        const filteredSupplierVoucher: Array<models.SupplierVoucherProps> = [];
        stateVoucherCart.detail.data.supplierVouchers.map((item) => {
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
          stateVoucherCart.detail.data.sinbadVouchers.filter((item) => {
            return item.voucherName
              .toLowerCase()
              .includes(keyword.toLowerCase());
          });
        setSupplierVoucher(filteredSupplierVoucher);
        setSinbadVoucher(filteredSinbadVoucher);
      }
    },
    resetVoucherData: () => {
      if (stateVoucherCart.detail.data !== null) {
        setSupplierVoucher(stateVoucherCart.detail.data.supplierVouchers);
        setSinbadVoucher(stateVoucherCart.detail.data.sinbadVouchers);
      }
    },
    supplierVoucher,
    sinbadVoucher,
  };
};
/** === EXPORT === */
export {
  useVoucherListItemModal,
  useVoucherDetailAction,
  useVoucherCartListAction,
  useSearchKeyword,
  useSelectedSinbadVoucher,
  useSelectedSupplierVoucher,
  useVoucherListMore,
  useVoucherList,
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
