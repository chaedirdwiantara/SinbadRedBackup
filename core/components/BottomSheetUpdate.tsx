import React from 'react';
import { View, Linking } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  FooterButton,
  Content,
  spacingV2,
} from 'react-native-sinbad-ui';
import { useSetUpdateAvailable } from '@core/screens/intro/functions';
/** === INTERFACE === */
/** => error */
interface ErrorProps {
  open: boolean;
}
/** === COMPONENT === */
const BottomSheetUpdate: React.FC<ErrorProps> = (props) => {
  /** => state */
  const [contentHeight, setContentHeight] = React.useState<number>(0);
  /** => ref */
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  /** => effect */
  const { setUpdateFalse } = useSetUpdateAvailable();

  React.useEffect(() => {
    if (props.open) {
      bottomSheetRef.current?.open();
    }
  }, [bottomSheetRef.current, props.open]);

  /** => title */
  const title = () => {
    return <SnbBottomSheetPart.Title swipeIndicator />;
  };
  /** => button */
  const button = () => {
    return (
      <FooterButton.Dual
        title1="Perbarui Sekarang"
        title2="Nanti Saja"
        shadow={false}
        loading={false}
        loadingButton={false}
        disabled={false}
        button1Press={() => {
          bottomSheetRef.current?.close();
          Linking.openURL('market://details?id=sinbad.app');
        }}
        button2Press={() => bottomSheetRef.current?.close()}
      />
    );
  };
  /** => content */
  const content = () => {
    return (
      <View
        style={{ paddingVertical: spacingV2.spacing.xxl }}
        onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
        <Content.Illustration
          image={require('@image/sinbad/app_update.png')}
          title="Mohon Perbarui Aplikasi Anda"
          description="Demi kenyamanan Anda dalam bertransaksi, mohon segera perbarui aplikasi Anda"
        />
      </View>
    );
  };
  /** => main */
  return (
    <SnbBottomSheet2
      ref={bottomSheetRef}
      name={'updateApp'}
      type="content"
      contentHeight={contentHeight + 100}
      closeFromBackdrop
      close={() => setUpdateFalse()}
      title={title()}
      content={content()}
      button={button()}
    />
  );
};

export default BottomSheetUpdate;
