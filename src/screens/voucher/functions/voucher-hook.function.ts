/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { useDataVoucher } from '@core/redux/Data';
/** === FUNCTION === */
/** => count all voucher action */
const useCountAllVoucherAction = () => {
  const dispatch = useDispatch();
  return {
    count: (contextDispatch: (action: any) => any) => {
      dispatch(
        Actions.countAllVoucherProcess(contextDispatch, { id: 'unused' }),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.countAllVoucherReset());
    },
  };
};
/** => voucher cart detail action */
const useVoucherDetailAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (
      contextDispatch: (action: any) => any,
      id: string,
      type: string,
    ) => {
      dispatch(Actions.voucherDetailProcess(contextDispatch, { id, type }));
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
/** => set selected seller voucher */
const useSelectedSellerVoucher = () => {
  const [selectedSellerVoucher, setSelectedSellerVoucher] = React.useState<
    models.SellerVoucherListProps[]
  >([]);
  return {
    setSelectedSellerVoucher: (voucher: models.SellerVoucherListProps[]) => {
      setSelectedSellerVoucher(voucher);
    },
    resetSelectedSellerVoucher: () => {
      setSelectedSellerVoucher([]);
    },
    selectedSellerVoucher,
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
  const [voucherListData, setVoucherListData] = React.useState<any>([]);
  return {
    setVoucherListData: (
      voucher: models.SinbadVoucherProps[] | models.SellerVoucherListProps[],
    ) => {
      setVoucherListData(voucher);
    },
    searchVoucherListData: (
      initialData:
        | models.SellerVoucherListProps[]
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
  const [sellerVoucher, setSellerVoucher] = React.useState<
    models.SellerVoucherProps[]
  >([]);
  const [sinbadVoucher, setSinbadVoucher] = React.useState<
    models.SinbadVoucherProps[]
  >([]);
  const { stateVoucher } = React.useContext(contexts.VoucherContext);
  return {
    updateVoucherList: (
      sellerVoucherList: models.SellerVoucherProps[],
      sinbadVoucherList: models.SinbadVoucherProps[],
    ) => {
      setSellerVoucher(sellerVoucherList);
      setSinbadVoucher(sinbadVoucherList);
    },
    searchVoucher: (keyword: string) => {
      if (stateVoucher.voucherCart.detail.data !== null) {
        const filteredSellerVoucher: Array<models.SellerVoucherProps> = [];
        stateVoucher.voucherCart.detail.data.sellerVouchers.map((item) => {
          const filteredSubSellerVoucher = item.voucherList.filter(
            (element) => {
              return element.voucherName
                .toLowerCase()
                .includes(keyword.toLowerCase());
            },
          );
          if (filteredSubSellerVoucher.length > 0) {
            filteredSellerVoucher.push({
              invoiceGroupId: item.invoiceGroupId,
              invoiceGroupName: item.invoiceGroupName,
              voucherList: filteredSubSellerVoucher,
            });
          }
        });
        const filteredSinbadVoucher =
          stateVoucher.voucherCart.detail.data.sinbadVouchers.filter((item) => {
            return item.voucherName
              .toLowerCase()
              .includes(keyword.toLowerCase());
          });
        setSellerVoucher(filteredSellerVoucher);
        setSinbadVoucher(filteredSinbadVoucher);
      }
    },
    resetVoucherData: () => {
      if (stateVoucher.voucherCart.detail.data !== null) {
        setSellerVoucher(stateVoucher.voucherCart.detail.data.sellerVouchers);
        setSinbadVoucher(stateVoucher.voucherCart.detail.data.sinbadVouchers);
      }
    },
    sellerVoucher,
    sinbadVoucher,
  };
};
/** => */
const useVoucherLocalData = () => {
  const dispatch = useDispatch();
  const voucherData = useDataVoucher();
  return {
    set: ({
      sinbadVoucher,
      sellerVouchers,
    }: models.selectedVoucherDataProps) => {
      dispatch(
        Actions.saveSelectedVouchers({
          sinbadVoucher,
          sellerVouchers,
        }),
      );
    },
    reset: () => {
      dispatch(Actions.saveSelectedVouchers(null));
    },
    selectedVoucher: voucherData.dataVouchers,
  };
};
/** === EXPORT === */
export {
  useVoucherListItemModal,
  useVoucherDetailAction,
  useVoucherCartListAction,
  useSearchKeyword,
  useSelectedSinbadVoucher,
  useSelectedSellerVoucher,
  useVoucherListMore,
  useVoucherList,
  useCountAllVoucherAction,
  useVoucherLocalData,
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
