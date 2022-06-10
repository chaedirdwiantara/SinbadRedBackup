import React, { memo, useCallback, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SnbChips2 } from 'react-native-sinbad-ui';
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
      setState((prev) => ({
        ...prev,
        status: id,
        orderStatus: '',
        keyword: '',
      }));
    },
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
          <View style={styles.main}>
            <SnbChips2.Choice
              key={i.id}
              text={i.label}
              active={i.id === state.status ? true : false}
              onPress={() => onSelectFilter(i.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginRight: 8,
    marginVertical: 16,
  },
});
export default memo(MenuStatusFilter);
