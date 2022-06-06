import React, { FC } from 'react';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  Content,
  FooterButton,
} from 'react-native-sinbad-ui';
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
      contentHeight={410}
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
          <Content.Illustration
            image={image}
            title={illustrationTitle}
            description={description}
          />
          {buttonType == 'single' ? (
            <FooterButton.Single
              title={footerButtonTitle}
              buttonPress={() => close()}
            />
          ) : buttonType == 'dual' ? (
            <FooterButton.Dual
              title1={footerButtonTitle}
              title2={footerButtonTitle2}
              button1Press={() => onPressLeft()}
              button2Press={() => onPressRight()}
            />
          ) : null}
        </>
      }
    />
  );
};

export default PaymentMethodModal;
