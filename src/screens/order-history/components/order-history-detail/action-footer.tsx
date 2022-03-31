import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { color, SnbText } from '@sinbad/react-native-sinbad-ui';
import BottomSheetConfirmation, {
  BottomSheetTransactionRef,
} from '@core/components/BottomSheetConfirmation';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useDetailHistoryOrder } from '../../functions/history-detail';

const ActionFooter = () => {
  const {
    stateOrderHistory: {
      detail: { data, loading },
    },
  } = useOrderHistoryContext();
  const { cancelOrder, doneOrder } = useDetailHistoryOrder();
  const confirmModalRef = useRef<BottomSheetTransactionRef>(null);

  const onCancelOrder = useCallback(() => {
    cancelOrder({ type: 'detail', id: String(data?.id) });
  }, [data?.id]);

  const onPressAction = useCallback(() => {
    const payload: { id: string; type: 'detail' } = {
      type: 'detail',
      id: String(data?.id),
    };
    if (data?.isCancellable && data?.isOrderAbleToDone) {
      // cant action same true
      return void 0;
    }
    if (data?.isCancellable) {
      // action cancel order
      confirmModalRef.current?.show(data.id);
    }
    if (data?.isOrderAbleToDone) {
      // action done order
      doneOrder(payload);
    }
  }, [data?.isCancellable, data?.isOrderAbleToDone, data?.id]);

  const onOpenWhatsapp = useCallback(() => {
    const text = `
    saya butuh bantuan
    nomor pesanan : ${data?.orderSellerCode || ''}
    `;
    Linking.openURL(`whatsapp://send?phone=+6282260106010&text=${text}`).catch(
      (err) =>
        err ? Linking.openURL('market://details?id=com.whatsapp') : null,
    );
  }, [data?.orderSellerCode]);

  if (loading) return <View />;

  return (
    <>
      <View style={styles.main}>
        <TouchableOpacity onPress={onOpenWhatsapp}>
          <SnbText.B2 color={color.blue60}>Butuh Bantuan?</SnbText.B2>
        </TouchableOpacity>
        {data?.isCancellable || data?.isOrderAbleToDone ? (
          <TouchableOpacity style={styles.button} onPress={onPressAction}>
            <SnbText.B3 color={color.white}>
              {data?.isCancellable ? 'Batalkan' : 'Pesanan Diterima'}
            </SnbText.B3>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      {/* confirmation  batalkan*/}
      <BottomSheetConfirmation
        ref={confirmModalRef}
        title="Konfirmasi"
        desc="Yakin ingin membatalkan pesanan?"
        onSubmit={onCancelOrder}
      />
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 76,
    backgroundColor: color.white,
    elevation: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: color.red50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
});

export default ActionFooter;
