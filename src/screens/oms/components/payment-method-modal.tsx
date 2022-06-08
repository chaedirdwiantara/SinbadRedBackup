import React, { useCallback,
  memo,
  ReactNode,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect, } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
  Content,
  FooterButton,
  SnbText2,
  colorV2,
} from 'react-native-sinbad-ui';
import { PaymentMethodStyle } from '../styles';
interface PaymentMethodExpiredTimeModalProps {
  open: boolean;
  onClose?: () => void;
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

export const PaymentMethodModal = forwardRef<SnbBottomSheet2Ref, PaymentMethodExpiredTimeModalProps>(props, ref) => {
  const {
    open,
    onClose,
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
  } = props;
  // ref
  const modalRef = useRef<SnbBottomSheet2Ref>(null);
  // register ref
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }));
  // Function
  const onCloseModal = useCallback(() => {
    onClose && onClose();
    onPressLeft && onPressLeft();
    modalRef.current?.close();
  }, [modalRef.current]);
  // State Effect
  useEffect(() => {
    if (open) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [open]);
  // Render
  return (
    <SnbBottomSheet2
    ref={modalRef}
      name={name}
      type={'content'}
      contentHeight={430}
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={() => {
            onCloseModal
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
              buttonPress={onCloseModal}
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
