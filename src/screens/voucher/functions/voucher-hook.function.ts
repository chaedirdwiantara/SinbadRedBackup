/** === IMPORT PACKAGE HERE === */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { useDebounce } from '@core/functions/hook/debounce';
import { contexts } from '@contexts';
import { RadioValue } from '@sinbad/react-native-sinbad-ui/lib/typescript/components/v2/Radio/RadioGroup';
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
/** => voucher cart list action */
const useVoucherCartListAction = () => {
  const dispatch = useDispatch();
  return {
    list: (contextDispatch: (action: any) => any, keyword: string) => {
      dispatch(
        Actions.voucherCartListProcess(contextDispatch, {
          uniqueCode: keyword,
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
    selectedVoucher: stateVoucher.voucherCart.detail.data?.eligible.find(
      (voucher) => voucher.id === selectedVoucherId,
    ),
    selectedVoucherId,
  };
};

const useVoucherList = () => {
  const { stateVoucher } = React.useContext(contexts.VoucherContext);
  const { selectedVoucher, setSelectedVoucher, selectedVoucherId } =
    useSelectedVoucher();
  return {
    eligibleVouchers: stateVoucher.voucherCart.detail.data?.eligible,
    notEligibleVouchers: stateVoucher.voucherCart.detail.data?.notEligible,
    loading: stateVoucher.voucherCart.detail.loading,
    changeSelectedVoucher: (voucher: RadioValue) => {
      setSelectedVoucher(voucher as number);
    },
    selectedVoucher,
    selectedVoucherId,
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
