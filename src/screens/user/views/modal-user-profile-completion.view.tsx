/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet,
  SnbText2,
  SnbButton2,
  spacingV2 as layout,
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
  const renderContent = () => {
    return (
      <View style={UserProfileCompletionStyles.modalContentContainer}>
        <Image
          source={Images.registrationComplete}
          style={UserProfileCompletionStyles.modalImage}
        />
        <View
          style={{
            marginHorizontal: layout.spacing.xl,
            marginVertical: layout.spacing.md,
            alignItems: 'center',
          }}>
          <SnbText2.Headline.Default>Profil Lengkap</SnbText2.Headline.Default>
          <View
            style={{
              marginHorizontal: layout.spacing.xl,
              marginVertical: layout.spacing.sm,
            }}>
            <SnbText2.Paragraph.Default align="center">
              Selamat, profil Anda sudah lengkap. Silahkan lanjutkan transaksi
            </SnbText2.Paragraph.Default>
          </View>
        </View>
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
      </View>
    );
  };

  return <SnbBottomSheet open={isOpen} content={renderContent()} />;
};
