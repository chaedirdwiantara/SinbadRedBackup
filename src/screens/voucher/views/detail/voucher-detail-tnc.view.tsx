/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText2 } from 'react-native-sinbad-ui';
import { VoucherDetailStyles } from '../../styles';
import { VoucherDetailAccordion } from '@screen/voucher/components/VoucherDetailAccordion';
/** === INTERFACE === */
interface VoucherDetailTnCProps {
  termsAndCondition: Array<string>;
}
/** === COMPONENT ===  */
export const VoucherDetailTnC: FC<VoucherDetailTnCProps> = ({
  termsAndCondition,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <View
      style={{
        ...VoucherDetailStyles.sectionContainer,
        ...{ marginTop: 18, paddingVertical: 0 },
      }}>
      <VoucherDetailAccordion
        label="Syarat Dan Ketentuan"
        open={open}
        onPress={() => setOpen((prev) => !prev)}>
        <View style={{ paddingBottom: 28 }}>
          <View style={{ marginBottom: 14 }}>
            <SnbText2.Paragraph.Default color={'#677a8e'}>
              Syarat dan Ketentuan dalam menggunakan voucher ini:
            </SnbText2.Paragraph.Default>
          </View>
          {termsAndCondition.map((tnc) => (
            <SnbText2.Paragraph.Default key={`${tnc}`} color={'#677a8e'}>
              {`\u2022 ${tnc}`}
            </SnbText2.Paragraph.Default>
          ))}
        </View>
      </VoucherDetailAccordion>
    </View>
  );
};
