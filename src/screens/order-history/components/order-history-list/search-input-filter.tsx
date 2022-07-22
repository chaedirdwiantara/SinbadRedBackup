import React, { memo, useCallback, useRef, useState, useContext } from 'react';
import {
  SnbIcon,
  SnbTextField2,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ModalTransactionFilter from './modal-transaction-filter';
import { Context } from './context';
import { useMemo } from 'react';
import { useEffect } from 'react';

const SearchInputFilter = () => {
  const [search, setSearch] = useState('');
  const [state, setState] = useContext(Context);
  const filterModalRef = useRef<SnbBottomSheet2Ref>(null);

  const onClear = useCallback(() => {
    setSearch('');
    setState((prev) => ({ ...prev, keyword: '' }));
  }, []);

  const onEnter = useCallback(() => {
    setState((prev) => ({ ...prev, keyword: search }));
  }, [search]);

  const onSubmitOrderStatus = useCallback(
    (status: string) => {
      setState((prev) => ({ ...prev, status }));
      filterModalRef.current?.close();
    },
    [filterModalRef.current],
  );

  const isShowFilterOrderStatus = useMemo(
    () => state.orderGroupStatus === 'ongoing',
    [state.orderGroupStatus],
  );

  // clear if change status menu
  useEffect(() => {
    setSearch('');
  }, [state.orderGroupStatus]);

  // hide search
  if (state.orderGroupStatus === 'waiting_for_payment') return <View />;

  return (
    <View style={styles.main}>
      <View style={styles.input}>
        <SnbTextField2.Text
          testID={'03'}
          placeholder="Cari Transaksi"
          type="default"
          onChangeText={setSearch}
          onClearText={onClear}
          onEnter={onEnter}
          value={search}
          prefixIconName="search"
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="search"
        />
      </View>
      {isShowFilterOrderStatus && (
        <>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => filterModalRef.current?.open()}>
            <SnbIcon name="filter_list" size={24} />
          </TouchableOpacity>
          <ModalTransactionFilter
            ref={filterModalRef}
            onSubmit={onSubmitOrderStatus}
            onClose={() => filterModalRef.current?.close()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  icon: { justifyContent: 'center', marginLeft: 16 },
});

export default memo(SearchInputFilter);
