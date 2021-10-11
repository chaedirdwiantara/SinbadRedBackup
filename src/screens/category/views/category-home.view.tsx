/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goToCategory, useCategoryAction, goToProduct } from '../functions';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import Menu from '@core/components/Menu';
/** === IMPORT STYLE HERE === */
import CategoryStyle from '../styles/category.style';
/** === IMPORT MODEL HERE === */
import * as models from '@models';
/** === COMPONENT === */
const CategoryHomeView: React.FC = () => {
  /** === HOOK === */
  const { stateCategory, dispatchCategory } = React.useContext(
    contexts.CategoryContext,
  );
  const { home } = useCategoryAction();
  const categoryHomeData = stateCategory.home.list;
  /** === EFFECT === */
  React.useEffect(() => {
    home(dispatchCategory);
  }, []);
  /** === VIEW === */
  /** => item */
  const itemCategoryHome = ({
    item,
    index,
  }: {
    item: models.CategoryHome;
    index: number;
  }) => {
    return item ? (
      <TouchableOpacity
        key={index}
        style={{ borderWidth: 1, flex: 1 }}
        onPress={() => (item.hasChild ? goToCategory(item.id) : goToProduct())}>
        <SnbText.B1>{item.name}</SnbText.B1>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        key={index}
        style={{ borderWidth: 1, flex: 1 }}
        onPress={() => goToCategory()}>
        <SnbText.B1>Semua</SnbText.B1>
      </TouchableOpacity>
    );
  };
  /** => loading */
  const loading = () => {
    return (
      <View>
        <SnbText.B1>loading</SnbText.B1>
      </View>
    );
  };
  /** => content */
  const content = () => {
    return (
      <View>
        <Menu
          data={categoryHomeData.data}
          column={4}
          renderItem={itemCategoryHome}
        />
      </View>
    );
  };
  /** => process */
  const process = () => {
    return categoryHomeData.loading || categoryHomeData.data.length === 0
      ? loading()
      : content();
  };
  /** => main */
  return <View style={CategoryStyle.categoryHomeContainer}>{process()}</View>;
};

export default CategoryHomeView;

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
