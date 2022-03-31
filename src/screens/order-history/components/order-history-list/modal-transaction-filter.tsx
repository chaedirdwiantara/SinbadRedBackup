import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  SnbBottomSheet,
  SnbText,
  SnbButton,
  color,
  SnbRadioButton,
} from 'react-native-sinbad-ui';

interface ModalTransactionProps {
  onSubmit: (orderStatus: string) => void;
}
export interface ModalTransactionRef {
  trigger: (isShow?: boolean) => void;
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
  ModalTransactionRef,
  ModalTransactionProps
>((props, ref) => {
  const { onSubmit } = props;
  const [select, setSelect] = useState('');
  const [show, setShow] = useState(false);

  const onSubmitFilter = useCallback(() => {
    setShow(false);
    onSubmit(select);
  }, [select]);

  // custom ref
  useImperativeHandle(
    ref,
    () => ({
      trigger: (open) => {
        setShow((prev) => open ?? !prev);
      },
    }),
    [],
  );

  const Content = useCallback(() => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        {transactionFilter.map((i) => (
          <View key={i.id} style={{ marginTop: 14 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => setSelect(i.id)}>
              <View style={{ flex: 1 }}>
                {i.id === '' ? (
                  <SnbText.H4>{i.label}</SnbText.H4>
                ) : (
                  <SnbText.B1>{i.label}</SnbText.B1>
                )}
              </View>
              <SnbRadioButton
                status={select === i.id ? 'selected' : 'unselect'}
                onPress={() => setSelect(i.id)}
              />
            </TouchableOpacity>
            <View style={styles.div} />
          </View>
        ))}
        <View style={{ height: 72 }}>
          <SnbButton.Single
            type="primary"
            title="Tampilkan"
            onPress={onSubmitFilter}
          />
        </View>
      </View>
    );
  }, [select]);

  return (
    <View>
      <SnbBottomSheet
        content={Content()}
        open={show}
        actionIcon="close"
        closeAction={() => setShow(false)}
        isSwipeable={true}
        title="Filter"
      />
    </View>
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
