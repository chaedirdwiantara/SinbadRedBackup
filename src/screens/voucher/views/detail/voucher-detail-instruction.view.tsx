/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText2 } from 'react-native-sinbad-ui';
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
            <SnbText2.Paragraph.Default
              key={`${instruction}`}
              color={'#677a8e'}>
              {`\u2022 ${instruction}`}
            </SnbText2.Paragraph.Default>
          ))}
        </View>
      </VoucherDetailAccordion>
    </View>
  );
};
