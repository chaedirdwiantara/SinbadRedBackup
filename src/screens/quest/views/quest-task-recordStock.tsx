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
  SnbImageCompressor,
  SnbTextField,
} from 'react-native-sinbad-ui';
import { Svg, Polygon } from 'react-native-svg';
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT FUNCTIONS === */
import { Images } from 'src/assets';
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
  /** => Render Promo Tag */
  const PromoTag = () => (
    <View style={QuestTaskRecordStockStyles.promoTagContainer}>
      <View style={QuestTaskRecordStockStyles.promoTagContent}>
        <SnbText.C1 color={color.white}>Promo</SnbText.C1>
      </View>
      <View>
        <Svg height="26" width="26" style={{ marginLeft: -0.1 }}>
          <Polygon points="0,0 0,26 13,13" fill={color.green50} />
        </Svg>
      </View>
    </View>
  );
  /** => Render Calculation */
  const renderCalculation = () => {
    return (
      <View style={QuestTaskRecordStockStyles.boxCalculation}>
        <SnbText.H4>Perhitungan Untuk:</SnbText.H4>
        <View style={QuestTaskRecordStockStyles.separator} />
        <View style={{ paddingVertical: 8 }}>
          <SnbText.B4>Toko Anda</SnbText.B4>
        </View>
        <View style={QuestTaskRecordStockStyles.textCalculation}>
          <SnbText.B3 align={'left'}>Voucher per Pelanggan</SnbText.B3>
          <SnbText.B3 align={'right'} color={color.green50}>
            {toCurrency(20000, { withFraction: false })}
          </SnbText.B3>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <SnbText.B4>Pelanggan Anda</SnbText.B4>
        </View>
        <View style={QuestTaskRecordStockStyles.textCalculation}>
          <SnbText.B3 align={'left'}>Potongan Harga</SnbText.B3>
          <SnbText.B3 align={'right'} color={color.green50}>
            {toCurrency(5000, { withFraction: false })}
          </SnbText.B3>
        </View>
      </View>
    );
  };
  /** => Render Item */
  const renderItem = () => {
    return (
      <View style={QuestTaskRecordStockStyles.boxContentList}>
        <View
          style={[
            QuestTaskRecordStockStyles.boxContentListItem,
            QuestTaskRecordStockStyles.shadowForBox5,
          ]}>
          <View style={{ flexDirection: 'row' }}>
            <PromoTag />
            <View style={QuestTaskRecordStockStyles.boxContentImage}>
              <SnbImageCompressor
                uri={
                  'https://images.sinbad.co.id/prod/catalogue-images/17671/image_1591176704340.png'
                }
                style={
                  QuestTaskRecordStockStyles.fullWidthRatioContainRadius5Image
                }
                defaultSource={Images.opacityPlaceholder}
              />
            </View>
            <View style={QuestTaskRecordStockStyles.boxContentDesc}>
              <View style={QuestTaskRecordStockStyles.boxTitleAndSku}>
                <View style={QuestTaskRecordStockStyles.boxName}>
                  <SnbText.H4>SGM EKSPLOR 3+ MADU 600 GR GA (KP)</SnbText.H4>
                  <SnbText.B3>Harga Jual yang Disetujui:</SnbText.B3>
                  <SnbText.B4 color={color.red50}>
                    {toCurrency(20000, { withFraction: false })}
                  </SnbText.B4>
                </View>
              </View>
            </View>
          </View>
          <View style={QuestTaskRecordStockStyles.boxInput}>
            {/* <SnbText.H4>Jumlah Stok:</SnbText.H4> */}
            <SnbTextField.Text
              labelText={'Jumlah Stok:'}
              placeholder={'Qty.'}
              type={'default'}
              value={''}
              keyboardType={'number-pad'}
              onChangeText={(text) => console.log(text)}
              clearText={() => console.log('clear')}
            />
            <View style={{ paddingTop: 16 }}>
              <SnbText.H4>Harga Jual Reguler:</SnbText.H4>
              <SnbText.B3>
                Harga SKU reguler yang dijual dari toko ke pelanggan (diluar
                program/promo)
              </SnbText.B3>
              <View style={{ paddingTop: 8 }}>
                <SnbTextField.Text
                  // labelText={'Harga Jual Reguler:'}
                  placeholder={'Rp.'}
                  type={'default'}
                  value={''}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => console.log(text)}
                  clearText={() => console.log('clear')}
                  valMsgSuccess={'Berhasil!'}
                  valMsgError={
                    'Masukkan harga yang lebih tinggi dari harga jual yang disetujui'
                  }
                />
              </View>
            </View>
          </View>
          {renderCalculation()}
        </View>
      </View>
    );
  };
  /** => Render Button */
  const renderButton = () => {
    return (
      <View style={{ height: 75 }}>
        <SnbButton.Single
          type="primary"
          title={'Selanjutnya'}
          onPress={() => null}
        />
      </View>
    );
  };
  /** => Render Content */
  const renderContent = () => {
    return (
      <ScrollView>
        {renderInformation()}
        {renderDisclaimer()}
        {renderItem()}
        {renderButton()}
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
