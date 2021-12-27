/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { SnbContainer, SnbEmptyData } from 'react-native-sinbad-ui';
import { VoucherCartListStyles } from '../../styles';
import { contexts } from '@contexts';
/** === IMPORT COMPONENT HERE === */
import LoadingPage from '@core/components/LoadingPage';
import { VoucherCartListHeader } from './voucher-cart-list-header.view';
import { VoucherSearch } from '../../components/VoucherSearch';
import { SinbadVoucherList } from './sinbad-voucher-list.view';
import { SellerVoucherList } from './seller-voucher-list.view';
import { VoucherFooter } from '../../components/VoucherFooter';
import BottomSheetError from '@core/components/BottomSheetError';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  useSearchKeyword,
  useVoucherList,
  useVoucherCartListAction,
  useSelectedSellerVoucher,
  useSelectedSinbadVoucher,
  useVoucherLocalData,
  useStandardModalState,
} from '../../functions';
import { useCartMasterActions } from '@screen/oms/functions';
/** === COMPONENT === */
const VoucherCartListView: FC = () => {
  /** === HOOK === */
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const {
    selectedSellerVoucher,
    setSelectedSellerVoucher,
    resetSelectedSellerVoucher,
  } = useSelectedSellerVoucher();
  const {
    selectedSinbadVoucher,
    setSelectedSinbadVoucher,
    resetSelectedSinbadVoucher,
  } = useSelectedSinbadVoucher();
  const {
    sellerVoucher,
    sinbadVoucher,
    updateVoucherList,
    searchVoucher,
    resetVoucherData,
  } = useVoucherList();
  const voucherLocalDataAction = useVoucherLocalData();
  const errorModal = useStandardModalState();
  const { keyword, changeKeyword } = useSearchKeyword();
  const voucherCartListAction = useVoucherCartListAction();
  const cartMasterActions = useCartMasterActions();
  const voucherCartListState = stateVoucher.voucherCart.detail;
  /** => effect */
  React.useEffect(() => {
    voucherCartListAction.list(dispatchVoucher);
    cartMasterActions.updateRouteName({
      previouseRouteName: 'voucherCartList',
    });
    if (voucherLocalDataAction.selectedVoucher !== null) {
      setSelectedSinbadVoucher(
        voucherLocalDataAction.selectedVoucher.sinbadVoucher,
      );
      setSelectedSellerVoucher(
        voucherLocalDataAction.selectedVoucher.sellerVouchers,
      );
    }
    return () => {
      voucherCartListAction.reset(dispatchVoucher);
    };
  }, []);
  React.useEffect(() => {
    if (voucherLocalDataAction.selectedVoucher !== null) {
      setSelectedSinbadVoucher(
        voucherLocalDataAction.selectedVoucher.sinbadVoucher,
      );
      setSelectedSellerVoucher(
        voucherLocalDataAction.selectedVoucher.sellerVouchers,
      );
    } else if (voucherLocalDataAction.selectedVoucher === null) {
      setSelectedSinbadVoucher(null);
      setSelectedSellerVoucher([]);
    }
  }, [voucherLocalDataAction.selectedVoucher]);
  React.useEffect(() => {
    // if fetching success
    if (voucherCartListState.data !== null) {
      updateVoucherList(
        voucherCartListState.data.sellerVouchers,
        voucherCartListState.data.sinbadVouchers,
      );
    }
    // if fetching error
    if (voucherCartListState.error !== null) {
      errorModal.setOpen(true);
    }
  }, [voucherCartListState]);
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <VoucherCartListHeader
        resetAction={() => {
          resetSelectedSinbadVoucher();
          resetSelectedSellerVoucher();
          voucherLocalDataAction.reset();
        }}
      />
    );
  };
  /** => search section */
  const renderSearchSection = () => {
    return (
      <VoucherSearch
        keyword={keyword}
        handleChangeKeyword={changeKeyword}
        handleResetVoucherData={resetVoucherData}
        handleSearchVoucher={searchVoucher}
      />
    );
  };
  /** => sinbad voucher list */
  const renderSinbadVoucherList = () => {
    if (sinbadVoucher.length === 0) {
      return null;
    }
    return (
      <SinbadVoucherList
        sinbadVoucher={sinbadVoucher}
        selectedSinbadVoucher={selectedSinbadVoucher}
        selectedSellerVoucher={selectedSellerVoucher}
        setSelectedSinbadVoucher={setSelectedSinbadVoucher}
      />
    );
  };
  /** => seller voucher list */
  const renderSellerVoucherList = () => {
    return (
      <SellerVoucherList
        sellerVoucher={sellerVoucher}
        selectedSellerVoucher={selectedSellerVoucher}
        selectedSinbadVoucher={selectedSinbadVoucher}
        setSelectedSellerVoucher={setSelectedSellerVoucher}
      />
    );
  };
  /** => footer section */
  const renderFooterSection = () => {
    if (
      (selectedSinbadVoucher === null && selectedSellerVoucher.length === 0) ||
      voucherCartListState.data === null
    ) {
      return null;
    }
    return (
      <VoucherFooter
        selectedSinbadVoucher={selectedSinbadVoucher}
        selectedSellerVoucher={selectedSellerVoucher}
      />
    );
  };
  /** => empty */
  const renderEmpty = (messageTitle: string, messageBody: string) => {
    const image = () => {
      return (
        <Image
          source={require('../../../../assets/images/voucher_empty.png')}
          style={VoucherCartListStyles.emptyImage}
        />
      );
    };
    return (
      <View style={VoucherCartListStyles.singleContainer}>
        <SnbEmptyData
          title={messageTitle}
          subtitle={messageBody}
          image={image()}
        />
      </View>
    );
  };
  /** => voucher section */
  const renderVoucherSection = () => {
    if (
      voucherCartListState.data?.sinbadVouchers.length === 0 &&
      voucherCartListState.data?.sellerVouchers.length === 0
    ) {
      return renderEmpty(
        'Voucher Tidak Tersedia',
        'Tidak ada voucher yang tersedia untuk saat ini',
      );
    } else if (
      sinbadVoucher.length === 0 &&
      sellerVoucher.length === 0 &&
      keyword !== ''
    ) {
      return renderEmpty(
        'Voucher Tidak Ditemukan',
        'Voucher yang anda cari tidak ditemukan',
      );
    } else {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSinbadVoucherList()}
          {renderSellerVoucherList()}
        </ScrollView>
      );
    }
  };
  /** => error modal */
  const renderErrorModal = () => {
    return (
      <BottomSheetError
        open={errorModal.isOpen}
        error={voucherCartListState.error}
        closeAction={() => {
          errorModal.setOpen(false);
          goBack();
        }}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {renderSearchSection()}
      {!voucherCartListState.loading && voucherCartListState.data !== null ? (
        renderVoucherSection()
      ) : (
        <LoadingPage />
      )}
      {renderFooterSection()}
      {/* modal */}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default VoucherCartListView;
