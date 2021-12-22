/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { Image, View, StyleProp, ViewStyle, Pressable } from 'react-native';
import {
  color,
  SnbButton,
  SnbIcon,
  SnbSKUList,
  SnbText,
  styles,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { toCurrency } from '@core/functions/global/currency-format';
import { toDateWithTime } from '@core/functions/global/date-format';
import { HistoryStyle } from '../styles';
import { CountDownTimer } from './CountDownTimer';
/** === TYPES === */
export interface HistoryStatusColor {
  white: string;
  yellow: string;
  green: string;
  red: string;
}
interface HistoryCardProps {
  id: string;
  createdAt: string;
  statusColor: keyof HistoryStatusColor;
  status: string;
  statusIconName?: string;
  expiredPaymentTime?: string;
  productImages: Array<string>;
  totalPrice: number;
  originalTotalPrice?: number;
  totalQty: number;
  originalTotalQty?: number;
  actionButtonType?: 'primary' | 'secondary';
  actionButtonTitle?: string;
  onActionButtonPress?: () => void;
  additionalInfo?: string;
  style?: StyleProp<ViewStyle>;
  onCardPress?: () => void;
}
/** === CONSTANTS === */
const historyStatusBgColor: HistoryStatusColor = {
  white: color.black5,
  yellow: color.yellow10,
  green: color.green10,
  red: color.red10,
};
const historyStatusTextColor: HistoryStatusColor = {
  white: color.black60,
  yellow: color.yellow50,
  green: color.green50,
  red: color.red50,
};
/** === COMPONENT === */
export const HistoryCard: FC<HistoryCardProps> = ({
  id,
  createdAt,
  statusColor,
  status,
  statusIconName,
  expiredPaymentTime,
  productImages,
  totalPrice,
  originalTotalPrice,
  totalQty,
  originalTotalQty,
  actionButtonType,
  actionButtonTitle,
  onActionButtonPress,
  additionalInfo,
  style,
  onCardPress,
}) => {
  const statusBgColor = historyStatusBgColor[statusColor];
  const statusTextColor = historyStatusTextColor[statusColor];
  const countDownInSeconds = Math.floor(
    (new Date(expiredPaymentTime!).getTime() - new Date().getTime()) / 1000,
  );

  const arrProductImages: Array<object> = [];
  productImages.map((item) => {
    arrProductImages.push({ imgUrl: item });
  });

  return (
    <Pressable
      onPress={onCardPress}
      style={[
        {
          ...HistoryStyle.cardContainer,
          paddingBottom: additionalInfo ? 0 : 16,
        },
        styles.shadowForBox10,
        style,
      ]}>
      <View style={HistoryStyle.cardHeader}>
        <View>
          <SnbText.C2 color={color.black100}>{id}</SnbText.C2>
          <View style={{ marginTop: 6 }}>
            <SnbText.C1 color={color.black60}>
              {toDateWithTime(createdAt)}
            </SnbText.C1>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View
            style={{
              ...HistoryStyle.cardStatus,
              backgroundColor: statusBgColor,
            }}>
            <SnbText.C2 color={statusTextColor}>{status}</SnbText.C2>
            {statusIconName && (
              <SnbIcon
                name={statusIconName}
                color={statusTextColor}
                size={16}
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
          {expiredPaymentTime && (
            <CountDownTimer
              type={'historyCard'}
              expiredTime={expiredPaymentTime}
            />
          )}
        </View>
      </View>
      <View style={HistoryStyle.cardBody}>
        <SnbSKUList
          data={arrProductImages}
          renderItem={({ item }: any) => {
            return (
              <Image
                source={{ uri: item.imgUrl }}
                style={{ height: 60, width: 60 }}
              />
            );
          }}
          expandable
        />
      </View>
      {originalTotalPrice && originalTotalQty ? (
        <View
          style={{
            ...HistoryStyle.cardFooterRow,
            marginBottom: 8,
          }}>
          {/* Should be styled with strikethrough */}
          <SnbText.C2 color={color.black40}>
            {toCurrency(originalTotalPrice)}
          </SnbText.C2>
          {/* Should be styled with strikethrough */}
          <SnbText.C2
            color={color.black40}>{`QTY: ${originalTotalQty}`}</SnbText.C2>
        </View>
      ) : (
        <View />
      )}
      <View style={HistoryStyle.cardFooterRow}>
        <SnbText.C2 color={color.black100}>{toCurrency(totalPrice)}</SnbText.C2>
        <SnbText.C2 color={color.black100}>{`QTY: ${totalQty}`}</SnbText.C2>
      </View>
      {actionButtonTitle && (
        <View style={HistoryStyle.cardActionContainer}>
          <SnbButton.Dynamic
            size="small"
            type={actionButtonType!}
            title={actionButtonTitle}
            onPress={onActionButtonPress!}
          />
        </View>
      )}
      {additionalInfo && (
        <View style={HistoryStyle.cardAdditionalInfo}>
          <SnbIcon
            name="error"
            color={color.yellow50}
            size={16}
            style={{ marginRight: 8 }}
          />
          <SnbText.C2 color={color.yellow50}>{additionalInfo}</SnbText.C2>
        </View>
      )}
    </Pressable>
  );
};
