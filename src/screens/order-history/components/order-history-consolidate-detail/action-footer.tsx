import React, { useCallback } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { colorV2, SnbButton2 } from '@sinbad/react-native-sinbad-ui';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';

const ActionFooter = () => {
  const {
    stateOrderHistory: {
      consolidateDetail: { data, loading },
    },
  } = useOrderHistoryContext();

  const onOpenWhatsapp = useCallback(() => {
    const text = `Halo, nomor pesanan saya ${
      data?.orderId || ''
    }, saya butuh bantuan.`;
    Linking.openURL(`whatsapp://send?phone=+6282260106010&text=${text}`).catch(
      (err) =>
        err ? Linking.openURL('market://details?id=com.whatsapp') : null,
    );
  }, [data?.orderId]);

  if (loading) return <View />;

  return (
    <View style={styles.main}>
      <SnbButton2.Link
        disabled={false}
        iconName={'whatsapp'}
        size="medium"
        title="Butuh Bantuan?"
        onPress={onOpenWhatsapp}
        testID="07.2.1 Button TextLink+Icon"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 76,
    backgroundColor: colorV2.bgColor.light,
    elevation: 10,
    padding: 16,
  },
});

export default ActionFooter;
