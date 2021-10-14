import React, { FC, useEffect } from 'react';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { View, FlatList, RefreshControl } from 'react-native';
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
  /** LOAD MORE LIST VIEW */
  const onHandleLoadMore = () => {
    if (stateMerchant.list.data) {
      if (stateMerchant.list.data.length < stateMerchant.list.total) {
        supplierListAction.loadMore(dispatchSupplier, stateMerchant.list);
      }
    }
  };

  const getMerchantSupplier = () => {
    supplierListAction.refresh(dispatchSupplier);
  };
  /** === VIEW === */
  /** => header */
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
    const flatListStyle = stateMerchant.list.data.length > 0 ? {} : { flex: 1 };
    return (
      <View style={{ flex: 1, marginBottom: 16 }}>
        <FlatList
          contentContainerStyle={flatListStyle}
          data={stateMerchant.list.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={stateMerchant.list.refresh}
          refreshControl={
            <RefreshControl
              refreshing={stateMerchant.list.refresh}
              onRefresh={getMerchantSupplier}
            />
          }
          onEndReachedThreshold={0.1}
          onEndReached={onHandleLoadMore}
          showsVerticalScrollIndicator
          ListEmptyComponent={renderEmpty}
        />
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SnbText.B1>Empty</SnbText.B1>
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: any }) => {
    return (
      <View key={index}>
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <SnbText.H4>{item.name}</SnbText.H4>
          <View style={{ marginTop: 8 }}>
            <SnbText.B3>{item.createdAt}</SnbText.B3>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: color.black10,
            marginTop: 16,
          }}
        />
        {stateMerchant.list.loadMore ? (
          <View style={{ alignItems: 'center' }}>
            <SnbText.B1>Loading ...</SnbText.B1>
          </View>
        ) : null}
      </View>
    );
  };
  const loadingPage = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SnbText.B1>Loading ...</SnbText.B1>
      </View>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {!stateMerchant.list.loading ? content() : loadingPage()}
    </SnbContainer>
  );
};

export default MerchantSupplierInformationView;
