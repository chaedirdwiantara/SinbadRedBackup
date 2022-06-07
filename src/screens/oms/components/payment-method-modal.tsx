import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  Content,
  FooterButton,
  SnbText2,
  colorV2,
} from 'react-native-sinbad-ui';
import { PaymentMethodStyle } from '../styles';
interface PaymentMethodExpiredTimeModalProps {
  open: boolean;
  close: () => void;
  name: string;
  snbButtonTitle: string;
  illustrationTitle: string;
  footerButtonTitle: string;
  footerButtonTitle2: string;
  image: string;
  description: string;
  buttonType: string;
  onPressLeft: void | any;
  onPressRight: void | any;
}
/** === COMPONENT === */

export const PaymentMethodModal: FC<PaymentMethodExpiredTimeModalProps> = ({
  open,
  close,
  name,
  snbButtonTitle,
  illustrationTitle,
  footerButtonTitle,
  image,
  description,
  buttonType,
  footerButtonTitle2,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <SnbBottomSheet2
      name={name}
      type={'content'}
      contentHeight={430}
      open={open}
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={() => {
            close();
          }}
        />
      }
      title={<SnbBottomSheetPart.Title title={snbButtonTitle} />}
      content={
        <>
          <Content.Illustration image={image} title="" description="" />
          <View style={PaymentMethodStyle.modalComponentStyle}>
            <SnbText2.Headline.Default align="center">
              {illustrationTitle}
            </SnbText2.Headline.Default>
          </View>

          <SnbText2.Paragraph.Default
            align="center"
            color={colorV2.textColor.secondary}>
            {description}
          </SnbText2.Paragraph.Default>
          {buttonType == 'single' ? (
            <FooterButton.Single
              title={footerButtonTitle}
              buttonPress={() => close()}
            />
          ) : buttonType == 'dual' ? (
            <FooterButton.Dual
              title1={footerButtonTitle}
              title2={footerButtonTitle2}
              button1Press={() => onPressRight()}
              button2Press={() => onPressLeft()}
            />
          ) : null}
        </>
      }
    />
  );
};

export default PaymentMethodModal;
