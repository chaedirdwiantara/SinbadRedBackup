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
  ref: any;
  confirm: () => void;
}

const ModalBack: FC<ListOfStepsProps> = React.forwardRef((props, ref: any) => {
  const { updateCompleteDataState } = useEasyRegistration();
  const [contentHeight, setContentHeight] = React.useState(0);

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
        ref={ref}
        content={renderContent()}
        title={<SnbBottomSheetPart.Title title="" />}
        name="modal-back-profile-completion"
        type="content"
        snap={false}
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
                  ref.current?.close()
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
                testID={'06.3'}
              />
            </View>
          </View>
        }
      />
    </View>
  );
});

export default ModalBack;
