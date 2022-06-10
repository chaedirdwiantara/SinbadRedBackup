import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  SnbText,
  color,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  SnbButton2,
  SnbRadioGroup,
  SnbRadio,
} from 'react-native-sinbad-ui';

interface ModalTransactionProps {
  onSubmit: (orderStatus: string) => void;
  onClose: () => void;
}

//orderStatus
const transactionFilter = [
  {
    id: '',
    label: 'Semua Transaksi Berlangsung',
  },
  {
    id: 'created',
    label: 'Diproses',
  },
  {
    id: 'packed',
    label: 'Dikemas',
  },
  {
    id: 'shipped',
    label: 'Dikirim',
  },
  {
    id: 'delivered',
    label: 'Tiba di tujuan',
  },
];

const ModalTransactionFilter = forwardRef<
  SnbBottomSheet2Ref,
  ModalTransactionProps
>((props, ref) => {
  const { onSubmit } = props;
  const [select, setSelect] = useState('');

  const onSubmitFilter = useCallback(() => {
    onSubmit(select);
  }, [select]);

  const Content = useMemo(() => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <SnbRadioGroup value={select} onChange={setSelect}>
          {transactionFilter.map((i) => (
            <View
              key={i.id}
              style={{
                marginTop: 0,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                }}
                onPress={() => setSelect(i.id)}>
                <View style={{ flex: 1 }}>
                  {select === i.id ? (
                    <SnbText.H4>{i.label}</SnbText.H4>
                  ) : (
                    <SnbText.B1>{i.label}</SnbText.B1>
                  )}
                </View>
                <SnbRadio value={i.id} style={{ top: 10 }} />
              </TouchableOpacity>
              <View style={styles.div} />
            </View>
          ))}
        </SnbRadioGroup>
        <View style={{ marginVertical: 14 }}>
          <SnbButton2.Primary
            size="large"
            full
            title="Tampilkan"
            onPress={onSubmitFilter}
          />
        </View>
      </View>
    );
  }, [select]);

  return (
    <SnbBottomSheet2
      ref={ref}
      content={Content}
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={props.onClose}
        />
      }
      title={
        <SnbBottomSheetPart.Title
          swipeIndicator
          title="Filter"
          titleType="center"
        />
      }
      name="filter-order-history"
      type="content"
      contentHeight={350}
      snap
      close={props.onClose}
    />
  );
});

const styles = StyleSheet.create({
  div: {
    height: 1,
    backgroundColor: color.black40,
    marginTop: 14,
  },
});

export default memo(ModalTransactionFilter);
