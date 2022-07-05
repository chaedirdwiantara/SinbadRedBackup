import React, { FC } from 'react';
import {
  SnbBottomSheet2,
  SnbButton2,
  spacingV2 as layout,
  Content,
  SnbBottomSheetPart,
} from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
import { ImagesSinbad } from '@image/sinbad_image/index';

interface dataProps {
  ref: any;
  confirm: () => void;
}

const ForceRegistrationModal: React.FC<dataProps> = React.forwardRef(
  (props, ref: any) => {
    const [contentHeight, setContentHeight] = React.useState(0);

    const renderContent = () => {
      return (
        <View onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
          <Content.Illustration
            title="Selamat Datang Kembali"
            image={ImagesSinbad.forceRegister}
            description={
              'Silakan lakukan daftar ulang untuk menggunakan aplikasi sinbad'
            }
            imageStyle={{ height: 240, resizeMode: 'contain' }}
            imageContainerStyle={{ flex: 1 }}
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
          name="modal-force-registration"
          type="content"
          snap={false}
          contentHeight={contentHeight + 100}
          button={
            <View style={{ padding: layout.spacing.lg }}>
              <SnbButton2.Primary
                disabled={false}
                onPress={() => props.confirm()}
                title={'Daftar'}
                full
                size="medium"
              />
            </View>
          }
        />
      </View>
    );
  },
);

export default ForceRegistrationModal;
