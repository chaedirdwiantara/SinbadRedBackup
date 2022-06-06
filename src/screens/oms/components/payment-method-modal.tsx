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
  image: string;
  description: string;
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
          <FooterButton.Single
            title={footerButtonTitle}
            buttonPress={() => close()}
          />
        </>
      }
    />
  );
};

export default PaymentMethodModal;
