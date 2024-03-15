/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText2, colorV2, spacingV2 } from 'react-native-sinbad-ui';
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
  const [open, setOpen] = React.useState(true);
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
            <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
              Syarat dan Ketentuan dalam menggunakan voucher ini:
            </SnbText2.Paragraph.Default>
          </View>
          {termsAndCondition.map((tnc) => (
            <View key={`${tnc}`} style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ marginRight: spacingV2.spacing.sm }}>
                <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                  {'\u2022'}
                </SnbText2.Paragraph.Default>
              </View>
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                {`${tnc}`}
              </SnbText2.Paragraph.Default>
            </View>
          ))}
        </View>
      </VoucherDetailAccordion>
    </View>
  );
};
