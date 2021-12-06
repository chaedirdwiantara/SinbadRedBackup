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
/** === IMPORT INTERNAL FUNCTION HERE === */
import { useVoucherDetailAction } from '../../functions';
import { contexts } from '@contexts';
/** === COMPONENT === */
const VoucherDetailView: FC = ({ route }: any) => {
  /** === HOOK === */
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const voucherDetailState = stateVoucher.voucherGeneral.detail;
  const voucherDetailAction = useVoucherDetailAction();
  /** => effect */
  React.useEffect(() => {
    voucherDetailAction.detail(
      dispatchVoucher,
      route.params.voucherId,
      route.params.type,
    );
    return () => {
      voucherDetailAction.reset(dispatchVoucher);
    };
  }, []);
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
          height: 180,
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
        voucherCode={voucherDetailState.data.voucherCode}
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
    </SnbContainer>
  );
};

export default VoucherDetailView;
