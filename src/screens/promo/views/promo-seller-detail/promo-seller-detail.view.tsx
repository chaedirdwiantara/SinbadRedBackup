/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  color,
  SnbCardInfoType2,
  SnbText,
} from 'react-native-sinbad-ui';
import moment from 'moment';
/** === IMPORT COMPONENT HERE === */
import SnbTextSeeMore from '@core/components/TextSeeMore';
import LoadingPage from '@core/components/LoadingPage';
import BottomModalError from '@core/components/BottomModalError';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  usePromoSellerAction,
  useStandardModalState,
} from '../../functions';
import { PromoPaymentDetailStyles } from '../../styles';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { NavigationAction } from '@core/functions/navigation';
import { contexts } from '@contexts';
/** === COMPONENT === */
const PromoDetail: FC = () => {
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const promoGeneralAction = usePromoSellerAction();
  const promoSellerDetailState = statePromo.promoSeller.detail;
  const { id } = NavigationAction.useGetNavParams().params;
  const promoSellerDetailError = useStandardModalState();
  /** === HOOK === */
  /** => effect */
  React.useEffect(() => {
    promoGeneralAction.detail(dispatchPromo, id);
    return () => {
      promoGeneralAction.reset(dispatchPromo);
    };
  }, []);
  React.useEffect(() => {
    if (statePromo.promoSeller.detail.error !== null) {
      promoSellerDetailError.setOpen(true);
    }
  }, [statePromo.promoSeller.detail.error]);
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
    if (
      promoSellerDetailState.data?.imageUrl !== '' &&
      promoSellerDetailState.data?.imageUrl !== null
    ) {
      return (
        <Image
          source={{
            uri: promoSellerDetailState.data?.imageUrl,
          }}
          style={{
            aspectRatio: 4 / 2,
            height: undefined,
            width: '100%',
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            aspectRatio: 4 / 2,
            height: undefined,
            width: '100%',
            backgroundColor: color.red50,
          }}
        />
      );
    }
  };
  /** => promo card information */
  const renderPromoCardInformation = () => {
    if (promoSellerDetailState.data === null) {
      return null;
    }
    return (
      <View style={{ marginTop: -40 }}>
        <SnbCardInfoType2.Header title={promoSellerDetailState.data.name}>
          <SnbCardInfoType2.Row
            label={'Berlaku Sampai'}
            text={moment(new Date(promoSellerDetailState.data.endDate)).format(
              'DD MMM YYYY',
            )}
          />
        </SnbCardInfoType2.Header>
      </View>
    );
  };
  /** => voucher description */
  const renderPromoDescription = () => {
    if (promoSellerDetailState.data === null) {
      return null;
    }
    return (
      <View style={PromoPaymentDetailStyles.sectionContainer}>
        <SnbTextSeeMore
          maxLine={3}
          toggleColor={color.red50}
          toggleShowMore={'Lihat Semua'}
          toggleShowLess={'Lihat Lebih Sedikit'}
          content={
            <SnbText.B1>
              {promoSellerDetailState.data.shortDescription}
            </SnbText.B1>
          }
        />
      </View>
    );
  };
  /** => error modal */
  const renderErrorModal = () => {
    return (
      <BottomModalError
        isOpen={promoSellerDetailError.isOpen}
        errorTitle={'Terjadi kesalahan'}
        errorSubtitle={'Silahkan mencoba kembali'}
        errorImage={require('../../../../assets/images/cry_sinbad.png')}
        buttonTitle={'Ok'}
        buttonOnPress={() => {
          promoSellerDetailError.setOpen(false);
          goBack();
        }}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {!promoSellerDetailState.loading &&
      promoSellerDetailState.data !== null ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderBanner()}
          {renderPromoCardInformation()}
          {renderPromoDescription()}
        </ScrollView>
      ) : (
        <LoadingPage />
      )}
      {/* modal */}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default PromoDetail;
