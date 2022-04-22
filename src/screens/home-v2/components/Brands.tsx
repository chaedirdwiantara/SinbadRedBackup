import React, { FC } from 'react';
import { View } from 'react-native';
import {
  Text,
  Content,
  spacingV2 as layout,
  SnbHorizontalScrollContainer,
  SnbButton2,
} from '@sinbad/react-native-sinbad-ui';

interface IBrand {
  image: string;
  name: string;
  onPress?: () => void;
}

interface BrandsProps {
  data: IBrand[];
  loading?: boolean;
  onTitleActionPress: () => void;
}

export const Brands: FC<BrandsProps> = ({
  data,
  loading,
  onTitleActionPress,
}) => {
  return (
    <View
      style={{
        marginBottom: layout.spacing.xl,
        paddingHorizontal: layout.spacing.lg,
      }}>
      <Text.Title
        text="Brand Resmi Kami"
        actionComponent={
          <SnbButton2.Link
            title="Lihat Semua"
            size="medium"
            onPress={onTitleActionPress}
          />
        }
      />
      <View style={{ marginTop: layout.spacing.md }}>
        <SnbHorizontalScrollContainer
          ItemComponent={Content.NewBrand.Square}
          data={data}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          loading={loading}
          itemSpaces={layout.spacing.xl}
        />
      </View>
    </View>
  );
};
