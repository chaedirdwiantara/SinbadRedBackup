/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { colorV2, SnbText2, spacingV2 } from 'react-native-sinbad-ui';
import { VoucherDetailStyles } from '../../styles';
import { VoucherDetailAccordion } from '@screen/voucher/components/VoucherDetailAccordion';
/** === INTERFACE === */
interface VoucherDetailInstructionProps {
  instructions: Array<string>;
}
/** === COMPONENT ===  */
export const VoucherDetailInstruction: FC<VoucherDetailInstructionProps> = ({
  instructions,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <View
      style={{
        ...VoucherDetailStyles.sectionContainer,
        ...{ paddingVertical: 0 },
      }}>
      <VoucherDetailAccordion
        label="Cara Pakai"
        open={open}
        onPress={() => setOpen((prev) => !prev)}>
        <View style={{ paddingBottom: 28 }}>
          {instructions.map((instruction) => (
            <View
              key={`${instruction}`}
              style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ marginRight: spacingV2.spacing.sm }}>
                <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                  {'\u2022'}
                </SnbText2.Paragraph.Default>
              </View>
              <SnbText2.Paragraph.Default
                key={`${instruction}`}
                color={colorV2.textColor.secondary}>
                {`${instruction}`}
              </SnbText2.Paragraph.Default>
            </View>
          ))}
        </View>
      </VoucherDetailAccordion>
    </View>
  );
};
