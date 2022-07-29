/** === IMPORT PACKAGE HERE ===  */
import LoadingPage from '@core/components/LoadingPage';
import React, { FC, useEffect } from 'react';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT HERE === */

/** === IMPORT INTERNAL FUNCTION HERE === */
import { goBack, useVoucherList, useVoucherLocalData } from '../../functions';
import { VoucherCartList } from './voucher-cart-list.view';
import { VoucherCartHeader } from './voucher-cart-header.view';
import { VoucherCartSearch } from './voucher-cart-search.view';
import { VoucherCartFooter } from './voucher-cart-footer.view';
import { VoucherCartEmpty } from './voucher-cart-empty.view';
import BottomSheetError from '@core/components/BottomSheetError';
import { NavigationAction } from '@core/functions/navigation';
/** === INTERFACE === */
interface NavigationParams {
  totalOrder: number;
}

/** === COMPONENT === */
const VoucherCartListView: FC = () => {
  /** === HOOK === */
  const {
    eligibleVouchers,
    notEligibleVouchers,
    loading,
    empty,
    disabled,
    error,
    changeSelectedVoucher,
    selectedVoucher,
  } = useVoucherList();
  const { selectedVoucher: localSelectedVoucher } = useVoucherLocalData();
  const { totalOrder } =
    NavigationAction.useGetNavParams<NavigationParams>().params;
  /** => effect */
  useEffect(() => {
    if (localSelectedVoucher) {
      changeSelectedVoucher(localSelectedVoucher.voucherId);
    }
  }, [localSelectedVoucher]);

  /** === VIEW === */
  const renderListAndFooter = () => {
    return (
      <>
        {!loading ? (
          <VoucherCartList
            onSelectedChange={changeSelectedVoucher}
            eligibleVouchers={eligibleVouchers ?? []}
            notEligibleVouchers={notEligibleVouchers ?? []}
            selectedVoucher={selectedVoucher}
          />
        ) : (
          <LoadingPage />
        )}
        <VoucherCartFooter
          selectedVoucher={selectedVoucher}
          total={totalOrder}
          loading={loading}
          disabled={disabled}
        />
      </>
    );
  };

  const renderEmpty = () => {
    return <VoucherCartEmpty />;
  };

  const renderErrorModal = () => {
    return (
      <BottomSheetError
        open={!!error}
        error={error}
        closeAction={() => {
          goBack();
        }}
      />
    );
  };

  /** => main */
  return (
    <SnbContainer color="grey">
      <VoucherCartHeader goBack={() => goBack()} />
      <VoucherCartSearch totalOrder={totalOrder} />
      {!empty ? renderListAndFooter() : renderEmpty()}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default VoucherCartListView;
