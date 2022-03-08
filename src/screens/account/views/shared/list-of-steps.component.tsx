import React, { FC } from 'react';
import {
  SnbText,
  color as colors,
  SnbCardButtonType1,
  SnbBottomSheet,
} from '@sinbad/react-native-sinbad-ui';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
  DATA_DIRI_STEP_1_VIEW,
  DATA_DIRI_STEP_2_VIEW,
  DATA_DIRI_STEP_3_VIEW,
  DATA_DIRI_STEP_4_VIEW,
  DATA_DIRI_STEP_5_VIEW,
  DATA_DIRI_STEP_6_VIEW,
} from '@screen/account/functions/screens_name';
import {
  DATA_TOKO_STEP_1_VIEW,
  DATA_TOKO_STEP_2_VIEW,
  DATA_TOKO_STEP_3_VIEW,
} from '@screen/account/functions/screens_name';
import { useEasyRegistration } from '@screen/account/functions';

interface ListOfStepsProps {
  type: 'user' | 'buyer';
  closeModal: () => void;
  open: boolean;
}

const ListOfSteps: FC<ListOfStepsProps> = (props) => {
  const { completeDataState } = useEasyRegistration();
  const { navigate } = useNavigation();
  const dataUser = [
    {
      title: 'Nama Lengkap',
      value: completeDataState?.data?.user?.isFullName || false,
    },
    {
      title: 'Foto KTP',
      value: completeDataState?.data?.user?.isIdImageUrl || false,
    },
    {
      title: 'Foto NPWP',
      value: completeDataState?.data?.user?.isTaxImageUrl || false,
    },
    {
      title: 'Foto Selfie dengan KTP',
      value: completeDataState?.data?.user?.isSelfieImageUrl || false,
    },
    {
      title: 'Konfirmasi Kartu Identitas',
      value: completeDataState?.data?.user?.isValidIdNumber || true,
    },
    {
      title: 'Email',
      value: completeDataState?.data?.user?.isEmail || false,
    },
  ];
  const dataBuyer = [
    {
      title: 'Informasi Toko',
      value: completeDataState?.data?.buyer?.isBuyerInformation || false,
    },
    {
      title: 'Foto Toko',
      value: completeDataState?.data?.buyer?.isImageUrl || false,
    },
    {
      title: 'Alamat Toko',
      value: completeDataState?.data?.buyer?.isAddress || false,
    },
  ];

  const checkContentDisable = (item: any, index: number) => {
    if (
      index === 0 ||
      item.value ||
      (props.type === 'user'
        ? dataUser[index - 1].value
        : dataBuyer[index - 1].value)
    ) {
      return false;
    }
    return true;
  };

  const goTo = (index: number) => {
    props.closeModal();
    if (props.type === 'user') {
      switch (index) {
        case 0:
          navigate(DATA_DIRI_STEP_1_VIEW);
          break;
        case 1:
          navigate(DATA_DIRI_STEP_2_VIEW);
          break;
        case 2:
          navigate(DATA_DIRI_STEP_3_VIEW);
          break;
        case 3:
          navigate(DATA_DIRI_STEP_4_VIEW);
          break;
        case 4:
          navigate(DATA_DIRI_STEP_5_VIEW);
          break;
        case 5:
          navigate(DATA_DIRI_STEP_6_VIEW);
          break;
        default:
          break;
      }
    }
    if (props.type === 'buyer') {
      switch (index) {
        case 0:
          navigate(DATA_TOKO_STEP_1_VIEW);
          break;
        case 1:
          navigate(DATA_TOKO_STEP_2_VIEW);
          break;
        case 2:
          navigate(DATA_TOKO_STEP_3_VIEW);
          break;
        default:
          break;
      }
    }
  };

  const renderContentUser = () => {
    return dataUser.map((item, index) => {
      const disable = checkContentDisable(item, index);
      return (
        <View style={{ marginBottom: 16, marginHorizontal: 16 }} key={index}>
          <SnbCardButtonType1
            type={disable ? 'waiting' : 'goTo'}
            onPress={() => goTo(index)}
            title={item.title}
            disabled={disable}
          />
        </View>
      );
    });
  };

  const renderContentBuyer = () => {
    return dataBuyer.map((item, index) => {
      const disable = checkContentDisable(item, index);
      return (
        <View style={{ marginBottom: 16, marginHorizontal: 16 }} key={index}>
          <SnbCardButtonType1
            type={disable ? 'waiting' : 'goTo'}
            onPress={() => goTo(index)}
            title={item.title}
            disabled={disable}
          />
        </View>
      );
    });
  };
  const renderContent = () => {
    return (
      <ScrollView>
        <View style={{ marginVertical: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <SnbText.B3 color={colors.black60}>
              Pastikan data yang anda masukkan sudah benar
            </SnbText.B3>
          </View>
        </View>
        {props.type === 'user' ? renderContentUser() : renderContentBuyer()}
      </ScrollView>
    );
  };
  return (
    <View>
      <SnbBottomSheet
        title={
          props.type === 'user'
            ? 'Konfirmasi Data Diri'
            : 'Konfirmasi Data Toko'
        }
        open={props.open}
        content={renderContent()}
        closeAction={props.closeModal}
        actionIcon="close"
      />
    </View>
  );
};

export default ListOfSteps;
