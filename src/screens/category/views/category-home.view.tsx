/** === IMPORT PACKAGES === */
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENTS === */
import Menu from '@core/components/Menu';
import { CategoryHomeItem } from './CategoryHomeItem';
import { CategoryHomeItemSkeleton } from './CategoryHomeItemSkeleton';
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
  /** => All Category Button */
  const allCategoryButton = (
    <CategoryHomeItem
      key="all-category"
      name="Semua Kategori"
      icon="https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/semua+kategori%403x.png"
      onPress={() => goToCategory()} // Don't change it to goToCategory only, because this function accepts argument
    />
  );
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
      allCategoryButton
    );
  /** => Category Item Skeleton */
  const renderCategoryItemSkeleton = ({
    _,
    index,
  }: {
    _: any;
    index: number;
  }) =>
    index < 3 ? <CategoryHomeItemSkeleton key={index} /> : allCategoryButton;
  /** => Main */
  return (
    <View style={CategoryHomeStyle.container}>
      {categoryHomeState.loading || categoryHomeState.data.length === 0 ? (
        <View style={{ paddingHorizontal: 4 }}>
          <Menu
            data={[1, 2, 3, 4]}
            column={4}
            renderItem={renderCategoryItemSkeleton}
          />
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
