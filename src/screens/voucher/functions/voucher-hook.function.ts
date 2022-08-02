/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import { useDebounce } from '@core/functions/hook/debounce';
import { contexts } from '@contexts';
import { RadioValue } from '@sinbad/react-native-sinbad-ui/lib/typescript/components/v2/Radio/RadioGroup';
import { VoucherListProcessProps } from '@models';
import { useDataVoucher } from '@core/redux/Data';
import * as models from '@models';
/** === FUNCTION === */
/** => cancel reserve voucher */
const useCancelVoucherAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cancelVoucherProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cancelVoucherReset(contextDispatch));
    },
  };
};

/** => voucher cart detail action */
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
/** => voucher cart list action */
const useVoucherCartListAction = () => {
  const dispatch = useDispatch();
  return {
    list: (
      contextDispatch: (action: any) => any,
      { totalOrder, uniqueCode }: VoucherListProcessProps,
    ) => {
      dispatch(
        Actions.voucherCartListProcess(contextDispatch, {
          totalOrder,
          ...(uniqueCode && { uniqueCode }),
        }),
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
  const debouncedValue = useDebounce<string>(keyword!);

  return {
    changeKeyword: (newValue: string) => {
      setKeyword(newValue);
    },
    keyword,
    debouncedValue,
  };
};
/** => set selected seller voucher */
const useSelectedVoucher = () => {
  const [selectedVoucherId, setSelectedVoucherId] = React.useState<number>(0);
  const { stateVoucher } = React.useContext(contexts.VoucherContext);

  return {
    setSelectedVoucher: (voucherId: number) => {
      setSelectedVoucherId(voucherId);
    },
    resetSelectedVoucher: () => {
      setSelectedVoucherId(0);
    },
    selectedVoucher: stateVoucher.voucherCart.list.data?.eligible.find(
      (voucher) => voucher.sinbadVoucherId === selectedVoucherId,
    ),
    selectedVoucherId,
  };
};

const useVoucherList = () => {
  const { stateVoucher } = React.useContext(contexts.VoucherContext);
  const { selectedVoucher, setSelectedVoucher, selectedVoucherId } =
    useSelectedVoucher();
  return {
    eligibleVouchers: stateVoucher.voucherCart.list.data?.eligible,
    notEligibleVouchers: stateVoucher.voucherCart.list.data?.notEligible,
    loading:
      stateVoucher.voucherCart.list.loading ||
      stateVoucher.checkSinbadVoucher.loading,
    changeSelectedVoucher: (voucher: RadioValue) => {
      setSelectedVoucher(voucher as number);
    },
    empty:
      stateVoucher.voucherCart.list.data?.eligible.length === 0 &&
      stateVoucher.voucherCart.list.data?.notEligible.length === 0,
    disabled:
      stateVoucher.voucherCart.list.data?.eligible.length === 0 ||
      !selectedVoucher,
    error: stateVoucher.voucherCart.list.error,
    selectedVoucher,
    selectedVoucherId,
    totalOrder: stateVoucher.checkSinbadVoucher.data?.totalOrder,
  };
};

const useVoucherDetail = () => {
  const { stateVoucher } = React.useContext(contexts.VoucherContext);

  return {
    data: stateVoucher.voucherCart.detail.data,
    loading: stateVoucher.voucherCart.detail.loading,
    error: stateVoucher.voucherCart.detail.error,
  };
};
const useVoucherLocalData = () => {
  const dispatch = useDispatch();
  const voucherData = useDataVoucher();
  return {
    setSelectedVoucher: (voucher: models.SaveSelectedVoucher) => {
      dispatch(Actions.saveSelectedVoucher(voucher));
    },
    resetSelectedVoucher: () => {
      dispatch(Actions.resetSelectedVoucher());
    },
    selectedVoucher: voucherData.selectedSinbadVoucher,
  };
};
/** === EXPORT === */
export {
  useCancelVoucherAction,
  useVoucherDetailAction,
  useVoucherCartListAction,
  useSearchKeyword,
  useSelectedVoucher,
  useVoucherList,
  useVoucherDetail,
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
