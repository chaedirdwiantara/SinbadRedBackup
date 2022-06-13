import React, { FC } from 'react';
import {
  SnbText2,
  SnbCardButtonType1,
  SnbBottomSheet2,
  spacingV2 as layout,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
} from '@sinbad/react-native-sinbad-ui';
import { View, ScrollView } from 'react-native';
import {
  DATA_DIRI_STEP_1_VIEW,
  DATA_DIRI_STEP_2_VIEW,
  DATA_DIRI_STEP_3_VIEW,
  DATA_DIRI_STEP_4_VIEW,
} from '@screen/account/functions/screens_name';
import {
  DATA_TOKO_STEP_1_VIEW,
  DATA_TOKO_STEP_2_VIEW,
  DATA_TOKO_STEP_3_VIEW,
} from '@screen/account/functions/screens_name';
import { useEasyRegistration } from '@screen/account/functions';
import { NavigationAction } from '@navigation';

interface ListOfStepsProps {
  type: 'user' | 'buyer';
  closeModal: () => void;
  open: boolean;
}

const ListOfSteps: FC<ListOfStepsProps> = (props) => {
  const { completeDataState } = useEasyRegistration();
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const dataUser = [
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

  React.useEffect(() => {
    props.open
      ? bottomSheetRef.current?.open()
      : bottomSheetRef.current?.close();
  }, [props.open]);

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
          NavigationAction.navigate(DATA_DIRI_STEP_1_VIEW);
          break;
        case 1:
          NavigationAction.navigate(DATA_DIRI_STEP_2_VIEW);
          break;
        case 2:
          NavigationAction.navigate(DATA_DIRI_STEP_3_VIEW);
          break;
        case 3:
          NavigationAction.navigate(DATA_DIRI_STEP_4_VIEW);
          break;
        default:
          break;
      }
    }
    if (props.type === 'buyer') {
      switch (index) {
        case 0:
          NavigationAction.navigate(DATA_TOKO_STEP_1_VIEW);
          break;
        case 1:
          NavigationAction.navigate(DATA_TOKO_STEP_2_VIEW);
          break;
        case 2:
          NavigationAction.navigate(DATA_TOKO_STEP_3_VIEW);
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
        <View style={{ marginBottom: layout.spacing.lg }} key={index}>
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
        <View style={{ marginBottom: layout.spacing.lg }} key={index}>
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
        <View style={{ marginVertical: layout.spacing.lg }}>
          <View style={{ alignItems: 'center' }}>
            <SnbText2.Paragraph.Default>
              Pastikan data {props.type === 'user' ? 'diri' : 'toko'} yang
              tertulis sudah benar
            </SnbText2.Paragraph.Default>
          </View>
        </View>
        {props.type === 'user' ? renderContentUser() : renderContentBuyer()}
      </ScrollView>
    );
  };
  return (
    <SnbBottomSheet2
      title={
        <SnbBottomSheetPart.Title
          title={
            props.type === 'user'
              ? 'Konfirmasi Data Diri'
              : 'Konfirmasi Data Toko'
          }
          titleType="center"
          swipeIndicator
        />
      }
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={() => bottomSheetRef.current?.close()}
        />
      }
      ref={bottomSheetRef}
      content={renderContent()}
      close={props.closeModal}
      name="modal-list-of-step"
      type="m-l"
    />
  );
};

export default ListOfSteps;
