import { useAuthCoreAction } from '@core/functions/auth';
import { useNavigation } from '@react-navigation/native';
import { useCoachmark, useEasyRegistration } from '@screen/account/functions';
import {
  DATA_DIRI_STEP_1_VIEW,
  DATA_TOKO_STEP_1_VIEW,
} from '@screen/account/functions/screens_name';
import Svg from '@svg';
import React from 'react';
import { View } from 'react-native';
import {
  color,
  SnbContainer,
  SnbTopNav2,
  SnbText2,
  SnbButton2,
  SnbIcon,
  SnbSkeletonAnimator,
} from 'react-native-sinbad-ui';
import { ErrorContent, SnbCardButtonType3 } from '../shared';

const CompleteDataSkeleton: React.FC = () => {
  return (
    <View style={{ flex: 1, paddingVertical: 32, paddingHorizontal: 16 }}>
      <SnbSkeletonAnimator>
        <View style={{ height: 40, borderRadius: 4 }} />
        <View style={{ marginVertical: 8 }} />
        <View style={{ height: 24, borderRadius: 4, width: 120 }} />
        <View style={{ marginVertical: 32 }} />
        <View style={{ height: 84, borderRadius: 8 }} />
        <View style={{ marginVertical: 6 }} />
        <View style={{ height: 84, borderRadius: 8 }} />
      </SnbSkeletonAnimator>
    </View>
  );
};

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

  if (completeDataState.loading) {
    return <CompleteDataSkeleton />;
  }

  if (completeDataState.error) {
    return (
      <ErrorContent
        action={getCompleteData}
        message={completeDataState.error?.message}
      />
    );
  }

  if (completeDataState.data) {
    const { userProgress, buyerProgress } = completeDataState.data || {};
    const isShowBadgeSuccessUser =
      userProgress.completed === userProgress.total;
    const isShowBadgeSuccessBuyer =
      buyerProgress.completed === buyerProgress.total;

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 32,
          }}>
          <SnbText2.Headline.Default>
            Selangkah Lagi Untuk Mengembangkan Toko Anda
          </SnbText2.Headline.Default>
          <View style={{ marginVertical: 8 }} />
          <SnbText2.Paragraph.Default>
            Silakan lengkapi data untuk menjadi anggota VIP
          </SnbText2.Paragraph.Default>
          <View style={{ marginVertical: 32 }} />
          <SnbCardButtonType3
            title="Data Diri"
            desc="1-2 Menit Pengisian"
            onPress={() => navigate(DATA_DIRI_STEP_1_VIEW)}
            svgIcon={() => <Svg name="personal_data" size={48} />}
            showBadge={isShowBadgeSuccessUser}
          />
          <View style={{ marginVertical: 6 }} />
          <SnbCardButtonType3
            title="Data Toko"
            desc="1-2 Menit Pengisian"
            onPress={() => navigate(DATA_TOKO_STEP_1_VIEW)}
            svgIcon={() => <Svg name="store_data" size={48} />}
            showBadge={isShowBadgeSuccessBuyer}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              alignItems: 'center',
              backgroundColor: color.blue10,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 4,
            }}>
            <SnbIcon name="shield" color={color.blue50} size={14} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <SnbText2.Paragraph.Small color={color.blue60}>
                Kami menjamin keamanan data dan kerahasiaan informasi yang anda
                berikan.
              </SnbText2.Paragraph.Small>
            </View>
          </View>
          <View style={{ marginVertical: 16 }} />
          <View style={{ margin: 16 }}>
            <SnbButton2.Primary
              title="Konfirmasi"
              onPress={() => completeDataConfirmation()}
              disabled={
                !isShowBadgeSuccessBuyer ||
                !isShowBadgeSuccessUser ||
                completeDataConfirmationState.loading
              }
              loading={completeDataConfirmationState.loading}
              size="medium"
              full
            />
          </View>
        </View>
      </View>
    );
  }
  return null;
};

const DataCompletenessView: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        title="Lengkapi Data"
        color="white"
        backAction={goBack}
      />
      <Content />
    </SnbContainer>
  );
};

export default DataCompletenessView;
