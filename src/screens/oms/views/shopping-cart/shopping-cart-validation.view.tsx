import React from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbText,
  FooterButton,
} from 'react-native-sinbad-ui';
import { ShoppingCartValidationStyles } from '@screen/oms/styles';
/** === INTERFACE === */
/** => error props */
interface ShoppingCartValidationProps {
  open: boolean;
  closeAction?: () => void;
}
/** === COMPONENT === */
const ShoppingCartValidation: React.FC<ShoppingCartValidationProps> = ({
  open,
  ...props
}) => {
  /** ======================================================================= */
  /** => content item image */
  const contentItemImage = () => {
    const src = require('@image/sinbad_image/cry_sinbad.png');
    return (
      <View style={ShoppingCartValidationStyles.contentImageContainer}>
        <Image source={src} style={ShoppingCartValidationStyles.image} />
      </View>
    );
  };
  /** => content item title */
  const contentItemTitle = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentTitleContainer}>
        <SnbText.H4 align={'center'}>Perubahan Produk di Keranjang</SnbText.H4>
      </View>
    );
  };
  /** => content item message */
  const contentItemMessage = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentMessageContainer}>
        <SnbText.B3 align={'center'}>
          Coba periksa ulang keranjang Anda dikarenakan terdapat perubahan data
          pada produk
        </SnbText.B3>
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
      <FooterButton.Single
        title={'Saya Mengerti'}
        buttonPress={() => {
          props?.closeAction && props?.closeAction();
        }}
      />
    );
  };
  /** => content */
  const content = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentContainer}>
        {contentItem()}
      </View>
    );
  };
  /** => title */
  const title = () => {
    return <SnbBottomSheetPart.Title />;
  };
  /** => main */
  return (
    <SnbBottomSheet2
      name={'cartValidationCheckoutModal'}
      type={'content'}
      contentHeight={380}
      title={title()}
      open={open}
      snap={false}
      content={content()}
      button={button()}
    />
  );
};

export default ShoppingCartValidation;
