import React, { FC } from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  color,
  SnbCardInfoType2,
  SnbText,
  SnbDivider,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import { goBack, usePromoGeneralAction } from '../functions';
import { PromoPaymentDetailStyles } from '../styles';
import { contexts } from '@contexts';
import SnbTextSeeMore from '@core/components/TextSeeMore';
import LoadingPage from '@core/components/LoadingPage';
/** === COMPONENT === */
const PromoDetail: FC = ({ route }: any) => {
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const promoGeneralAction = usePromoGeneralAction();
  const promoGeneralDetailState = statePromo.promoGeneral.detail;
  /** === HOOK === */
  /** => effect */
  React.useEffect(() => {
    promoGeneralAction.detail(dispatchPromo, '1');
    return () => {
      promoGeneralAction.reset(dispatchPromo);
    };
  }, []);
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <View
        style={{ width: '100%', position: 'absolute', zIndex: 1000, top: 0 }}>
        <SnbTopNav.Type5
          type={'transparent1'}
          backAction={() => goBack()}
          title={''}
          iconAction={() => {}}
          iconName={'cart'}
          iconValue={10}
        />
      </View>
    );
  };
  /** => banner */
  const renderBanner = () => {
    return (
      <Image
        source={{
          uri: promoGeneralDetailState.data?.imageUrl,
        }}
        style={{
          height: 180,
          width: '100%',
        }}
      />
    );
  };
  /** => promo card information */
  const renderPromoCardInformation = () => {
    if (promoGeneralDetailState.data === null) {
      return null;
    }
    return (
      <View style={{ marginTop: -90 }}>
        <SnbCardInfoType2.Header title={promoGeneralDetailState.data.name}>
          <SnbCardInfoType2.Row
            label={'Berlaku Sampai'}
            text={moment(
              new Date(promoGeneralDetailState.data.startDate),
            ).format('DD MMM YYYY')}
          />
        </SnbCardInfoType2.Header>
      </View>
    );
  };
  /** => voucher description */
  const renderPromoDescription = () => {
    if (promoGeneralDetailState.data === null) {
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
              {promoGeneralDetailState.data.shortDescription}
            </SnbText.B1>
          }
        />
      </View>
    );
  };
  /** => promo TnC */
  const renderPromoTnC = () => {
    if (promoGeneralDetailState.data === null) {
      return null;
    }
    return (
      <View style={PromoPaymentDetailStyles.sectionContainer}>
        <View>
          <SnbText.B2>Syarat dan Ketentuan</SnbText.B2>
        </View>
        <SnbDivider style={{ marginVertical: 8 }} />
        <View style={{ marginRight: 20 }}>
          {promoGeneralDetailState.data.termsAndCondition.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginBottom: 4,
                }}>
                <View style={{ marginRight: 8, width: 20 }}>
                  <SnbText.B1>{index + 1}.</SnbText.B1>
                </View>
                <SnbText.B1>{item}</SnbText.B1>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {!promoGeneralDetailState.loading &&
      promoGeneralDetailState.data !== null ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderBanner()}
          {renderPromoCardInformation()}
          {renderPromoDescription()}
          {renderPromoTnC()}
        </ScrollView>
      ) : (
        <LoadingPage />
      )}
    </SnbContainer>
  );
};

export default PromoDetail;
