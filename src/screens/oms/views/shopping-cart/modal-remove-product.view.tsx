/** === IMPORT PACKAGE HERE ===  */
import React, { FC, Ref } from 'react';
import { Image, View } from 'react-native';
import {
  colorV2,
  SnbText2,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  FooterButton,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
import { ShoppingCartValidationStyles } from '@screen/oms/styles';
import { Images } from 'src/assets';
import { testProps } from '@core/functions/global/test-props';
/** === INTERFACE ===  */
interface ModalRemoveProductProps {
  okAction: () => void;
  cancelAction: () => void;
  parentRef: Ref<SnbBottomSheet2Ref>;
  testID: string;
}
/** === COMPONENT ===  */
export const ModalRemoveProduct: FC<ModalRemoveProductProps> = ({
  okAction,
  cancelAction,
  parentRef,
  testID,
}) => {
  const { stateCart } = React.useContext(contexts.CartContext);
  /** => content item image */
  const contentItemImage = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentImageContainer}>
        <Image
          {...testProps(`img.content.modalRemoveProduct.${testID}`)}
          source={Images.cartNotFound}
          style={ShoppingCartValidationStyles.image}
        />
      </View>
    );
  };
  /** => content item title */
  const contentItemTitle = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentTitleContainer}>
        <SnbText2.Headline.Default
          testID={`title.content.modalRemoveProduct.${testID}`}
          color={colorV2.textColor.default}
          align={'center'}>
          Hapus Barang dari Keranjang
        </SnbText2.Headline.Default>
      </View>
    );
  };
  /** => content item message */
  const contentItemMessage = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentMessageContainer}>
        <SnbText2.Paragraph.Default
          testID={`subTitle.content.modalRemoveProduct.${testID}`}
          color={colorV2.textColor.secondary}
          align={'center'}>
          Apakah Anda yakin untuk menghapus barang ini dari keranjang?
        </SnbText2.Paragraph.Default>
      </View>
    );
  };
  /** => content item */
  const contentItem = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentItemContainer}>
        {contentItemImage()}
        {contentItemTitle()}
        {contentItemMessage()}
      </View>
    );
  };
  /** => button */
  const button = () => {
    return (
      <FooterButton.Dual
        testID={`modalRemoveProduct.${testID}`}
        title1={'Hapus'}
        title2={'Batalkan'}
        button1Press={okAction}
        button2Press={cancelAction}
        loadingButton={stateCart.remove.loading}
      />
    );
  };
  /** => content */
  const content = () => {
    return <View>{contentItem()}</View>;
  };
  /** => title */
  const title = () => {
    return <SnbBottomSheetPart.Title />;
  };
  /** => navigation */
  const navigation = () => {
    return (
      <SnbBottomSheetPart.Navigation
        iconRight1Name="x"
        onRight1Action={cancelAction}
      />
    );
  };
  return (
    <SnbBottomSheet2
      ref={parentRef}
      name={'cartRemoveProductModal'}
      type={'content'}
      contentHeight={400}
      title={title()}
      snap={false}
      content={content()}
      button={button()}
      navigation={navigation()}
    />
  );
};
