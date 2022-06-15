/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbButton2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
  Content,
} from 'react-native-sinbad-ui';
import { UserProfileCompletionStyles } from '../styles/user-profile-completion.style';
import { Images } from 'src/assets';
/** === INTERFACE ===  */
interface ModalUserProfileCompletionProps {
  handleNavigateToCart: () => void;
  isOpen: boolean;
}
/** === COMPONENT ===  */
export const ModalUserProfileCompletion: FC<
  ModalUserProfileCompletionProps
> = ({ handleNavigateToCart, isOpen }) => {
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    isOpen ? bottomSheetRef.current?.open() : bottomSheetRef.current?.close();
  }, [isOpen]);

  const renderContent = () => {
    return (
      <View onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
        <Content.Illustration
          image={Images.registrationComplete}
          imageStyle={UserProfileCompletionStyles.modalImage}
          title="Profil Lengkap"
          description="Selamat, profil Anda sudah lengkap. Silahkan lanjutkan transaksi"
        />
      </View>
    );
  };

  return (
    <SnbBottomSheet2
      ref={bottomSheetRef}
      content={renderContent()}
      title={<SnbBottomSheetPart.Title title="" />}
      name="modal-profile-completion"
      type="content"
      contentHeight={contentHeight + 100}
      button={
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: layout.spacing.lg }}>
            <SnbButton2.Primary
              full
              title="Lanjutkan Transaksi"
              size="medium"
              onPress={handleNavigateToCart}
            />
          </View>
        </View>
      }
    />
  );
};
