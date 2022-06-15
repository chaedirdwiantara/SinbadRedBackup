/** === IMPORT PACKAGE HERE ===  */
import React, { FC, Ref } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheetPart,
  SnbBottomSheet2,
  SnbText2,
  colorV2,
  SnbButton2,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { CartProfileCompletionStyles } from '@screen/oms/styles';
import { Images } from 'src/assets';
/** === INTERFACE ===  */
interface ModalCartProfileCompletionProps {
  handleNavigateToProfile: () => void;
  parentRef: Ref<SnbBottomSheet2Ref>;
}
/** === COMPONENT ===  */
export const ModalCartProfileCompletion: FC<
  ModalCartProfileCompletionProps
> = ({ handleNavigateToProfile, parentRef }) => {
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
          <SnbText2.Headline.Default color={colorV2.textColor.default}>
            Akun Belum Lengkap
          </SnbText2.Headline.Default>
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbText2.Paragraph.Default
            align="center"
            color={colorV2.textColor.secondary}>
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

  const renderTitle = () => {
    return <SnbBottomSheetPart.Title />;
  };

  return (
    <SnbBottomSheet2
      ref={parentRef}
      name={'cartProfileCompletionModal'}
      type={'content'}
      contentHeight={430}
      snap={false}
      title={renderTitle()}
      content={renderContent()}
      isBackDisable
    />
  );
};
