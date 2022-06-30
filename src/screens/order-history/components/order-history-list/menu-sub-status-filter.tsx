import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SnbChips2 } from 'react-native-sinbad-ui';
import { Context } from './context';

const subMenuList = [
  {
    code: 'perfect_order',
    label: 'Selesai Semua'
  },
  {
    code: 'partial_order',
    label: 'Selesai Sebagian'
  },
  {
    code: 'failed_order',
    label: 'Gagal Semua'
  }
]

const MenuSubStatusFilter = () => {
  const [state, setState] = useContext(Context);
  const [subFilter, setSubFilter] = useState('')
  const onSelectSubFilter = useCallback(() => {
    setState((prev) => ({ ...prev, subOrderStatus: subFilter }));
  }, [subFilter])
  useEffect(() => {
    onSelectSubFilter();
  }, [subFilter]);

  if(state.status === "waiting_for_payment" || state.status === "ongoing") return <View />;
  return (
    <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsVerticalScrollIndicator={false}>
        {subMenuList.map((i) => (
          <View style={styles.main}>
            <SnbChips2.Choice
              testID={'08'}
              key={i.code}
              text={i.label}
              active= {i.code === state.subOrderStatus ? true : false }
              onPress={() => setSubFilter(i.code)}
            />
          </View>
        ))}
        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    marginRight: 16,
    marginTop: 16,
    marginBottom: 8,
  }
})
export default memo(MenuSubStatusFilter)