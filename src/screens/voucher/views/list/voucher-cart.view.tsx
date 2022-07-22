/** === IMPORT PACKAGE HERE ===  */
import { contexts } from '@contexts';
import LoadingPage from '@core/components/LoadingPage';
import React, { FC } from 'react';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT HERE === */

/** === IMPORT INTERNAL FUNCTION HERE === */
import { goBack, useVoucherList } from '../../functions';
import { VoucherCartList } from './voucher-cart-list.view';
import { VoucherCartHeader } from './voucher-cart-header.view';
import { VoucherCartSearch } from './voucher-cart-search.view';
import { VoucherCartFooter } from './voucher-cart-footer.view';
// import { useCartMasterActions } from '@screen/oms/functions';
/** === COMPONENT === */
const VoucherCartListView: FC = () => {
  /** === HOOK === */
  const { stateVoucher } = React.useContext(contexts.VoucherContext);
  const {
    eligibleVouchers,
    notEligibleVouchers,
    loading,
    changeSelectedVoucher,
    selectedVoucher,
  } = useVoucherList();

  /** => effect */

  /** === VIEW === */

  /** => main */
  return (
    <SnbContainer color="grey">
      <VoucherCartHeader goBack={() => goBack()} />
      <VoucherCartSearch />
      {!stateVoucher.voucherCart.detail.loading ? (
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
        total={10000}
        loading={loading}
        disabled={!eligibleVouchers}
      />
    </SnbContainer>
  );
};

export default VoucherCartListView;
