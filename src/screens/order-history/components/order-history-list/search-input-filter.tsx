import React, { memo, useCallback, useRef, useState, useContext } from 'react';
import { SnbIcon, SnbTextField } from 'react-native-sinbad-ui';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ModalTransactionFilter, {
  ModalTransactionRef,
} from './modal-transaction-filter';
import { Context } from './context';
import { useMemo } from 'react';
import { useEffect } from 'react';

const SearchInputFilter = () => {
  const [search, setSearch] = useState('');
  const [state, setState] = useContext(Context);
  const filterModalRef = useRef<ModalTransactionRef>(null);

  const onClear = useCallback(() => {
    setSearch('');
    setState((prev) => ({ ...prev, keyword: '' }));
  }, []);

  const onEnter = useCallback(() => {
    setState((prev) => ({ ...prev, keyword: search }));
  }, [search]);

  const onSubmitOrderStatus = useCallback((orderStatus) => {
    setState((prev) => ({ ...prev, orderStatus }));
  }, []);

  const isShowFilterOrderStatus = useMemo(
    () => state.status === 'ongoing',
    [state.status],
  );

  // clear if change status menu
  useEffect(() => {
    setSearch('');
  }, [state.status]);

  // hide search
  if (state.status === 'waiting_for_payment') return <View />;

  return (
    <View style={styles.main}>
      <View style={styles.input}>
        <SnbTextField.Text
          placeholder="Cari Transaksi"
          type="default"
          onChangeText={setSearch}
          clearText={onClear}
          enter={onEnter}
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
            onPress={() => filterModalRef.current?.trigger()}>
            <SnbIcon name="filter_list" size={24} />
          </TouchableOpacity>
          <ModalTransactionFilter
            ref={filterModalRef}
            onSubmit={onSubmitOrderStatus}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  icon: { justifyContent: 'center', marginLeft: 16 },
});

export default memo(SearchInputFilter);
