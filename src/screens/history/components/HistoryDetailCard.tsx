/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { TouchableWithoutFeedback, View, Image } from 'react-native';
import { SnbText, color, styles } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { HistoryDetailCardDivider } from './HistoryDetailCardDivider';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '../styles';
/** === TYPE === */
interface HistoryDetailCardProps {
  title: string;
  actionTitle?: string;
  onActionClick?: () => void;
  actionLoading?: boolean;
  gutter?: boolean;
  contentTopSpaces?: number;
}
/** === COMPONENT === */
export const HistoryDetailCard: FC<HistoryDetailCardProps> = ({
  title,
  children,
  actionTitle,
  onActionClick,
  actionLoading,
  gutter = true,
  contentTopSpaces,
}) => (
  <View>
    <View style={gutter ? styles.shadowForBox10 : {}}>
      <View style={HistoryDetailStyle.cardHeader}>
        <SnbText.B4>{title}</SnbText.B4>
        {actionTitle && (
          <TouchableWithoutFeedback onPress={onActionClick}>
            <View>
              {!actionLoading ? (
                <SnbText.B4 color={color.red50}>{actionTitle}</SnbText.B4>
              ) : (
                <Image
                  source={require('../../../assets/gif/loading/load_more.gif')}
                  style={{ height: 16, width: 50 }}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <HistoryDetailCardDivider />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          paddingTop: contentTopSpaces,
        }}>
        {children}
      </View>
    </View>
    {gutter && <View style={{ height: 10, backgroundColor: color.black5 }} />}
  </View>
);
