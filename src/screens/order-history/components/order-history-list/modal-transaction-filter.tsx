import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  SnbButton2,
  SnbRadioGroup,
  SnbRadio,
  SnbText2,
  colorV2,
  SnbCheckbox2,
} from 'react-native-sinbad-ui';

interface ModalTransactionProps {
  onSubmit: (orderStatus: string) => void;
  onClose: () => void;
}

//orderStatus
const transactionFilter = [
  {
    id: '',
    label: 'Semua status transaksi',
  },
  {
    id: 'created',
    label: 'Diproses',
  },
  {
    id: 'shipped',
    label: 'Dikirim',
  },
  {
    id: 'packed',
    label: 'Dikemas',
  },
  {
    id: 'delivered',
    label: 'Tiba di tujuan',
  },
  {
    id: 'cancelled',
    label: 'Dibatalkan',
  },
  {
    id: 'delivery_failed',
    label: 'Pengiriman Gagal',
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
      <View>
        {transactionFilter.map((i) => (
          <View
            key={i.id}
            style={{marginTop: 8}}
          >
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setSelect(i.id)}
            >
              <View style={{ flex: 1, marginVertical: 8 }}>
                  {select === i.id ? (
                    <SnbText2.Body.Default>{i.label}</SnbText2.Body.Default>
                  ) : (
                    <SnbText2.Paragraph.Default>
                      {i.label}
                    </SnbText2.Paragraph.Default>
                  )}
                </View>
                <SnbCheckbox2 
                  key={i.id}
                  testID = {'03-'+i.id}
                  checked={select === i.id }
                  onChange={() => setSelect(i.id)}
                />
            </TouchableOpacity>
            <View style={styles.div} />
          </View>
        ))}
        {/* <SnbRadioGroup value={select} onChange={setSelect}>
          {transactionFilter.map((i) => (
            <View
              key={i.id}
              style={{
                marginTop: 8,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                }}
                onPress={() => setSelect(i.id)}>
                <View style={{ flex: 1 }}>
                  {select === i.id ? (
                    <SnbText2.Body.Default>{i.label}</SnbText2.Body.Default>
                  ) : (
                    <SnbText2.Paragraph.Default>
                      {i.label}
                    </SnbText2.Paragraph.Default>
                  )}
                </View>
                <SnbRadio value={i.id} style={{ top: 8 }} />
              </TouchableOpacity>
              <View style={styles.div} />
            </View>
          ))}
        </SnbRadioGroup> */}
        <View style={{ marginVertical: 14 }}>
          <SnbButton2.Primary
            size="medium"
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
      contentHeight={450}
      snap
      close={props.onClose}
    />
  );
});

const styles = StyleSheet.create({
  div: {
    height: 1,
    backgroundColor: colorV2.strokeColor.default,
    marginTop: 8,
  },
});

export default memo(ModalTransactionFilter);
