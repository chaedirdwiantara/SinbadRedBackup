import React, { FC } from 'react';
import { View } from 'react-native';
import {
  SpecialButton,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';

interface IHomeCategory {
  imageUrl?: string;
  title: string;
  loading?: boolean;
}

interface HomeCategoriesProps {
  data: IHomeCategory[];
}

const otherCategories: IHomeCategory = {
  imageUrl:
    'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/semua+kategori%403x.png',
  title: 'Kategori Lainnya',
};

export const Categories: FC<HomeCategoriesProps> = ({ data }) => {
  const mappedData = [...data];
  mappedData[7] = otherCategories;

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
        {mappedData.slice(0, 4).map((category, index) => (
          <View
            key={category.title}
            style={{
              marginRight: index < 3 ? layout.spacing.lg : 0,
              flex: 1,
              alignItems: 'center',
            }}>
            <SpecialButton.Feature
              type="category"
              title={category.title}
              imageUrl={category.imageUrl}
              onPress={() => console.log(`Go to ${category.title}`)}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {mappedData.slice(4, 8).map((category, index) => (
          <View
            key={category.title}
            style={{
              marginRight: index < 3 ? layout.spacing.lg : 0,
              flex: 1,
              alignItems: 'center',
            }}>
            <SpecialButton.Feature
              type="category"
              title={category.title}
              imageUrl={category.imageUrl}
              onPress={() => console.log(`Go to ${category.title}`)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
