import React, { FC } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import {
  color,
  SnbBottomSheet,
  SnbCardInfoType2,
  SnbContainer,
  SnbDivider,
  SnbText,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import {
  goBack,
  useVoucherListItemModal,
  useVoucherDetailAction,
} from '../functions';
import { VoucherDetailStyles } from '../styles';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { contexts } from '@contexts';
import SnbTextSeeMore from '@core/components/TextSeeMore';
import LoadingPage from '@core/components/LoadingPage';
/** === COMPONENT === */
const VoucherDetailView: FC = ({ route }: any) => {
  /** === HOOK === */
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const voucherDetailState = stateVoucher.voucherGeneral.detail;
  const {
    handleOpenInstructionModal,
    handleCloseInstructionModal,
    handleOpenTncModal,
    handleCloseTnCModal,
    isTncModalOpen,
    isInstructionModalOpen,
  } = useVoucherListItemModal();
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
    return (
      <View
        style={{ width: '100%', position: 'absolute', zIndex: 1000, top: 0 }}>
        <SnbTopNav.Type3
          type={'transparent1'}
          backAction={() => goBack()}
          title={''}
        />
      </View>
    );
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
      <View style={{ marginTop: -40 }}>
        <SnbCardInfoType2.Header title={voucherDetailState.data?.voucherName}>
          <SnbCardInfoType2.Row
            label={'Berlaku Sampai'}
            text={moment(new Date(voucherDetailState.data?.expiredAt)).format(
              'DD MMMM YYYY',
            )}
          />
          <SnbCardInfoType2.Row
            label={'Kode Voucher'}
            text={voucherDetailState.data.voucherCode}
          />
        </SnbCardInfoType2.Header>
      </View>
    );
  };
  /** => voucher description */
  const renderVoucherDescription = () => {
    return (
      <View style={VoucherDetailStyles.sectionContainer}>
        <SnbTextSeeMore
          maxLine={3}
          toggleColor={color.red50}
          toggleShowMore={'Lihat Semua'}
          toggleShowLess={'Lihat Lebih Sedikit'}
          content={
            <SnbText.B1>
              {voucherDetailState.data?.voucherDescription}
            </SnbText.B1>
          }
        />
        <SnbDivider style={{ marginTop: 20 }} />
      </View>
    );
  };
  /** => voucher tnc */
  const renderVoucherTnC = () => {
    if (voucherDetailState.data === null) {
      return null;
    }
    return (
      <View style={VoucherDetailStyles.sectionContainer}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.B2>Syarat dan Ketentuan</SnbText.B2>
        </View>
        {renderListItem(voucherDetailState.data?.termsAndCondition, false)}
        <View style={{ marginTop: 8 }}>
          {voucherDetailState.data.termsAndCondition.length > 3 ? (
            <TouchableOpacity onPress={() => handleOpenTncModal()}>
              <SnbText.B1 color={color.red50}>Baca Selengkapnya</SnbText.B1>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        {renderListItemModal(
          voucherDetailState.data?.termsAndCondition,
          'Syarat dan Ketentuan',
          isTncModalOpen,
          handleCloseTnCModal,
        )}
      </View>
    );
  };
  /** => voucher instruction */
  const renderVoucherInstruction = () => {
    if (voucherDetailState.data === null) {
      return null;
    }
    return (
      <View style={VoucherDetailStyles.sectionContainer}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.B2>Cara Pakai</SnbText.B2>
        </View>
        {renderListItem(voucherDetailState.data?.instructions, false)}
        <View style={{ marginTop: 8 }}>
          {voucherDetailState.data?.instructions.length > 3 ? (
            <TouchableOpacity onPress={() => handleOpenInstructionModal()}>
              <SnbText.B1 color={color.red50}>Baca Selengkapnya</SnbText.B1>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        {renderListItemModal(
          voucherDetailState.data?.instructions,
          'Cara Pakai',
          isInstructionModalOpen,
          handleCloseInstructionModal,
        )}
      </View>
    );
  };
  /** => list item  */
  const renderListItem = (listItem: string[], isFull: boolean) => {
    return (
      <View style={{ marginRight: 20 }}>
        {listItem.map((item, index) => {
          if (isFull) {
            return (
              <View
                key={index}
                style={{ flexDirection: 'row', marginBottom: 4 }}>
                <View style={{ marginRight: 8, width: 20 }}>
                  <SnbText.B1>{index + 1}.</SnbText.B1>
                </View>
                <SnbText.B1>{item}</SnbText.B1>
              </View>
            );
          } else {
            return (
              index < 3 && (
                <View
                  key={index}
                  style={{ flexDirection: 'row', marginBottom: 4 }}>
                  <View style={{ marginRight: 8, width: 20 }}>
                    <SnbText.B1>{index + 1}.</SnbText.B1>
                  </View>
                  <SnbText.B1>{item}</SnbText.B1>
                </View>
              )
            );
          }
        })}
      </View>
    );
  };
  /** => list item modal */
  const renderListItemModal = (
    listItem: string[],
    type: string,
    modalState: boolean,
    modalHandleClose: () => void,
  ) => {
    return (
      <View>
        <SnbBottomSheet
          open={modalState}
          content={
            <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
              {renderListItem(listItem, true)}
            </View>
          }
          title={type}
          actionIcon={'close'}
          closeAction={() => modalHandleClose()}
          size={'fullscreen'}
        />
      </View>
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
