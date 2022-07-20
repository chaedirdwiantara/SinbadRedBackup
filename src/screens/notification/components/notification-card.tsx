import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextLayoutEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { color, spacing as layout, border } from '@sinbad/design-token/mobile';
import {
  SnbIcon,
  SnbText2,
  SnbButton2,
  SnbImageCompressor,
} from '@sinbad/react-native-sinbad-ui';

type NotificationCardContentProps = {
  typeName?: string;
  testID: string;
  iconName: string;
  iconColor: string;
  product?: { url: string; name: string };
  title: string;
  date: string;
  content: string;
  read?: boolean;
  onPress?: () => void;
};

const typeTest = (testID: string) => ({ testID, accessibilityLabel: testID });

const NotificationCardContent: FC<NotificationCardContentProps> = ({
  typeName,
  title,
  date,
  content,
  read,
  iconName,
  iconColor,
  product,
  onPress,
  testID,
}) => {
  // show loadMore button
  const [isLoadMore, setIsLoadMore] = useState(false);
  // show full content text
  const [loadMore, setLoadMore] = useState(false);

  const onDetectLineText = useCallback(
    (params: NativeSyntheticEvent<TextLayoutEventData>) => {
      try {
        if (params.nativeEvent.lines.length > 2) {
          setIsLoadMore(true);
        }
      } catch (error) {}
    },
    [setIsLoadMore],
  );

  return (
    <TouchableOpacity
      {...typeTest(`${testID}.notification-card.touchable`)}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: layout.spacing.lg,
        backgroundColor: read ? color.bgColor.light : color.bgColor.neutral,
        borderBottomWidth: 1,
        borderColor: color.strokeColor.default,
      }}
      onPress={onPress}>
      <View
        style={{
          backgroundColor: iconColor,
          padding: layout.spacing.xsm,
          borderRadius: 50,
        }}>
        <SnbIcon name={iconName} color={color.iconColor.white} size={12} />
      </View>

      <View style={{ flex: 1, marginLeft: layout.spacing.md }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: layout.spacing.xxsm,
          }}>
          <SnbText2.Paragraph.Tiny color={color.textColor.secondary}>
            {typeName}
          </SnbText2.Paragraph.Tiny>
          <SnbText2.Paragraph.Tiny color={color.textColor.secondary}>
            {date}
          </SnbText2.Paragraph.Tiny>
        </View>
        <View
          style={{
            marginBottom: layout.spacing.xxsm,
          }}>
          <SnbText2.Body.Small>{title}</SnbText2.Body.Small>
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={loadMore ? 0 : 2}
          onTextLayout={onDetectLineText}>
          <SnbText2.Paragraph.Small color={color.textColor.secondary}>
            {content}
          </SnbText2.Paragraph.Small>
        </Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            paddingTop: layout.spacing.xsm,
          }}>
          {isLoadMore && !loadMore ? (
            <SnbButton2.Link
              onPress={() => setLoadMore((prev) => !prev)}
              title="Lihat Lebih Banyak"
              size="tiny"
              testID={`${testID}.expand`}
            />
          ) : (
            <View />
          )}
        </View>
        {/* product */}
        {product ? (
          <View
            style={{
              flexDirection: 'row',
              overflow: 'hidden',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: border.radius.md,
              backgroundColor: color.bgColor.light,
              padding: layout.spacing.xsm,
              borderColor: color.strokeColor.default,
            }}>
            <SnbImageCompressor
              style={{ height: 40, width: 40 }}
              uri={product.url}
              res={10}
            />
            <View style={{ flex: 1, marginHorizontal: layout.spacing.sm }}>
              <SnbText2.Paragraph.Small
                ellipsizeMode="tail"
                numberOfLines={1}
                color={color.textColor.secondary}>
                {product.name}
              </SnbText2.Paragraph.Small>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </TouchableOpacity>
  );
};

NotificationCardContent.defaultProps = {
  read: false,
  iconName: 'sinbad_point',
  iconColor: color.iconColor.yellow,
  product: undefined,
};

export default NotificationCardContent;
