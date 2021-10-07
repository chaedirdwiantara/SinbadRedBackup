/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import TagView from './tag.view';
interface ListProps {
  data: models.ListItemProps<models.ProductList[]>;
}
/** === IMPORT MODEL HERE === */
import * as models from '@models';
/** === COMPONENT === */
const GridLayoutView: React.FC = () => {
  /** === VIEW === */
  /** => tag */
  const tag = () => {
    return <TagView />;
  };
  const renderItem = () => {
    return (
      <View style={{ borderWidth: 1, height: 100 }}>
        <SnbText.B1>test</SnbText.B1>
      </View>
    );
  };
  /** => main */
  return (
    <View style={{ borderWidth: 1, flex: 1 }}>
      <ScrollView>
        {tag()}
        {renderItem()}
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
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
