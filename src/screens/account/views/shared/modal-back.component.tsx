import React, { FC } from 'react';
import {
  SnbText2,
  SnbBottomSheet,
  SnbButton2,
  spacingV2 as layout,
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
      <View style={{ alignItems: 'center' }}>
        <View style={{ marginVertical: layout.spacing.lg }}>
          <Svg name="completeness_back" size={180} />
        </View>
        <SnbText2.Headline.Default align="center">
          Yakin Ingin Keluar?
        </SnbText2.Headline.Default>
        <View
          style={{
            marginVertical: layout.spacing.lg,
            marginHorizontal: layout.spacing.xl,
          }}>
          <SnbText2.Paragraph.Default align="center">
            Jangan khawatir, data yang telah Anda masukkan otomatis tersimpan
          </SnbText2.Paragraph.Default>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: layout.spacing.lg,
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
          <View style={{ marginHorizontal: layout.spacing.sm }} />
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
