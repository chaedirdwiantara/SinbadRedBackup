import React from 'react';
import { Linking, View } from 'react-native';
import {
  Content,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbButton2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { ImagesSinbad } from '@image/sinbad_image/index';


const ModalSalesman: React.FC<{ ref: any }> = React.forwardRef((_, ref: any) => {
  const [contentHeight, setContentHeight] = React.useState(0);

  const renderContent = () => {
    return (
      <View onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
        <Content.Illustration
          image={ImagesSinbad.forceRegister}
          imageStyle={{ height: 180, width: 180, resizeMode: 'contain' }}
          title="Selamat Datang Salesman"
          description="Silakan gunakan Aplikasi Sinbad Agent. Jika ada kendala, dapat hubungi tim CS kami."
        />
      </View>
    )
  }

  return (
    <SnbBottomSheet2
      ref={ref}
      contentHeight={contentHeight + 100}
      title={<SnbBottomSheetPart.Title title="" />}
      name="modal-pilih-metode-otp"
      type="content"
      content={renderContent()}
      button={
        <View
          style={{
            flexDirection: 'row',
            padding: layout.spacing.lg,
          }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              onPress={() => {
                ref.current?.close();
                Linking.openURL("whatsapp://send?phone=+6282260106010")
                  .catch(err => {
                    if (err) {
                      Linking.openURL('market://details?id=com.whatsapp');
                    }
                  });
              }}
              title="Hubungi Kami"
              disabled={false}
              size="medium"
              full
              outline
              testID={'04'}
            />
          </View>
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              onPress={() => ref.current?.close()}
              title="Mengerti"
              disabled={false}
              size="medium"
              full
              testID={'04'}
            />
          </View>
        </View>
      }
    />
  )
})

export default ModalSalesman