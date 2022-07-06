import { useMenuStatusListAction } from '@screen/order-history/functions/history-list/use-history-list.hook';
import React, { memo, useCallback, useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SnbChips2, SnbText2 } from 'react-native-sinbad-ui';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { Context } from './context';

const MenuStatusFilter = () => {
  const menuStatusListAction = useMenuStatusListAction();
  const {
    stateOrderHistory: {
      menuStatus: { data },
    },
    dispatchOrderHistory
  } = useOrderHistoryContext();
  useEffect(() => {
    menuStatusListAction.menuStatusList(
      dispatchOrderHistory,
    );
  }, []);
  const [state, setState] = useContext(Context);

  const onSelectFilter = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        status: '',
        orderGroupStatus: id,
        subOrderGroupStatus: '',
        keyword: '',
      }));
    },
    [state.orderGroupStatus],
  );

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}>
        {data?.map((i) => (
          <View style={styles.main}>
            <SnbChips2.Choice
              testID={'01'}
              key={i.code}
              text={i.label}
              active={i.code === state.orderGroupStatus ? true : false}
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
