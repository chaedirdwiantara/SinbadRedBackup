import React, { FC } from 'react';
import {
  SnbText,
  color as colors,
  SnbBottomSheet,
  SnbButton,
} from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
import Svg from '@svg';
import { useEasyRegistration } from '@screen/account/functions';

interface ListOfStepsProps {
  closeModal: () => void;
  open: boolean;
  confirm: () => void;
}

const ModalBack: FC<ListOfStepsProps> = (props) => {
  const { updateCompleteDataState } = useEasyRegistration();

  const renderContent = () => {
    return (
      <View>
        <View style={{ alignItems: 'center', marginVertical: 16 }}>
          <Svg name="completeness_back" size={180} />
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 24 }}>
          <SnbText.H3 color={colors.black100}>Yakin Ingin Keluar?</SnbText.H3>
        </View>
        <View style={{ marginVertical: 16, marginHorizontal: 24 }}>
          <View style={{ alignItems: 'center' }}>
            <SnbText.B1 color={colors.black60} align="center">
              Jangan khawatir, data yang Anda masukkan otomatis tersimpan
            </SnbText.B1>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, height: 75 }}>
            <SnbButton.Single
              type="secondary"
              onPress={() => props.closeModal()}
              title="Batal"
            />
          </View>
          <View style={{ flex: 1, height: 75 }}>
            <SnbButton.Single
              type="primary"
              onPress={() => props.confirm()}
              title="Ya, Keluar"
              disabled={updateCompleteDataState.loading}
              loading={updateCompleteDataState.loading}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <SnbBottomSheet open={props.open} content={renderContent()} />
    </View>
  );
};

export default ModalBack;
