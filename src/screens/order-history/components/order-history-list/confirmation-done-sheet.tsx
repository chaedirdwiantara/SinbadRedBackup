import { colorV2, SnbBottomSheet2, SnbBottomSheet2Ref, SnbBottomSheetPart, SnbButton2, SnbText2 } from "@sinbad/react-native-sinbad-ui";
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { View } from "react-native";

type ConfirmationDoneSheetProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contentHeight: number;
  title: string;
  desc: string;
};
const ConfirmationDoneSheet = forwardRef<SnbBottomSheet2Ref, ConfirmationDoneSheetProps>(
  (props, ref) => {
    const {
      open,
      onClose,
      onConfirm,
      contentHeight,
      title,
      desc
    } = props;
    //ref
    const modalRef = useRef<SnbBottomSheet2Ref>(null);
    //register ref
    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.open(),
      close: () => modalRef.current?.close(),
    }));
    //function
    const onCloseModal = useCallback (() => {
      onClose && onClose();
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
    const Content = useMemo(
      () => (
        <>
          <View>
            <SnbText2.Headline.Default align="center" color={colorV2.textColor.default}>{title}</SnbText2.Headline.Default>
            <View style={{ marginVertical: 16 }}>
              <SnbText2.Paragraph.Default align="center" color={colorV2.textColor.secondary}>
                {desc}
              </SnbText2.Paragraph.Default>
            </View>
          </View>
          <View style={{ height: 72 }}>
            <SnbButton2.Primary
              title="Diterima"
              size="medium"
              onPress={onConfirm}
              full={true}
            />
          </View>
        </>
      ),
      [desc, title],
    );
    return (
      <SnbBottomSheet2
        ref={modalRef}
        name={'confirmation-done-sheet'}
        type="content"
        contentHeight={contentHeight}
        closeFromBackdrop
        close={onCloseModal}
        navigation={
          <SnbBottomSheetPart.Navigation
            iconRight1Name="x"
            onRight1Action={onCloseModal}
          />
        }
        title={
          <SnbBottomSheetPart.Title
            swipeIndicator={false}
          />
        }
        content={Content}
      />
    );
  }
)
export default memo(ConfirmationDoneSheet)