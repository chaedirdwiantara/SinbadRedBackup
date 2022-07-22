import { useAuthCoreAction } from '@core/functions/auth';
import { useNavigation } from '@react-navigation/native';
import { useCoachmark, useEasyRegistration } from '@screen/account/functions';
import {
  DATA_DIRI_STEP_1_VIEW,
  DATA_TOKO_STEP_1_VIEW,
} from '@screen/account/functions/screens_name';
import { renderIF } from '@screen/auth/functions';
import Svg from '@svg';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  colorV2,
  SnbContainer,
  SnbTopNav2,
  SnbText2,
  SnbButton2,
  SnbIcon,
  SnbSkeletonAnimator,
  spacingV2 as layout,
  borderV2,
  styles,
} from 'react-native-sinbad-ui';
import { ErrorContent, SnbCardButtonType3 } from '../shared';

const CompleteDataSkeleton: React.FC = () => {
  return (
    <View style={{ marginVertical: layout.spacing.xxl }}>
      {[0, 1].map((el, idx) => {
        return (
          <View
            key={idx}
            style={{
              borderRadius: borderV2.radius.md,
              borderColor: colorV2.strokeColor.disable,
              padding: layout.spacing.lg,
              ...styles.shadowForBox5,
              marginBottom: layout.spacing.lg,
            }}>
            <SnbSkeletonAnimator backgroundColor={colorV2.bgColor.neutral}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: borderV2.radius.full,
                  }}
                />
                <View style={{ flex: 1, marginHorizontal: layout.spacing.lg }}>
                  <View
                    style={{ height: 16, marginRight: layout.spacing.xl }}
                  />
                  <View style={{ marginVertical: layout.spacing.xxsm }} />
                  <View
                    style={{ height: 16, marginRight: layout.spacing['3xl'] }}
                  />
                </View>
                <View
                  style={{
                    height: 24,
                    width: 24,
                    borderRadius: borderV2.radius.full,
                  }}
                />
              </View>
            </SnbSkeletonAnimator>
          </View>
        );
      })}
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
      <>
        <View style={{ marginVertical: layout.spacing.xl }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SnbCardButtonType3
            title="Data Diri"
            desc="1-2 Menit Pengisian"
            onPress={() => navigate(DATA_DIRI_STEP_1_VIEW)}
            svgIcon={() => <Svg name="personal_data" size={48} />}
            showBadge={isShowBadgeSuccessUser}
          />
          <View style={{ marginVertical: layout.spacing.xsm }} />
          <SnbCardButtonType3
            title="Data Toko"
            desc="1-2 Menit Pengisian"
            onPress={() => navigate(DATA_TOKO_STEP_1_VIEW)}
            svgIcon={() => <Svg name="store_data" size={48} />}
            showBadge={isShowBadgeSuccessBuyer}
          />
        </ScrollView>
      </>
    );
  }

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
        {renderIF(
          completeDataState?.data,
          renderListCompletion(),
          <CompleteDataSkeleton />,
        )}
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: layout.spacing.lg,
            alignItems: 'center',
            backgroundColor: colorV2.bgColor.blue,
            paddingHorizontal: layout.spacing.lg,
            paddingVertical: layout.spacing.md,
            borderRadius: borderV2.radius.sm,
          }}>
          <SnbIcon name="shield" color={colorV2.iconColor.blue} size={14} />
          <View style={{ flex: 1, marginLeft: layout.spacing.sm }}>
            <SnbText2.Paragraph.Small color={colorV2.textColor.link}>
              Kami menjamin keamanan data dan kerahasiaan informasi yang anda
              berikan.
            </SnbText2.Paragraph.Small>
          </View>
        </View>
        <View style={{ marginVertical: layout.spacing.sm }} />
        <View style={{ margin: layout.spacing.lg }}>
          <SnbButton2.Primary
            title="Konfirmasi"
            onPress={() => completeDataConfirmation()}
            disabled={
              !isShowBadgeSuccessBuyer ||
              !isShowBadgeSuccessUser ||
              completeDataConfirmationState.loading ||
              completeDataState.loading
            }
            loading={completeDataConfirmationState.loading}
            full
            size="medium"
          />
        </View>
      </View>
    </View>
  );
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
