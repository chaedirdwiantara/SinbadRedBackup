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
import { ScrollView } from 'react-native-gesture-handler';
import {
  color,
  SnbContainer,
  SnbTopNav2,
  SnbText2,
  SnbButton2,
  SnbIcon,
  SnbSkeletonAnimator,
  spacingV2 as layout,
  borderV2,
} from 'react-native-sinbad-ui';
import { ErrorContent, SnbCardButtonType3 } from '../shared';

const CompleteDataSkeleton: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: layout.spacing.xxl,
        paddingHorizontal: layout.spacing.lg,
      }}>
      <SnbSkeletonAnimator>
        <View style={{ height: 40, borderRadius: borderV2.radius.sm }} />
        <View style={{ marginVertical: layout.spacing.sm }} />
        <View
          style={{ height: 24, borderRadius: borderV2.radius.sm, width: 120 }}
        />
        <View style={{ marginVertical: layout.spacing.xxl }} />
        <View style={{ height: 84, borderRadius: borderV2.radius.md }} />
        <View style={{ marginVertical: layout.spacing.xsm }} />
        <View style={{ height: 84, borderRadius: borderV2.radius.md }} />
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
            paddingHorizontal: layout.spacing.lg,
            paddingVertical: layout.spacing.xl,
          }}>
          <SnbText2.Headline.Default>
            Selangkah Lagi Untuk Mengembangkan Toko Anda
          </SnbText2.Headline.Default>
          <View style={{ marginVertical: layout.spacing.sm }} />
          <SnbText2.Paragraph.Default>
            Silakan lengkapi data untuk menjadi anggota VIP
          </SnbText2.Paragraph.Default>
          <View style={{ marginVertical: layout.spacing.xl }} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <SnbCardButtonType3
              title="Data Diri"
              desc="1-2 Menit Pengisian"
              onPress={() => navigate(DATA_DIRI_STEP_1_VIEW)}
              svgIcon={() => <Svg name="personal_data" size={48} />}
              showBadge={!isShowBadgeSuccessUser}
            />
            <View style={{ marginVertical: layout.spacing.xsm }} />
            <SnbCardButtonType3
              title="Data Toko"
              desc="1-2 Menit Pengisian"
              onPress={() => navigate(DATA_TOKO_STEP_1_VIEW)}
              svgIcon={() => <Svg name="store_data" size={48} />}
              showBadge={!isShowBadgeSuccessBuyer}
            />
          </ScrollView>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: layout.spacing.lg,
              alignItems: 'center',
              backgroundColor: color.blue10,
              paddingHorizontal: layout.spacing.lg,
              paddingVertical: layout.spacing.md,
              borderRadius: borderV2.radius.sm,
            }}>
            <SnbIcon name="verified_user" color={color.blue50} size={24} />
            <View style={{ flex: 1, marginLeft: layout.spacing.sm }}>
              <SnbText2.Paragraph.Small color={color.blue60}>
                Kami menjamin keamanan data dan kerahasiaan informasi yang anda
                berikan.
              </SnbText2.Paragraph.Small>
            </View>
          </View>
          <View style={{ padding: layout.spacing.md }} />
          <View style={{ padding: layout.spacing.lg }}>
            <SnbButton2.Primary
              title="Konfirmasi"
              onPress={() => completeDataConfirmation()}
              disabled={
                !isShowBadgeSuccessBuyer ||
                !isShowBadgeSuccessUser ||
                completeDataConfirmationState.loading
              }
              loading={completeDataConfirmationState.loading}
              full
              size="medium"
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
