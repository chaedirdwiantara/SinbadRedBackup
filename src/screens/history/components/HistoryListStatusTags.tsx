/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
import { SnbChips } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPE === */
interface HistoryListStatusTagsProps {
  visible: boolean;
  data: Array<models.IPaymentStatusList> | Array<models.OrderStatus>;
  activeStatus: string;
  onTagPress: (tag: models.IPaymentStatusList | models.OrderStatus) => void;
}
/** === COMPONENT === */
export const HistoryListStatusTags: FC<HistoryListStatusTagsProps> = ({
  visible,
  data,
  activeStatus,
  onTagPress,
}) => {
  return visible ? (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}>
        {data.map((item) => (
          <View key={item.status} style={{ marginRight: 16 }}>
            <SnbChips.Choice
              text={item.title}
              status={item.status === activeStatus ? 'active' : 'inactive'}
              onPress={() => onTagPress(item)}
            />
          </View>
        ))}
        <View style={{ width: 16 }} />
      </ScrollView>
    </View>
  ) : (
    <View />
  );
};
