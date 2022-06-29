import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colorV2, SnbText2, SnbButton2 } from '@sinbad/react-native-sinbad-ui';
import BottomSheetConfirmation, {
  BottomSheetTransactionRef,
} from '@core/components/BottomSheetConfirmation';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useDetailHistoryOrder } from '../../functions/history-detail';
import Svg from '@svg';

const ActionFooter = () => {
  const {
    stateOrderHistory: {
      consolidateDetail: { data, loading },
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
        <TouchableOpacity
          onPress={onOpenWhatsapp}
          style={styles.footerIconText}>
          <View style={styles.icon}>
            <Svg size={24} name="whatsapp" />
          </View>
          <SnbText2.Body.Default color={colorV2.textColor.link}>
            Butuh Bantuan?
          </SnbText2.Body.Default>
        </TouchableOpacity>
        {data?.isCancellable || data?.isOrderAbleToDone ? (
          <View style={styles.buttonContainer}>
            <SnbButton2.Secondary
              title={data?.isCancellable ? 'Batalkan' : 'Pesanan Diterima'}
              size="medium"
              onPress={onPressAction}
              outline={true}
              full={true}
            />
          </View>
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
    height: 84,
    backgroundColor: colorV2.bgColor.light,
    elevation: 10,
    padding: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: { marginRight: 8, marginTop: -2 },
  footerIconText: { flexDirection: 'row', marginLeft: 24 },
  buttonContainer: { width: 156 },
});

export default ActionFooter;
