import React, {
  useCallback,
  memo,
  ReactNode,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';

type ActionSheetProps = {
  testID: string;
  open: boolean;
  children: ReactNode;
  title: string;
  name: string;
  onClose?: () => void;
  onBlur: () => void;
  contentHeight: number;
  onClearFilter?: () => void;
  withClear?: boolean;
  footer?: ReactNode;
};

const ActionSheet = forwardRef<SnbBottomSheet2Ref, ActionSheetProps>(
  (props, ref) => {
    const {
      children,
      footer,
      title,
      onClose,
      onBlur,
      open,
      name,
      contentHeight,
      onClearFilter,
      withClear,
      testID,
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
        testID={testID}
        ref={modalRef}
        name={name}
        type="content"
        contentHeight={contentHeight}
        closeFromBackdrop
        button={footer}
        close={onBlur}
        navigation={
          <SnbBottomSheetPart.Navigation
            testID={testID}
            iconRight1Name="x"
            onRight1Action={onCloseModal}
          />
        }
        title={
          <SnbBottomSheetPart.Title
            testID={testID}
            swipeIndicator
            title={title}
            rightButton={withClear ? 'Reset' : ''}
            onRightButton={onClearFilter}
            titleType={withClear ? 'left' : 'center'}
          />
        }
        content={children}
      />
    );
  },
);

export default memo(ActionSheet);
