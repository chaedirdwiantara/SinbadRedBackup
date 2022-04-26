/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet,
  SnbText2,
  color,
  SnbButton2,
} from 'react-native-sinbad-ui';
import { CartProfileCompletionStyles } from '@screen/oms/styles';
import { Images } from 'src/assets';
/** === INTERFACE ===  */
interface ModalCartProfileCompletionProps {
  handleNavigateToProfile: () => void;
  isOpen: boolean;
}
/** === COMPONENT ===  */
export const ModalCartProfileCompletion: FC<
  ModalCartProfileCompletionProps
> = ({ handleNavigateToProfile, isOpen }) => {
  const renderContent = () => {
    return (
      <View style={CartProfileCompletionStyles.modalContentContainer}>
        <View style={CartProfileCompletionStyles.modalImageContainer}>
          <Image
            source={Images.registrationIncomplete}
            style={CartProfileCompletionStyles.modalImage}
          />
        </View>
        <View style={{ marginBottom: 4 }}>
          <SnbText2.Headline.Default>
            Akun Belum Lengkap
          </SnbText2.Headline.Default>
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbText2.Paragraph.Default align="center" color={color.black80}>
            Lengkapi akun anda dengan menambahkan foto KTP dan detail lokasi
            toko untuk melanjutkan pembelian
          </SnbText2.Paragraph.Default>
        </View>
        <View style={{ width: '100%' }}>
          <SnbButton2.Primary
            full
            title="Lengkapi Akun Saya"
            size="medium"
            onPress={handleNavigateToProfile}
          />
        </View>
      </View>
    );
  };

  return <SnbBottomSheet open={isOpen} content={renderContent()} />;
};
