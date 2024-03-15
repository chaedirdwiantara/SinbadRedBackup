import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { colorV2, SnbButton2 } from '@sinbad/react-native-sinbad-ui';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useDetailHistoryOrder } from '../../functions/history-detail';
import { ConfirmationDoneSheet } from '../order-history-list';

const ActionFooter = () => {
  const {
    stateOrderHistory: {
      detail: { data, loading },
    },
  } = useOrderHistoryContext();
  const { doneOrder } = useDetailHistoryOrder();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const onPressAction = useCallback(() => {
    const payload: { id: string; type: 'detail' } = {
      type: 'detail',
      id: String(data?.id),
    };
    if (data?.isOrderAbleToDone) {
      // action done order
      doneOrder(payload);
    }
  }, [data?.isCancellable, data?.isOrderAbleToDone, data?.id]);

  //render modal confirmation done order
  const renderModalConfirmationDoneOrder = () => {
    return (
      <ConfirmationDoneSheet
        open={confirmationOpen}
        title="Pesanan diterima?"
        desc="Pastikan Anda telah menerima barang yang sesuai dengan pesanan Anda"
        onConfirm={() => {
          onPressAction();
          setConfirmationOpen(false);
        }}
        contentHeight={175}
        onClose={() => setConfirmationOpen(false)}
      />
    );
  };

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
        <SnbButton2.Link
          disabled={false}
          iconName={'whatsapp'}
          size="medium"
          title="Butuh Bantuan?"
          onPress={onOpenWhatsapp}
          testID="07.2.1 Button TextLink+Icon"
        />
        {data?.isOrderAbleToDone ? (
          <View style={styles.buttonContainer}>
            <SnbButton2.Primary
              title={'Diterima'}
              size="medium"
              onPress={() => setConfirmationOpen(true)}
              full={true}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
      {/* confirmation  done*/}
      {renderModalConfirmationDoneOrder()}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 76,
    backgroundColor: colorV2.bgColor.light,
    elevation: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: { width: 156, height: 44, marginTop: 16, marginBottom: 16 },
});

export default ActionFooter;
