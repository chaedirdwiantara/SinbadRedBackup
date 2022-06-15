import React, { FC, memo, useCallback, useState } from 'react';
// component
import { View, TouchableOpacity } from 'react-native';
import { Text, SnbIcon, spacingV2 } from '@sinbad/react-native-sinbad-ui';

// types
type TitleSectionProps = {
  total: number;
  onSortPress?: () => void;
  onChangeLayoutListPress?: (status: 'list' | 'grid') => void;
};

// var
const { spacing } = spacingV2;

const TitleSection: FC<TitleSectionProps> = (props) => {
  const { total, onChangeLayoutListPress, onSortPress } = props;

  const [isGrid, setIsGrid] = useState(true);
  // function handle press change layout grid or list
  const onPressLayout = useCallback(() => {
    const payload = !isGrid;
    const layout = payload ? 'grid' : 'list';
    setIsGrid(payload);
    onChangeLayoutListPress && onChangeLayoutListPress(layout);
  }, [isGrid, onChangeLayoutListPress]);

  return (
    <View
      style={{
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        marginTop: spacing.lg,
      }}>
      <Text.Title
        text={`${total ?? ''} Produk`}
        actionComponent={
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ marginRight: spacing.lg }}
              onPress={onSortPress}>
              <SnbIcon name="sort" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressLayout}>
              <SnbIcon name={isGrid ? 'view_list' : 'view_module'} size={24} />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default memo(TitleSection);
