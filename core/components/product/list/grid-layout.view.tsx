/** === IMPORT PACKAGES ===  */
import React from 'react';
import { View, ScrollView } from 'react-native';
/** === IMPORT COMPONENTS === */
import TagView from './tag.view';
import { ProductGridCard } from '@core/components/ProductGridCard';
/** === IMPORT FUNCTIONS === */
import { scrollHasReachedEnd } from '@core/functions/global/scroll-position';
/** === IMPORT MODEL === */
import * as models from '@models';
/** === TYPE === */
interface ListProps {
  data: models.ListItemProps<models.ProductList[]>;
  tags: Array<string>;
  onTagPress: (tags: Array<string>) => void;
}
/** === COMPONENT === */
const GridLayoutView: React.FC<ListProps> = ({ data, tags, onTagPress }) => {
  /** === VIEW === */
  /** => Tag List */
  const renderTagList = () => <TagView tags={tags} onTagPress={onTagPress} />;
  /** => Grid Card */
  const renderGridCard = (item: models.ProductList, index: number) => {
    return (
      <View
        key={index}
        style={{ marginRight: index % 2 === 0 ? 8 : 0, marginBottom: 4 }}>
        <ProductGridCard
          flexOne={true}
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
  /** => Grid List */
  const renderGridList = () => (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        {data.data.map(
          (item, itemIndex) =>
            itemIndex % 2 === 0 && renderGridCard(item, itemIndex),
        )}
      </View>
      <View style={{ flex: 1 }}>
        {data.data.map(
          (item, itemIndex) =>
            itemIndex % 2 === 1 && renderGridCard(item, itemIndex),
        )}
      </View>
    </View>
  );
  /** => Main */
  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (scrollHasReachedEnd(nativeEvent)) {
            console.log('Scroll has reached end');
          }
        }}
        scrollEventThrottle={10}>
        {renderTagList()}
        {renderGridList()}
      </ScrollView>
    </View>
  );
};

export default GridLayoutView;
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
