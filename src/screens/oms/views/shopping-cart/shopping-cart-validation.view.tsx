import React from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbText2,
  colorV2,
  FooterButton,
} from 'react-native-sinbad-ui';
import { ShoppingCartValidationStyles } from '@screen/oms/styles';
import { Images } from 'src/assets';
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
    return (
      <View style={ShoppingCartValidationStyles.contentImageContainer}>
        <Image
          source={Images.reminder}
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
          color={colorV2.textColor.default}
          align={'center'}>
          Perubahan Produk di Keranjang
        </SnbText2.Headline.Default>
      </View>
    );
  };
  /** => content item message */
  const contentItemMessage = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentMessageContainer}>
        <SnbText2.Paragraph.Default
          color={colorV2.textColor.secondary}
          align={'center'}>
          Cek ulang keranjang Anda untuk mengetahui produk yang mengalami
          perubahan.
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
    return <View>{contentItem()}</View>;
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
      contentHeight={400}
      title={title()}
      open={true}
      snap={false}
      content={content()}
      button={button()}
    />
  );
};

export default ShoppingCartValidation;
