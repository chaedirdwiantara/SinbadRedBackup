import { useAuthCoreAction } from '@core/functions/auth';
import { useNavigation } from '@react-navigation/native';
import { useCoachmark, useEasyRegistration } from '@screen/account/functions';
import {
  DATA_DIRI_STEP_1_VIEW,
  DATA_TOKO_STEP_1_VIEW,
} from '@screen/account/functions/screens_name';
import Svg from '@svg';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  SnbText2,
  spacingV2 as layout,
  SnbInfoBox2,
  SpecialButton,
  FooterButton,
} from 'react-native-sinbad-ui';
import { ErrorContent } from '../shared';

const Content: React.FC = () => {
  const { navigate, reset } = useNavigation();
  const {
    getCompleteData,
    completeDataState,
    completeDataConfirmation,
    completeDataConfirmationState,
    resetCompleteDataConfirmation,
  } = useEasyRegistration();
  const { meV2 } = useAuthCoreAction();
  const { getCoachmark } = useCoachmark();

  React.useEffect(() => {
    getCompleteData();
  }, []);

  React.useEffect(() => {
    if (completeDataConfirmationState.data) {
      meV2();
      getCoachmark();
      resetCompleteDataConfirmation();
      reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  }, [completeDataConfirmationState]);

  if (completeDataState.error) {
    return (
      <ErrorContent
        action={getCompleteData}
        message={completeDataState.error?.message}
      />
    );
  }

  const { userProgress, buyerProgress } = completeDataState.data || {};
  const isShowBadgeSuccessUser =
    userProgress?.completed === userProgress?.total;
  const isShowBadgeSuccessBuyer =
    buyerProgress?.completed === buyerProgress?.total;

  function renderListCompletion() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: layout.spacing.lg }}>
        <SpecialButton.Card
          testID={'06.2'}
          loading={completeDataState.data === null}
          title='Data Diri'
          subTitle='1-2 Menit Pengisian'
          onPress={() => navigate(DATA_DIRI_STEP_1_VIEW)}
          iconComponent={<Svg name="personal_data" size={48} />}
          action={true}
          actionType="action"
          infoComponent={
            completeDataState.data !== null && isShowBadgeSuccessUser && (
              <SnbInfoBox2
                testID={'06.2'}
                leftIcon='quest'
                title={"Selesai"}
                color="green"
              />)
          }
        />
        <View style={{ marginVertical: layout.spacing.md }} />
        <SpecialButton.Card
          testID={'06.2'}
          loading={completeDataState.data === null}
          title='Data Toko'
          subTitle='1-2 Menit Pengisian'
          onPress={() => navigate(DATA_TOKO_STEP_1_VIEW)}
          iconComponent={<Svg name="store_data" size={48} />}
          action={true}
          actionType="action"
          infoComponent={
            completeDataState.data !== null && isShowBadgeSuccessBuyer && (
              <SnbInfoBox2
                testID={'06.2'}
                leftIcon='quest'
                title={"Selesai"}
                color="green"
              />)
          }
        />
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: layout.spacing.lg,
          paddingVertical: layout.spacing.xl
        }}>
          <SnbText2.Headline.Default>
            Selangkah Lagi Untuk Mengembangkan Toko Anda
          </SnbText2.Headline.Default>
          <View style={{ marginVertical: layout.spacing.sm }} />
          <SnbText2.Paragraph.Default>
            Silakan lengkapi data untuk menjadi anggota VIP
          </SnbText2.Paragraph.Default>
        </View>
        {renderListCompletion()}
      </View>
      <View>
        <SnbInfoBox2
          testID={'06.2'}
          leftIcon="shield"
          title={"Kami menjamin keamanan data dan kerahasiaan informasi yang anda berikan."}
          color="blue"
        />
        <FooterButton.Single
          title="Konfirmasi"
          buttonPress={() => completeDataConfirmation()}
          disabled={
            !isShowBadgeSuccessBuyer ||
            !isShowBadgeSuccessUser ||
            completeDataConfirmationState.loading ||
            completeDataState.loading
          }
          loadingButton={completeDataConfirmationState.loading}
          testID={'06.2'}
        />
      </View>
    </View>
  );
};

const DataCompletenessView: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        testID={'06.2'}
        title="Lengkapi Data"
        color="white"
        backAction={goBack}
      />
      <Content />
    </SnbContainer>
  );
};

export default DataCompletenessView;
