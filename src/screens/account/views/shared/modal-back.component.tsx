import React, { FC } from 'react';
import {
  SnbBottomSheet2,
  Content,
  SnbBottomSheetPart,
  FooterButton,
} from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
import { useEasyRegistration } from '@screen/account/functions';

interface ListOfStepsProps {
  ref: any;
  confirm: () => void;
}

const ModalBack: FC<ListOfStepsProps> = React.forwardRef((props, ref: any) => {
  const { updateCompleteDataState, uploadImageSecureState } = useEasyRegistration();
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
          <FooterButton.Dual
            title1="Ya, Keluar"
            title2="Batal"
            button1Press={() => props.confirm()}
            button2Press={() => ref.current?.close()}
            testID={'06.3'}
            disabled={updateCompleteDataState.loading || uploadImageSecureState.loading}
            loadingButton={updateCompleteDataState.loading || uploadImageSecureState.loading}
          />
        }
      />
    </View>
  );
});

export default ModalBack;
