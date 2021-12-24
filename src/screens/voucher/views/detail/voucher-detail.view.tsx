/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { Image, ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT HERE === */
import LoadingPage from '@core/components/LoadingPage';
import { VoucherDetailHeader } from './voucher-detail-header.view';
import { VoucherDetailCardInfo } from './voucher-detail-card-info.view';
import { VoucherDetailDescription } from './voucher-detail-description.view';
import { VoucherDetailTnC } from './voucher-detail-tnc.view';
import { VoucherDetailInstruction } from './voucher-detail-instruction.view';
import BottomSheetError from '@core/components/BottomSheetError';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  useVoucherDetailAction,
  useStandardModalState,
  goBack,
} from '../../functions';
import { contexts } from '@contexts';
import { NavigationAction } from '@core/functions/navigation';
/** === INTERFACE === */
interface NavigationParams {
  type: string;
}
/** === COMPONENT === */
const VoucherDetailView: FC = () => {
  /** === HOOK === */
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const voucherDetailState = stateVoucher.voucherGeneral.detail;
  const voucherDetailAction = useVoucherDetailAction();
  const { id, type } =
    NavigationAction.useGetNavParams<NavigationParams>().params;
  const voucherDetailError = useStandardModalState();
  /** => effect */
  React.useEffect(() => {
    voucherDetailAction.detail(dispatchVoucher, id, type);
    return () => {
      voucherDetailAction.reset(dispatchVoucher);
    };
  }, []);
  React.useEffect(() => {
    if (stateVoucher.voucherGeneral.detail.error !== null) {
      voucherDetailError.setOpen(true);
    }
  }, [stateVoucher.voucherGeneral.detail.error]);
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return <VoucherDetailHeader />;
  };
  /** => banner */
  const renderBanner = () => {
    return (
      <Image
        source={{
          uri: voucherDetailState.data?.imageUrl,
        }}
        style={{
          aspectRatio: 4 / 2,
          height: undefined,
          width: '100%',
        }}
      />
    );
  };
  /** => voucher card information */
  const renderVoucherCardInformation = () => {
    if (voucherDetailState.data === null) {
      return null;
    }
    return (
      <VoucherDetailCardInfo
        voucherName={voucherDetailState.data.voucherName}
        voucherCode={voucherDetailState.data.uniqueCode}
        expiredAt={voucherDetailState.data.expiredAt}
      />
    );
  };
  /** => voucher description */
  const renderVoucherDescription = () => {
    if (voucherDetailState.data === null) {
      return null;
    }
    return (
      <VoucherDetailDescription
        voucherDescription={voucherDetailState.data?.voucherDescription}
      />
    );
  };
  /** => voucher tnc */
  const renderVoucherTnC = () => {
    if (voucherDetailState.data === null) {
      return null;
    }
    return (
      <VoucherDetailTnC
        termsAndCondition={voucherDetailState.data.termsAndCondition}
      />
    );
  };
  /** => voucher instruction */
  const renderVoucherInstruction = () => {
    if (voucherDetailState.data === null) {
      return null;
    }
    return (
      <VoucherDetailInstruction
        instructions={voucherDetailState.data.instructions}
      />
    );
  };
  /** => error modal */
  const renderErrorModal = () => {
    return (
      <BottomSheetError
        open={voucherDetailError.isOpen}
        error={stateVoucher.voucherGeneral.detail.error}
        closeAction={() => {
          voucherDetailError.setOpen(false);
          goBack();
        }}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {!voucherDetailState.loading && voucherDetailState.data !== null ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderBanner()}
          {renderVoucherCardInformation()}
          {renderVoucherDescription()}
          {renderVoucherTnC()}
          {renderVoucherInstruction()}
        </ScrollView>
      ) : (
        <LoadingPage />
      )}
      {/* modal */}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default VoucherDetailView;
