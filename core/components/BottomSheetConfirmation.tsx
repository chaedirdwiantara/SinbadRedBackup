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
  SnbBottomSheet,
  SnbText,
  SnbButton,
  color,
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

const BottomSheetConfirmation = forwardRef<
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
          <SnbText.H3 align="center">{title}</SnbText.H3>
          <View style={styles.desc}>
            <SnbText.C1 align="center" color={color.black80}>
              {desc}
            </SnbText.C1>
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
    [desc, title],
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
    <SnbBottomSheet
      content={Content}
      open={show}
      closeAction={() => setShow(false)}
    />
  );
});

const styles = StyleSheet.create({
  buttonContainer: { height: 72 },
  descContainer: { marginHorizontal: 24 },
  desc: { marginVertical: 16 },
});

export default memo(BottomSheetConfirmation);
