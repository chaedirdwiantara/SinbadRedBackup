import { colorV2, SnbIcon, SnbText2 } from '@sinbad/react-native-sinbad-ui';
import React, { FC, ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { VoucherAccordionStyles } from '../styles/voucher-accordion.style';

interface VoucherDetailAccordionProps {
  open: boolean;
  onPress: () => void;
  label: string;
  children: ReactNode;
}

export const VoucherDetailAccordion: FC<VoucherDetailAccordionProps> = ({
  open,
  onPress,
  label,
  children,
}) => {
  return (
    <View style={VoucherAccordionStyles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={VoucherAccordionStyles.panel}>
          <SnbText2.Body.Default>{label}</SnbText2.Body.Default>
          <SnbIcon
            color={colorV2.iconColor.dark}
            name={open ? 'expand_less' : 'expand_more'}
            size={30}
          />
        </View>
      </TouchableWithoutFeedback>
      {open && <>{children}</>}
    </View>
  );
};
