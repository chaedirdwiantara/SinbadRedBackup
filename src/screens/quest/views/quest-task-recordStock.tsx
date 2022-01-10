/** === IMPORT PACKAGE HERE === */
import React, { FC, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbHtml,
  SnbCheckbox,
  SnbText,
  color,
} from 'react-native-sinbad-ui';
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT FUNCTIONS === */
import { toCurrency } from '@core/functions/global/currency-format';
import { goBack, useQuestTaskAction } from '../function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { QuestTaskRecordStockStyles } from '../styles';

/** === COMPONENT === */
const QuestTaskRecordStockView: FC = ({ route }: any) => {
  /** === HOOK === */
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={route.params.title}
        backAction={goBack}
      />
    );
  };
  /** => Render Information */
  const renderInformation = () => {
    return (
      <View
        style={[
          QuestTaskRecordStockStyles.box,
          QuestTaskRecordStockStyles.shadowForBox5,
        ]}>
        <SnbText.C2>
          Masukkan jumlah stok & harga jual reguler terkini di Toko Anda
        </SnbText.C2>
      </View>
    );
  };
  /** => Render Disclaimer */
  const renderDisclaimer = () => {
    //TODO: update with task detail
    const maxRewardVoucherPerCustomer = 20000;

    const text1 = 'Perhitungan:';
    const text2 =
      ' [Harga Jual Reguler] dikurangi [Harga Jual yang Disetujui] sama dengan [Nilai Voucher per Pelanggan] yang dikumpulkan';
    const text3 = `*Nilai Maksimum Voucher per Pelanggan: ${toCurrency(
      maxRewardVoucherPerCustomer,
      { withFraction: false },
    )}`;

    return (
      <View style={QuestTaskRecordStockStyles.boxDisclaimer}>
        <View style={QuestTaskRecordStockStyles.boxContentDisclaimer}>
          <View style={QuestTaskRecordStockStyles.boxtextDisclaimer}>
            <SnbText.C1 align="center">
              <SnbText.C2>{text1}</SnbText.C2>
              {text2}
            </SnbText.C1>
            <SnbText.C2 align="center" color={color.red50}>
              {text3}
            </SnbText.C2>
          </View>
        </View>
      </View>
    );
  };
  /** => Render Content */
  const renderContent = () => {
    return (
      <ScrollView>
        {renderInformation()}
        {renderDisclaimer()}
      </ScrollView>
    );
  };
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderContent()}
    </SnbContainer>
  );
};

export default QuestTaskRecordStockView;
