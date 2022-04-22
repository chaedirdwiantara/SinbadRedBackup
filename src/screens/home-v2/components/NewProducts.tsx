import React, { FC } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import {
  Content,
  spacingV2 as layout,
  SnbHorizontalScrollContainer,
  ProductCard,
} from '@sinbad/react-native-sinbad-ui';

interface IChip {
  text: string;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: (chip: string) => void;
}

type ProductBadgeType =
  | 'success'
  | 'warning'
  | 'error'
  | 'information'
  | 'neutral';

interface ProductBadge {
  title: string;
  type: ProductBadgeType;
  iconName?: string;
  iconPosition?: 'start' | 'end';
}

interface IProduct {
  imageUrl?: string;
  name: string;
  originalPrice?: string;
  originalPriceStyle?: 'line-through' | 'red-colored';
  currentPrice: string;
  soldBy: string;
  badgeProps?: ProductBadge;
  priceDropPercentage?: number;
  usePriceDropIcon?: boolean;
  ribbonText?: string;
  ribbonColor?: 'red' | 'blue' | 'yellow' | 'green' | 'purple';
  ribbonWidth?: number;
  ribbonTextContainerStyle?: StyleProp<ViewStyle>;
  outOfStock?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  buttonDisabled?: boolean;
  onCardPress?: () => void;
  loading?: boolean;
}

interface NewProductsProps {
  chips: IChip[];
  data: IProduct[];
  loading?: boolean;
}

export const NewProducts: FC<NewProductsProps> = ({ chips, data, loading }) => {
  return (
    <View
      style={{
        marginBottom: layout.spacing.xl,
        paddingHorizontal: layout.spacing.lg,
      }}>
      <Content.SearchRecommendation
        chipsType="choice"
        chips={chips}
        title="Produk Terbaru"
        actionText="Lihat Semua"
        onActionPress={() => console.log('See all new products')}
        loading={loading}
      />
      <View style={{ marginTop: layout.spacing.md }}>
        <SnbHorizontalScrollContainer
          ItemComponent={ProductCard.Grid}
          data={data}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          loading={loading}
        />
      </View>
    </View>
  );
};
