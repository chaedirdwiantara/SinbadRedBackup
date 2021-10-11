/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { SnbText, color, styles } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { HistoryDetailStyle } from '../../styles';
/** === TYPES === */
interface HistoryDetailCardProps {
  title: string;
  actionTitle?: string;
  onActionClick?: () => void;
}

interface HistoryDetailCardDividerProps {
  horizontalSpaces?: number;
  topSpaces?: number;
}
/** === COMPONENTS === */
export const HistoryDetailCardDivider: FC<HistoryDetailCardDividerProps> = ({
  horizontalSpaces = 0,
  topSpaces = 8,
}) => (
  <View
    style={{
      borderTopWidth: 1,
      borderColor: color.black10,
      marginTop: topSpaces,
      marginHorizontal: horizontalSpaces,
    }}
  />
);

export const HistoryDetailCard: FC<HistoryDetailCardProps> = ({
  title,
  children,
  actionTitle,
  onActionClick,
}) => (
  <View>
    <View style={styles.shadowForBox10}>
      <View style={HistoryDetailStyle.cardHeader}>
        <SnbText.B4>{title}</SnbText.B4>
        {actionTitle && (
          <TouchableWithoutFeedback onPress={onActionClick}>
            <View>
              <SnbText.B4 color={color.red50}>{actionTitle}</SnbText.B4>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <HistoryDetailCardDivider />
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {children}
      </View>
    </View>
    <View style={{ height: 10, backgroundColor: color.black5 }} />
  </View>
);
