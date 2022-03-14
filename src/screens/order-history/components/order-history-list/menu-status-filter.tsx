import React, { memo, useCallback, useContext } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { Context } from './context';

const menuList = [
  {
    id: 'waiting_for_payment',
    label: 'Menunggu Pembayaran',
  },
  {
    id: 'ongoing',
    label: 'Pesanan Berlangsung',
  },
  {
    id: 'done',
    label: 'Pesanan Selesai',
  },
  {
    id: 'failed',
    label: 'Pesanan Gagal',
  },
];

const MenuStatusFilter = () => {
  const [state, setState] = useContext(Context);

  const onSelectFilter = useCallback(
    (id: string) => {
      if (id === state.status) {
        // reset
        setState((prev) => ({
          ...prev,
          status: '',
          orderStatus: '',
          keyword: '',
        }));
        return void 0;
      }
      setState((prev) => ({
        ...prev,
        status: id,
        orderStatus: '',
        keyword: '',
      }));
    },
    [state.status],
  );

  // ui flatten
  const mainStyle = useCallback(
    (id) =>
      StyleSheet.flatten([
        styles.main,
        id === state.status ? styles.activeMain : styles.deactivateMain,
      ]),
    [state.status],
  );

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}>
        {menuList.map((i) => (
          <TouchableOpacity
            key={i.id}
            style={mainStyle(i.id)}
            onPress={() => onSelectFilter(i.id)}>
            <SnbText.C2
              color={i.id === state.status ? color.red70 : color.black100}>
              {i.label}
            </SnbText.C2>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 16,
    borderWidth: 1,
    borderRadius: 4,
  },
  activeMain: {
    backgroundColor: color.red10,
    borderColor: color.red40,
  },
  deactivateMain: {
    backgroundColor: color.white,
    borderColor: color.black40,
  },
});
export default memo(MenuStatusFilter);
