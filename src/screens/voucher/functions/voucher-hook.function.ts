/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { SupplierVoucherListProps } from '@models';
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
      voucher: models.SinbadVoucherProps[] | SupplierVoucherListProps[],
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
  const { stateVoucher } = React.useContext(contexts.VoucherContext);
  return {
    updateVoucherList: (
      supplierVoucherList: models.SupplierVoucherProps[],
      sinbadVoucherList: models.SinbadVoucherProps[],
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
/** === EXPORT === */
export {
  useSearchKeyword,
  useVoucherList,
  useVoucherListMore,
  useVoucherCartListAction,
  useSelectedSinbadVoucher,
  useSelectedSupplierVoucher,
  useVoucherListItemModal,
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
