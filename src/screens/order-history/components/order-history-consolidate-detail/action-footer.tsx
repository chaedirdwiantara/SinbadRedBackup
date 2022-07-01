import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colorV2, SnbText2 } from '@sinbad/react-native-sinbad-ui';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import Svg from '@svg';

const ActionFooter = () => {
  const {
    stateOrderHistory: {
      consolidateDetail: { data, loading },
    },
  } = useOrderHistoryContext();

  const onOpenWhatsapp = useCallback(() => {
    const text = `
    Halo, nomor pesanan saya ${data?.orderId || ''}, saya butuh bantuan.`;
    Linking.openURL(`whatsapp://send?phone=+6282260106010&text=${text}`).catch(
      (err) =>
        err ? Linking.openURL('market://details?id=com.whatsapp') : null,
    );
  }, [data?.orderId]);

  if (loading) return <View />;

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={onOpenWhatsapp} style={styles.footerIconText}>
        <View style={styles.icon}>
          <Svg size={24} name="whatsapp" />
        </View>
        <SnbText2.Body.Default color={colorV2.textColor.link}>
          Butuh Bantuan?
        </SnbText2.Body.Default>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 76,
    backgroundColor: colorV2.bgColor.light,
    elevation: 10,
    padding: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: { marginRight: 8, marginTop: -2 },
  footerIconText: {
    flexDirection: 'row',
    marginLeft: 24,
  },
});

export default ActionFooter;
