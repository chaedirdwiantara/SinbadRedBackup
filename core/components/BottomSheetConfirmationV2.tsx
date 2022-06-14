import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
  useEffect
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  SnbText2,
  SnbButton,
  colorV2,
} from 'react-native-sinbad-ui';

interface BottomSheetTransactionProps {
  onSubmit: () => void;
  title: string;
  desc: string;
  isOpen: boolean;
  onCancel: () => void;
}
// export interface BottomSheetTransactionRef {
//   show: (id: string) => void;
//   close: () => void;
// }

const BottomSheetConfirmationV2 = forwardRef<
  SnbBottomSheet2Ref,
  BottomSheetTransactionProps
>((props, ref) => {
  const { desc, onSubmit, title, isOpen, onCancel } = props;

  // ref
  const modalRef = useRef<SnbBottomSheet2Ref>(null);
  // custom ref
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }));

  // const [show, setShow] = useState(false);

  const onClose = useCallback(() => {
    // onSubmit && onSubmit();
    onCancel && onCancel();
    modalRef.current?.close();
  }, [modalRef.current]);
  const onConfirm = useCallback(() => {
    onSubmit && onSubmit();
    // onCancel && onCancel();
    modalRef.current?.close();
  }, [modalRef.current]);
  // State Effect
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const Content = useMemo(
    () => (
      <>
        <View style={styles.descContainer}>
          <SnbText2.Headline.Default align="center" color={colorV2.textColor.default}>{title}</SnbText2.Headline.Default>
          <View style={styles.desc}>
            <SnbText2.Paragraph.Default align="center" color={colorV2.textColor.secondary}>
              {desc}
            </SnbText2.Paragraph.Default>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SnbButton.Multiple
            leftType="secondary"
            rightType="primary"
            onPressLeft={onConfirm}
            onPressRight={onClose}
            leftTitle="Ya"
            rightTitle="Tidak"
          />
        </View>
      </>
    ),
    [desc, title],
  );


  return (
    <SnbBottomSheet2
      content={Content}
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={onClose}
        />
      }
      title={
        <SnbBottomSheetPart.Title
          swipeIndicator={false}
        />
      }
      name="bottom-sheet-confirmation-v2"
      type="content"
      contentHeight={180}
      ref={modalRef}
      snap
      close={onClose}
    />
  );
});

const styles = StyleSheet.create({
  buttonContainer: { height: 72 },
  descContainer: { marginHorizontal: 24 },
  desc: { marginVertical: 16 },
});

export default memo(BottomSheetConfirmationV2);
