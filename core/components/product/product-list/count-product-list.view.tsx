import React, { FC, memo, useCallback, useMemo, useState } from 'react';
// component
import { View, TouchableOpacity } from 'react-native';
import { Text, SnbIcon, spacingV2 } from '@sinbad/react-native-sinbad-ui';
// function
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useProductListContext } from './';

// types
type TitleSectionProps = {
  testID: string;
};

// var
const { spacing } = spacingV2;
const App: FC<TitleSectionProps> = ({ testID }) => {
  const [isGrid, setIsGrid] = useState(true);

  const { stateProduct } = useProductContext();

  const { trigerModal, state, onChangeLayout } = useProductListContext();

  const total = useMemo(
    () => stateProduct.list.total,
    [stateProduct.list.total],
  );

  const layout = useMemo(() => state.layout, [state.layout]);

  const iconLayout = useMemo(
    () => (layout === 'list' ? 'view_list' : 'view_module'),
    [layout],
  );
  // function handle press change layout grid or list
  const onPressLayout = useCallback(() => {
    const payload = !isGrid;
    const layout = payload ? 'grid' : 'list';
    setIsGrid(payload);
    onChangeLayout(layout);
  }, [isGrid]);
  return (
    <View
      style={{
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        marginTop: spacing.lg,
      }}>
      <Text.Title
        testID={'count-product.' + testID}
        text={`${total ?? ''} Produk`}
        actionComponent={
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              testID={'btn-show-filter.count-product.' + testID}
              style={{ marginRight: spacing.lg }}
              onPress={() => trigerModal('filter', true)}>
              <SnbIcon name="filter_list" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              testID={'btn-change-layout.count-product.' + testID}
              onPress={onPressLayout}>
              <SnbIcon name={iconLayout} size={24} />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export const CountProductList = memo(App);
