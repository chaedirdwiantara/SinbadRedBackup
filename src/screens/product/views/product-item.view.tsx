/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbBottomActions,
  SnbTabs,
} from 'react-native-sinbad-ui';
import { goBack, useTabCategory, useProductListAction } from '../functions';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT HERE === */
/** === IMPORT MODEL HERE === */
import * as models from '@models';
/** === COMPONENT === */
const ProductItemView: React.FC = () => {
  /** === HOOK === */
  const { categories, activeTabs, changeTab } = useTabCategory();
  const { list } = useProductListAction();
  const { stateProduct, dispatchProduct } = React.useContext(
    contexts.ProductContext,
  );
  /** === EFFECT === */
  React.useEffect(() => {
    list(dispatchProduct);
  }, []);
  /** === VIEW === */
  const renderItem = ({
    item,
    index,
  }: {
    item: models.ProductList;
    index: number;
  }) => {
    return (index + 1) / 2 !== 1 ? (
      <View style={{ borderWidth: 1 }}>
        <SnbText.B1>{item.name}</SnbText.B1>
        {item.isExclusive ? <SnbText.B1>bundle</SnbText.B1> : null}
      </View>
    ) : (
      <View style={{ borderWidth: 1 }}>
        <SnbText.B1>{item.name}</SnbText.B1>
        {item.isExclusive ? <SnbText.B1>bundle</SnbText.B1> : null}
      </View>
    );
  };
  /** => main */
  return (
    <View style={{ borderWidth: 1, flex: 1 }}>
      {stateProduct.list.data.length > 0 ? (
        <FlatList
          //  contentContainerStyle={styles.boxFlatlist}
          horizontal={false}
          numColumns={2}
          data={stateProduct.list.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          //  refreshing={this.props.notification.refreshGetNotification}
          //  onRefresh={this.onHandleRefresh}
          //  onEndReachedThreshold={0.1}
          //  onEndReached={this.onHandleLoadMore.bind(this)}
          //  ItemSeparatorComponent={this.renderSeparator}
          showsVerticalScrollIndicator
        />
      ) : null}
    </View>
  );
};

export default ProductItemView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
