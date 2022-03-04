import { useNavigation } from '@react-navigation/native';
import { useEasyRegistration } from '@screen/account/functions';
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
  SnbTopNav,
  SnbText,
  SnbButton,
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
  const { navigate } = useNavigation();
  const { getCompleteData, completeDataState } = useEasyRegistration();

  React.useEffect(() => {
    getCompleteData();
  }, []);

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

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: color.black10,
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 32,
        }}>
        <SnbText.H3>Selangkah Lagi Untuk Mengembangkan Toko Anda</SnbText.H3>
        <View style={{ marginVertical: 8 }} />
        <SnbText.B1>Silakan lengkapi data untuk menjadi anggota VIP</SnbText.B1>
        <View style={{ marginVertical: 32 }} />
        <SnbCardButtonType3
          title="Data Diri"
          desc="1-2 Menit Pengisian"
          onPress={() => navigate(DATA_DIRI_STEP_1_VIEW)}
          svgIcon={() => <Svg name="personal_data" size={48} />}
        />
        <View style={{ marginVertical: 6 }} />
        <SnbCardButtonType3
          title="Data Toko"
          desc="1-2 Menit Pengisian"
          onPress={() => navigate(DATA_TOKO_STEP_1_VIEW)}
          svgIcon={() => <Svg name="store_data" size={48} />}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            alignItems: 'center',
          }}>
          <SnbIcon name="verified_user" color={color.blue50} size={24} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <SnbText.B3 color={color.black40}>
              Kami menjamin keamanan data dan kerahasiaan informasi yang anda
              berikan.
            </SnbText.B3>
          </View>
        </View>
        <View style={{ marginVertical: 16 }} />
        <View style={{ height: 72 }}>
          <SnbButton.Single
            title="Konfirmasi"
            onPress={() => {}}
            type="primary"
            disabled
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
      <SnbTopNav.Type3 title="Lengkapi Data" type="white" backAction={goBack} />
      <Content />
    </SnbContainer>
  );
};

export default DataCompletenessView;
