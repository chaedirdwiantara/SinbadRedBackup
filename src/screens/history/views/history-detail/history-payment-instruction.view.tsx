import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, styles, color } from '@sinbad/react-native-sinbad-ui';
import { useHistoryContext } from 'src/data/contexts/history/useHistoryContext';
import CustomAccordion from '../../components/CustomAccordion';

/** === COMPONENT === */
const HistoryPaymentInstruction = () => {
  const { stateHistory } = useHistoryContext();
  const description =
    stateHistory.paymentDetail.data?.paymentChannel.description;
  /**RENDER PANDUAN PEMBAYARAN ACCORDION */
  const renderAccordion = () => {
    return <CustomAccordion data={description} />;
  };
  return (
    <>
      <View
        style={[
          styles.shadowForBox10,
          { paddingVertical: 16, paddingHorizontal: 8 },
        ]}>
        <View
          style={{
            borderBottomColor: color.black10,
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              marginLeft: 16,
              marginBottom: 8,
            }}>
            <SnbText.B2>Panduan Pembayaran</SnbText.B2>
          </View>
        </View>
        {renderAccordion()}
      </View>
      <View style={{ height: 10, backgroundColor: color.black5 }} />
    </>
  );
};

export default HistoryPaymentInstruction;
