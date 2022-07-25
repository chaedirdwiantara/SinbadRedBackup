import {
  colorV2,
  SnbIcon,
  SnbRadio,
  SnbText2,
} from '@sinbad/react-native-sinbad-ui';
import { RadioValue } from '@sinbad/react-native-sinbad-ui/lib/typescript/components/v2/Radio/RadioGroup';
import Svg from '@svg';
import React, { FC, memo } from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VoucherCardStyle } from '../styles';

interface VoucherCardPropsBase {
  name: string;
  title: string;
  subtitle: string;
  value: RadioValue;
  onPress: () => void;
}

interface VoucherCardDefault extends VoucherCardPropsBase {
  type: 'eligible';
}

interface VoucherCardWithHelper extends VoucherCardPropsBase {
  type: 'not-eligible';
  helperText: string;
}

type VoucherCardProps = VoucherCardDefault | VoucherCardWithHelper;

const VoucherCardMemo: FC<VoucherCardProps> = ({
  type = 'eligible',
  name,
  title,
  subtitle,
  value,
  onPress,
  ...props
}) => {
  const bgVoucher =
    type === 'eligible'
      ? require('../../src/assets/icons/voucher/voucher-red.png')
      : require('../../src/assets/icons/voucher/voucher-grey.png');

  return (
    <View>
      <View style={VoucherCardStyle.container}>
        <View style={VoucherCardStyle.leftContentContainer}>
          <Image source={bgVoucher} style={{ left: -5 }} />
          <View
            style={{
              ...VoucherCardStyle.icon,
              position: 'absolute',
              zIndex: 2,
            }}>
            <Svg
              name={
                type === 'eligible'
                  ? 'reward_voucher'
                  : 'reward_voucher_not_eligible'
              }
              size={30}
            />
            <SnbText2.Caption.Small
              color={
                type === 'eligible'
                  ? colorV2.textColor.defaultLight
                  : colorV2.textColor.secondary
              }>
              {name}
            </SnbText2.Caption.Small>
          </View>
        </View>
        <View style={VoucherCardStyle.rightContentContainer}>
          <View style={VoucherCardStyle.rightTopContent}>
            <View style={VoucherCardStyle.title}>
              <SnbText2.Body.Default>{title}</SnbText2.Body.Default>
              <SnbText2.Paragraph.Small>{subtitle}</SnbText2.Paragraph.Small>
            </View>
            <View style={VoucherCardStyle.radio}>
              <SnbRadio value={value} disabled={type === 'not-eligible'} />
            </View>
          </View>
          <View style={VoucherCardStyle.rightBottomContent}>
            <TouchableOpacity
              onPress={onPress}
              style={VoucherCardStyle.viewDetail}>
              <SnbText2.Body.Tiny align="right" color={colorV2.textColor.link}>
                Lihat Detail
              </SnbText2.Body.Tiny>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {type === 'not-eligible' && (
        <View style={VoucherCardStyle.helperContainer}>
          <SnbIcon name="info" size={24} />
          <View style={VoucherCardStyle.helperText}>
            <SnbText2.Paragraph.Tiny>
              {(props as VoucherCardWithHelper).helperText}
            </SnbText2.Paragraph.Tiny>
          </View>
        </View>
      )}
    </View>
  );
};

export const VoucherCard = memo(VoucherCardMemo);
