/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT HERE === */
import LoadingPage from '@core/components/LoadingPage';
import { VoucherDetailHeader } from './voucher-detail-header.view';
import { VoucherDetailDescription } from './voucher-detail-description.view';
import { VoucherDetailTnC } from './voucher-detail-tnc.view';
import { VoucherDetailInstruction } from './voucher-detail-instruction.view';
import BottomSheetError from '@core/components/BottomSheetError';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  useVoucherDetailAction,
  goBack,
  useVoucherDetail,
} from '../../functions';
import { contexts } from '@contexts';
import { NavigationAction } from '@core/functions/navigation';
import { VoucherDetailFooter } from './voucher-detail-footer.view';
/** === INTERFACE === */
interface NavigationParams {
  type: 'eligible' | 'not-eligible';
}
/** === COMPONENT === */
const VoucherDetailView: FC = () => {
  /** === HOOK === */
  const ScrollViewRef = React.useRef<ScrollView>();
  const { dispatchVoucher } = React.useContext(contexts.VoucherContext);
  const voucherDetailAction = useVoucherDetailAction();
  const { data, loading, error } = useVoucherDetail();
  const { id, type } =
    NavigationAction.useGetNavParams<NavigationParams>().params;

  NavigationAction.useCustomBackHardware(() => {
    goBack();
  });

  /** => effect */
  React.useEffect(() => {
    voucherDetailAction.detail(dispatchVoucher, id);
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
          uri: data?.imageUrl,
        }}
        style={{
          aspectRatio: 4 / 2,
          height: undefined,
          width: '100%',
        }}
      />
    );
  };
  /** => voucher description */
  const renderVoucherDescription = () => {
    if (data === null) {
      return null;
    }
    return (
      <VoucherDetailDescription
        name={data.name}
        description={data.descriptions}
      />
    );
  };
  /** => voucher tnc */
  const renderVoucherTnC = () => {
    if (data === null) {
      return null;
    }
    return (
      <VoucherDetailTnC termsAndCondition={data.termAndConditions ?? []} />
    );
  };
  /** => voucher instruction */
  const renderVoucherInstruction = () => {
    if (data === null) {
      return null;
    }
    return <VoucherDetailInstruction instructions={data.howToUse ?? []} />;
  };
  /** => error modal */
  const renderErrorModal = () => {
    return (
      <BottomSheetError
        open={!!error}
        error={error}
        closeAction={() => {
          // voucherDetailError.setOpen(false);
          goBack();
        }}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {!loading ? (
        <ScrollView style={{ margin: 0 }}>
          {renderHeader()}
          {renderBanner()}
          {renderVoucherDescription()}
          <View style={{ backgroundColor: 'white', height: '100%' }}>
            {renderVoucherTnC()}
            {renderVoucherInstruction()}
          </View>
        </ScrollView>
      ) : (
        <LoadingPage />
      )}
      {/* modal */}
      {renderErrorModal()}
      <VoucherDetailFooter
        loading={loading}
        disabled={type === 'not-eligible'}
        onPress={() => {}}
      />
    </SnbContainer>
  );
};

export default VoucherDetailView;
