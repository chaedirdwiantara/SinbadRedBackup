import React, { FC, memo, ReactNode } from 'react';
import { SnbBottomSheet2, SnbBottomSheetPart } from 'react-native-sinbad-ui';

type ActionSheetProps = {
  open: boolean;
  children: ReactNode;
  title: string;
  onClose: () => void;
  name: string;
  contentHeight: number;
  onClearFilter?: () => void;
  withClear?: boolean;
  footer?: ReactNode;
};

const ActionSheet: FC<ActionSheetProps> = (props) => {
  const {
    children,
    footer,
    open,
    title,
    onClose,
    name,
    contentHeight,
    onClearFilter,
    withClear,
  } = props;
  return (
    <SnbBottomSheet2
      name={name}
      type="content"
      contentHeight={contentHeight}
      closeFromBackdrop
      open={open}
      button={footer}
      close={onClose}
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={onClose}
        />
      }
      title={
        <SnbBottomSheetPart.Title
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
};

export default memo(ActionSheet);
