/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbBottomSheet, SnbText2, color, SnbButton2 } from 'react-native-sinbad-ui';
import { UserProfileCompletionStyles } from '../styles/user-profile-completion.style';
import {Images} from 'src/assets';
/** === INTERFACE ===  */
interface ModalUserProfileCompletionProps {
  handleNavigateToCart: () => void;
  isOpen: boolean;
}
/** === COMPONENT ===  */
export const ModalUserProfileCompletion: FC<ModalUserProfileCompletionProps> = ({
  handleNavigateToCart,
  isOpen,
}) => {

  const renderContent = () => {
    return (
      <View style={UserProfileCompletionStyles.modalContentContainer}>
        <View style={UserProfileCompletionStyles.modalImageContainer}>
          <Image source={Images.registrationComplete} style={UserProfileCompletionStyles.modalImage} />
        </View>
        <View style={{marginBottom: 4}}>
          <SnbText2.Headline.Default>Profil Lengkap</SnbText2.Headline.Default>
        </View>
        <View style={{marginBottom: 16}}>
          <SnbText2.Paragraph.Default align="center" color={color.black80}>Selamat, profil Anda sudah lengkap. Silahkan lanjutkan transaksi</SnbText2.Paragraph.Default>
        </View>
        <View style={{width: '100%'}}>
          <SnbButton2.Primary full title="Lanjutkan Transaksi" size="medium" onPress={handleNavigateToCart} />
        </View>
      </View>
    );
  };

  return (
    <SnbBottomSheet
      open={isOpen}
      content={renderContent()}
    />
  );
};
