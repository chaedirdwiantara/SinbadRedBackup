import React, { FC } from 'react';
import {
  SnbBottomSheet2,
  SnbButton2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
  Content,
  SnbBottomSheetPart,
} from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
import { useEasyRegistration } from '@screen/account/functions';

interface ListOfStepsProps {
  closeModal: () => void;
  open: boolean;
  confirm: () => void;
}

const ForceRegistrationModal: FC<ListOfStepsProps> = (props) => {
  const { updateCompleteDataState } = useEasyRegistration();
  const [contentHeight, setContentHeight] = React.useState(0);
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);

  React.useEffect(() => {
    props.open
      ? bottomSheetRef.current?.open()
      : bottomSheetRef.current?.close();
  }, [props.open]);

  const renderContent = () => {
    return (
      <View onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
        <Content.Illustration
          title="Yakin Ingin Keluar?"
          image={require('@image/sinbad_image/back_completeness.png')}
          description="Jangan khawatir, data yang telah Anda masukkan otomatis tersimpan"
          imageStyle={{ height: 180, resizeMode: 'contain' }}
        />
      </View>
    );
  };

  return (
    <View>
      <SnbBottomSheet2
        ref={bottomSheetRef}
        content={renderContent()}
        title={<SnbBottomSheetPart.Title title="" />}
        name="modal-back-profile-completion"
        type="content"
        snap={false}
        close={props.closeModal}
        contentHeight={contentHeight + 100}
        button={
          <View
            style={{
              flexDirection: 'row',
              padding: layout.spacing.lg,
            }}>
            <View style={{ flex: 1 }}>
              <SnbButton2.Primary
                onPress={() => {
                  props.closeModal();
                }}
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
                onPress={() => {
                  props.confirm();
                }}
                title="Ya, Keluar"
                disabled={updateCompleteDataState.loading}
                loading={updateCompleteDataState.loading}
                size="medium"
                full
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default ForceRegistrationModal;
