/** === IMPORT PACKAGES === */
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import Menu from '@core/components/Menu';
import { CategoryHomeItem } from './CategoryHomeItem';
/** === IMPORT FUNCTIONS === */
import { useCategoryContext } from 'src/data/contexts/category/useCategoryContext';
import { goToCategory, useCategoryAction, goToProduct } from '../functions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === IMPORT STYLE === */
import CategoryHomeStyle from '../styles/category-home.style';
/** === COMPONENT === */
const CategoryHomeView: FC = () => {
  /** === HOOKS === */
  const {
    stateCategory: {
      home: { list: categoryHomeState },
    },
    dispatchCategory,
  } = useCategoryContext();
  const { fetchHome } = useCategoryAction();

  useEffect(() => {
    fetchHome(dispatchCategory);
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
        onPress={() =>
          item.hasChild ? goToCategory(item.id) : goToProduct(item)
        }
      />
    ) : (
      <CategoryHomeItem
        key={index}
        name="Semua Kategori"
        icon="https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/semua+kategori%403x.png"
        onPress={() => goToCategory()} // Don't change it to goToCategory only, because this function accepts argument
      />
    );
  /** => Main */
  return (
    <View style={CategoryHomeStyle.container}>
      {categoryHomeState.loading || categoryHomeState.data.length === 0 ? (
        <View>
          <SnbText.B1>loading</SnbText.B1>
        </View>
      ) : (
        <View>
          <Menu
            data={categoryHomeState.data}
            column={4}
            renderItem={renderCategoryItem}
          />
        </View>
      )}
    </View>
  );
};

export default CategoryHomeView;
