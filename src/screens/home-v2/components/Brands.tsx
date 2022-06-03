import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import {
  Text,
  Content,
  spacingV2 as layout,
  SnbHorizontalScrollContainer,
  SnbButton2,
} from '@sinbad/react-native-sinbad-ui';
import { useFocusEffect } from '@react-navigation/native';

import { useBrandContext } from 'src/data/contexts/brand/useBrandContext';
import {
  useBrandListAction,
  goToProduct,
  goToBrandList,
} from 'src/screens/brand/functions';

export const Brands: FC = () => {
  const {
    stateBrand: { list: brandListState },
    dispatchBrand,
  } = useBrandContext();
  const { fetch } = useBrandListAction();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchBrand);
    }, []),
  );

  return (
    <View style={{ marginBottom: layout.spacing.lg }}>
      <View style={{ paddingHorizontal: layout.spacing.lg }}>
        <Text.Title
          text="Brand Resmi Kami"
          actionComponent={
            <SnbButton2.Link
              title="Lihat Semua"
              size="medium"
              onPress={goToBrandList}
            />
          }
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <SnbHorizontalScrollContainer
          ItemComponent={Content.NewBrand.Square}
          data={brandListState.data}
          keyExtractor={(item) => item.id}
          loading={brandListState.loading}
          itemSpaces={layout.spacing.md}
          onItemPress={(brand) => goToProduct(brand)}
        />
      </View>
    </View>
  );
};
