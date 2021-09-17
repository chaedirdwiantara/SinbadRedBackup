import React, { FC, useEffect } from 'react';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { View, FlatList } from 'react-native';
import { NavigationAction } from '@navigation';
import { color } from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
/** === IMPORT FUNCTION HERE === */
import { MerchantHookFunc } from '../../function';
/** === IMPORT STYLE HERE === */
// import MerchantStyles from '../../styles/merchant.style';

const MerchantSupplierInformationView: FC = () => {
  /** === HOOK === */
  const supplierListAction = MerchantHookFunc.useSupplierListAction();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  useEffect(() => {
    supplierListAction.list(dispatchSupplier);
  }, []);
  /** === VIEW === */
  /** => header */
  console.log('stateSupplier:', stateMerchant);

  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Informasi Supplier"
        backAction={() => NavigationAction.back()}
      />
    );
  };
  /** => content */
  const content = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          // contentContainerStyle={{ flex: 1 }}
          data={stateMerchant.list.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // refreshing={refreshGetMerchantSupplier}
          // refreshControl={
          //   <RefreshControl onRefresh={this.getMerchantSupplier} />
          // }
          // onEndReachedThreshold={0.1}
          // onEndReached={this.onHandleLoadMore}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator
          // ListEmptyComponent={this.renderEmpty}
        />
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: any }) => {
    console.log('item:', item);

    return (
      <View key={index}>
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <SnbText.H4>{item.name}</SnbText.H4>
          <View style={{ marginTop: 8 }}>
            <SnbText.B3>{item.createdAt}</SnbText.B3>
          </View>
        </View>
      </View>
    );
  };
  const renderSeparator = () => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderColor: color.black10,
          marginTop: 16,
        }}
      />
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default MerchantSupplierInformationView;
