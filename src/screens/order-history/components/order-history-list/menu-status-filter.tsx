import React, { memo, useCallback, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SnbChips2 } from 'react-native-sinbad-ui';
import { Context } from './context';

// const menuList = [
//   {
//     id: 'waiting_for_payment',
//     label: 'Menunggu Pembayaran',
//   },
//   {
//     id: 'ongoing',
//     label: 'Pesanan Berlangsung',
//   },
//   {
//     id: 'done',
//     label: 'Pesanan Selesai',
//   },
//   {
//     id: 'failed',
//     label: 'Pesanan Gagal',
//   },
// ];
const menuDynamicData = [
  {
    id: "1",
    code: "waiting_for_payment",
    label: "Menunggu Pembayaran"
  },
  {
    id: "2",
    code: "ongoing",
    label: "Pesanan Berlangsung"
  },
  {
    id: "3",
    code: "completed",
    label: "Pesanan Selesai"
  }

]

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
        {menuDynamicData.map((i) => (
          <View style={styles.main}>
            <SnbChips2.Choice
              testID={'01'}
              key={i.code}
              text={i.label}
              active={i.code === state.status ? true : false}
              onPress={() => onSelectFilter(i.code)}
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
