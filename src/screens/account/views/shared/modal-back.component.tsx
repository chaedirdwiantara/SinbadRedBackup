import React, { FC } from 'react';
import {
  SnbText2,
  color as colors,
  SnbBottomSheet,
  SnbButton2,
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
          <SnbText2.Headline.Default color={colors.black100}>
            Yakin Ingin Keluar?
          </SnbText2.Headline.Default>
        </View>
        <View style={{ marginVertical: 16, marginHorizontal: 24 }}>
          <View style={{ alignItems: 'center' }}>
            <SnbText2.Paragraph.Default color={colors.black60} align="center">
              Jangan khawatir, data yang telah Anda masukkan otomatis tersimpan
            </SnbText2.Paragraph.Default>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 16,
          }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              onPress={() => props.closeModal()}
              title="Batal"
              disabled={false}
              size="medium"
              full
              outline
            />
          </View>
          <View style={{ marginHorizontal: 8 }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              onPress={() => props.confirm()}
              title="Ya, Keluar"
              disabled={updateCompleteDataState.loading}
              loading={updateCompleteDataState.loading}
              size="medium"
              full
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
