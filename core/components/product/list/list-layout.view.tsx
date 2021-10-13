/** === IMPORT PACKAGES ===  */
import React from 'react';
import { View, FlatList } from 'react-native';
/** === IMPORT COMPONENTS === */
import TagView from './tag.view';
import { ProductListCard } from '@core/components/ProductListCard';
/** === IMPORT MODEL === */
import * as models from '@models';
/** === TYPE === */
interface ListProps {
  data: models.ListItemProps<models.ProductList[]>;
  tags: Array<string>;
  onTagPress: (tags: Array<string>) => void;
}
/** === COMPONENT === */
const ListLayoutView: React.FC<ListProps> = ({ data, tags, onTagPress }) => {
  /** === VIEW === */
  /** => Tag List */
  const renderTagList = () => <TagView tags={tags} onTagPress={onTagPress} />;
  /** => List Card */
  const renderListCard = ({
    item,
    index,
  }: {
    item: models.ProductList;
    index: number;
  }) => {
    return (
      <View key={index} style={{ minHeight: 100 }}>
        <ProductListCard
          name={item.name}
          imageUrl={item.image ?? item.thumbnail}
          price={item.currentPrice ?? 0}
          isBundle={item.isBundle}
          isPromo={item.isPromo}
          isExclusive={item.isExclusive}
          onCardPress={() => console.log(`${item.name} pressed`)}
          withOrderButton={true}
          onOrderPress={() => console.log(`${item.name} order pressed`)}
        />
      </View>
    );
  };
  /** => Main */
  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 24 }}
        ListHeaderComponent={renderTagList}
        data={data.data}
        renderItem={renderListCard}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={() => console.log('List scroll has reached end')}
        showsVerticalScrollIndicator={true}
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
 * updatedBy: aliisetia
 * updatedDate: 12-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
