/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goToCategory, useCategoryAction, goToProduct } from '../functions';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import Menu from '@core/components/Menu';
import { CategoryHomeItem } from './CategoryHomeItem';
/** === IMPORT STYLE HERE === */
import CategoryHomeStyle from '../styles/category-home.style';
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
  /** => Category Item */
  const renderCategoryItem = ({
    item,
    index,
  }: {
    item: models.CategoryHome;
    index: number;
  }) =>
    item ? (
      <CategoryHomeItem
        key={index}
        name={item.name}
        icon={item.icon}
        onPress={() => (item.hasChild ? goToCategory(item.id) : goToProduct())}
      />
    ) : (
      <CategoryHomeItem
        key={index}
        name="Semua Kategori"
        icon="https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/semua+kategori%403x.png"
        onPress={() => goToCategory()}
      />
    );
  /** => Loading */
  const renderLoading = () => (
    <View>
      <SnbText.B1>loading</SnbText.B1>
    </View>
  );
  /** => Content */
  const renderContent = () => (
    <View>
      <Menu
        data={categoryHomeData.data}
        column={4}
        renderItem={renderCategoryItem}
      />
    </View>
  );
  /** => Main */
  return (
    <View style={CategoryHomeStyle.container}>
      {categoryHomeData.loading || categoryHomeData.data.length === 0
        ? renderLoading()
        : renderContent()}
    </View>
  );
};

export default CategoryHomeView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: aliisetia
 * updatedDate: 08-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
