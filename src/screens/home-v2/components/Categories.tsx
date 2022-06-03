import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import {
  SpecialButton,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';

import * as models from '@models';
import { useCategoryContext } from 'src/data/contexts/category/useCategoryContext';
import {
  goToCategory,
  useCategoryAction,
  goToProduct,
} from 'src/screens/category/functions';

const otherCategories: models.CategoryHome = {
  icon: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/semua+kategori%403x.png',
  name: 'Kategori Lainnya',
  id: 'others',
  hasChild: false,
};

export const Categories: FC = () => {
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

  return (
    <View
      style={{
        paddingVertical: layout.spacing.xl,
        paddingHorizontal: layout.spacing.xxl,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: layout.spacing.lg,
        }}>
        {categoryHomeState.data.slice(0, 4).map((category, index) => (
          <View
            key={category.name}
            style={{
              marginRight: index < 3 ? layout.spacing.lg : 0,
              flex: 1,
              alignItems: 'center',
            }}>
            <SpecialButton.Feature
              type="category"
              title={category.name}
              imageUrl={category.icon}
              onPress={() => goToProduct(category)}
              loading={categoryHomeState.loading}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {[...categoryHomeState.data.slice(4, 7), otherCategories].map(
          (category, index) => (
            <View
              key={category.name}
              style={{
                marginRight: index < 3 ? layout.spacing.lg : 0,
                flex: 1,
                alignItems: 'center',
              }}>
              <SpecialButton.Feature
                type="category"
                title={category.name}
                imageUrl={category.icon}
                onPress={() => {
                  if (category.name === 'Kategori Lainnya') {
                    goToCategory();
                  } else {
                    goToProduct(category);
                  }
                }}
                loading={categoryHomeState.loading}
              />
            </View>
          ),
        )}
      </View>
    </View>
  );
};
