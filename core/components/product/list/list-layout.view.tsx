/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import TagView from './tag.view';
interface ListProps {
  data: models.ListItemProps<models.ProductList[]>;
}
/** === IMPORT MODEL HERE === */
import * as models from '@models';
/** === COMPONENT === */
const ListLayoutView: React.FC = () => {
  /** === VIEW === */
  /** => product tag */
  const tag = () => {
    return <TagView />;
  };
  /** => product item */
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View key={index} style={{ borderWidth: 1, height: 100 }}>
        <SnbText.B1>{item}</SnbText.B1>
      </View>
    );
  };
  /** => main */
  return (
    <View style={{ borderWidth: 1, flex: 1 }}>
      <FlatList
        //  contentContainerStyle={styles.boxFlatlist}
        ListHeaderComponent={tag}
        data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        //  refreshing={this.props.notification.refreshGetNotification}
        //  onRefresh={this.onHandleRefresh}
        //  onEndReachedThreshold={0.1}
        //  onEndReached={this.onHandleLoadMore.bind(this)}
        //  ItemSeparatorComponent={this.renderSeparator}
        showsVerticalScrollIndicator
      />
    </View>
  );
};

export default ListLayoutView;
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
