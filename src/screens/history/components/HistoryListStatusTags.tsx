/** === IMPORT PACKAGES === */
import React, { FC, useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { SnbChips } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPE === */
interface HistoryListStatusTagsProps {
  visible: boolean;
  data: Array<models.IPaymentStatusList> | Array<models.OrderStatus>;
  activeStatus: string;
  onTagPress: (tag: models.IPaymentStatusList | models.OrderStatus) => void;
  activeTab: number;
}
/** === COMPONENT === */
export const HistoryListStatusTags: FC<HistoryListStatusTagsProps> = ({
  visible,
  data,
  activeStatus,
  onTagPress,
  activeTab,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const renderItem = ({
    item,
  }: {
    item: models.IPaymentStatusList | models.OrderStatus;
  }) => (
    <View key={item.status} style={{ marginRight: 16 }}>
      <SnbChips.Choice
        text={item.title}
        status={item.status === activeStatus ? 'active' : 'inactive'}
        onPress={() => onTagPress(item)}
      />
    </View>
  );

  useEffect(() => {
    if (data.length > 0) {
      flatListRef.current?.scrollToIndex({ index: 0 });
    }
  }, [activeTab]);

  return visible ? (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
        renderItem={renderItem}
        data={data as any}
        ListFooterComponent={<View style={{ width: 16 }} />}
        keyExtractor={(item) => item.status}
        initialScrollIndex={0}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));

          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
            });
          });
        }}
      />
    </View>
  ) : (
    <View />
  );
};
