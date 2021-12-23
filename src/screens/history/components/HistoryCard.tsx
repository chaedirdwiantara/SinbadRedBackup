/** === IMPORT PACKAGES === */
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
/** === IMPORT COMPONENT === */
import { CountDownTimer } from './CountDownTimer';
/** === IMPORT FUNCTIONS === */
import { toCurrency } from '@core/functions/global/currency-format';
import { toDateWithTime } from '@core/functions/global/date-format';
/** === IMPORT TYPES === */
import {
  historyStatusBgColor,
  historyStatusTextColor,
  paymentStatusColor,
  orderStatusColor,
  PaymentStatusSlug,
  OrderStatusSlug,
} from '../types';
/** === IMPORT STYLE === */
import { HistoryStyle } from '../styles';
/** === TYPE === */
interface HistoryCardProps {
  orderCode: string;
  createdAt: string;
  statusSlug: PaymentStatusSlug | OrderStatusSlug;
  statusTitle: string;
  type: 'payment' | 'order';
  expiredPaymentTime?: string | null;
  catalogueImages: Array<string>;
  price: number;
  finalPrice?: number;
  qty: number;
  finalQty?: number;
  onCardPress?: () => void;
  actionButtonType?: 'primary' | 'secondary';
  actionButtonTitle?: string;
  onActionButtonPress?: () => void;
  additionalInfo?: string; // For partial order or other notable informations
  style?: StyleProp<ViewStyle>;
}

interface HistoryCardImage {
  url: string;
}
/** === COMPONENT === */
export const HistoryCard: FC<HistoryCardProps> = ({
  orderCode,
  createdAt,
  statusSlug,
  statusTitle,
  type,
  expiredPaymentTime,
  catalogueImages,
  price,
  finalPrice,
  qty,
  finalQty,
  onCardPress,
  actionButtonType,
  actionButtonTitle,
  onActionButtonPress,
  additionalInfo,
  style,
}) => {
  const statusColor =
    type === 'payment'
      ? paymentStatusColor[statusSlug as PaymentStatusSlug]
      : orderStatusColor[statusSlug as OrderStatusSlug];
  const statusBgColor = historyStatusBgColor[statusColor];
  const statusTextColor = historyStatusTextColor[statusColor];
  const countDownInSeconds = Math.floor(
    (new Date(expiredPaymentTime!).getTime() - new Date().getTime()) / 1000,
  );
  const formattedImages: Array<HistoryCardImage> = catalogueImages.map(
    (image) => ({ url: image }),
  );

  return (
    <Pressable
      onPress={onCardPress}
      style={[
        HistoryStyle.cardContainer,
        { paddingBottom: additionalInfo ? 0 : 16 },
        styles.shadowForBox10,
        style,
      ]}>
      <View style={HistoryStyle.cardHeader}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <SnbText.C2 color={color.black100}>{orderCode ?? '-'}</SnbText.C2>
          <View style={{ marginTop: 6 }}>
            <SnbText.C1 color={color.black60}>
              {toDateWithTime(createdAt)}
            </SnbText.C1>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View
            style={[
              HistoryStyle.cardStatus,
              { backgroundColor: statusBgColor },
            ]}>
            <SnbText.C2 color={statusTextColor}>{statusTitle}</SnbText.C2>
            {statusSlug === 'overdue' && (
              <SnbIcon
                name="error"
                color={statusTextColor}
                size={16}
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
          {expiredPaymentTime && (
            <CountDownTimer type={'small'} expiredTime={expiredPaymentTime} />
          )}
        </View>
      </View>
      <View style={HistoryStyle.cardBody}>
        <SnbSKUList
          data={formattedImages}
          renderItem={({ item }: any) => (
            <Image
              source={{ uri: item.url }}
              style={{ height: 60, width: 60 }}
            />
          )}
          expandable={true}
        />
      </View>
      {finalPrice || finalQty ? (
        <View style={[HistoryStyle.cardFooterRow, { marginBottom: 8 }]}>
          {/* Should be styled with strikethrough */}
          {finalPrice && (
            <SnbText.C2 color={color.black40}>{toCurrency(price)}</SnbText.C2>
          )}
          {/* Should be styled with strikethrough */}
          {finalQty && (
            <SnbText.C2 align="right" color={color.black40}>
              {`QTY: ${qty}`}
            </SnbText.C2>
          )}
        </View>
      ) : (
        <View />
      )}
      <View style={HistoryStyle.cardFooterRow}>
        <SnbText.C2 color={color.black100}>
          {toCurrency(finalPrice ?? price)}
        </SnbText.C2>
        <SnbText.C2 color={color.black100}>
          {`QTY: ${finalQty ?? qty}`}
        </SnbText.C2>
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
