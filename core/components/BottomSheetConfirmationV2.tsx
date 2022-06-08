import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbText2,
  SnbButton,
  colorV2,
} from 'react-native-sinbad-ui';

interface BottomSheetTransactionProps {
  onSubmit: (id: string) => void;
  title: string;
  desc: string;
}
export interface BottomSheetTransactionRef {
  show: (id: string) => void;
  close: () => void;
}

const BottomSheetConfirmationV2 = forwardRef<
  BottomSheetTransactionRef,
  BottomSheetTransactionProps
>((props, ref) => {
  const { desc, onSubmit, title } = props;
  const [show, setShow] = useState(false);
  const [dataId, setDataId] = useState('');

  const onConfirm = useCallback(() => {
    onSubmit(dataId);
    setShow(false);
  }, [dataId]);

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
            onPressRight={() => setShow(false)}
            leftTitle="Ya"
            rightTitle="Tidak"
          />
        </View>
      </>
    ),
    [desc, title, dataId],
  );

  // custom ref
  useImperativeHandle(
    ref,
    () => ({
      show: (id: string) => {
        setShow(true);
        setDataId(id);
      },
      close: () => setShow(false),
    }),
    [],
  );
  return (
    // <SnbBottomSheet
    //   content={Content}
    //   open={show}
    //   closeAction={() => setShow(false)}
    // />
    <SnbBottomSheet2
      content={Content}
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={() => setShow(false)}
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
      open={show}
      snap
      close={() => setShow(false)}
    />
  );
});

const styles = StyleSheet.create({
  buttonContainer: { height: 72 },
  descContainer: { marginHorizontal: 24 },
  desc: { marginVertical: 16 },
});

export default memo(BottomSheetConfirmationV2);
