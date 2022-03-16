import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { color, SnbText } from '@sinbad/react-native-sinbad-ui';
import { mockData } from './information';

const ActionFooter = () => {
  const { isCancellable, isOrderAbleToDone } = mockData;
  const onPressAction = useCallback(() => {
    if (isCancellable && isOrderAbleToDone) {
      // cant action same true
      return void 0;
    }
    if (isCancellable) {
      // action cancel order
    }
    if (isOrderAbleToDone) {
      // action done order
    }
  }, []);
  return (
    <View style={styles.main}>
      <TouchableOpacity>
        <SnbText.B2 color={color.blue60}>Butuh Bantuan?</SnbText.B2>
      </TouchableOpacity>
      {(isCancellable || isOrderAbleToDone) && (
        <TouchableOpacity style={styles.button} onPress={onPressAction}>
          <SnbText.B3 color={color.white}>
            {isCancellable ? 'Batalkan' : 'Pesanan Diterima'}
          </SnbText.B3>
        </TouchableOpacity>
      )}
    </View>
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
