/** === IMPORT PACKAGE HERE === */
import React, { FC, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
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
  const [stockQty, setStockQty] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [typeStatus, setTypeStatus] = useState('default');
  const [discountPrice, setDiscountPrice] = useState(0);
  const [voucherPrice, setVoucherPrice] = useState(0);

  const { stateQuest, dispatchQuest } = useQuestContext();
  const questTaskDetailState = stateQuest.questTask.detail;
  const { update, detailTask } = useQuestTaskAction();
  useFocusEffect(
    React.useCallback(() => {
      detailTask(dispatchQuest, {
        id: route.params.taskId,
      });
    }, []),
  );

  /** FUNCTION */
  const confirm = () => {
    const data = {
      questId: route.params.questId,
      taskId: route.params.taskId,
      status: 'done',
      progress: {
        totalStock: parseFloat(stockQty),
        regularSellingPrice: parseFloat(regularPrice),
      },
    };
    update(dispatchQuest, { data });
    setTimeout(() => {
      goBack();
    }, 500);
  };

  const checkValidationPrice = (price: any) => {
    const { suggestedSellingPrice, maxRewardVoucherPerCustomer } =
      questTaskDetailState.data?.products;

    setRegularPrice(price);
    if (price === suggestedSellingPrice || price < suggestedSellingPrice) {
      setTypeStatus('error');
    } else {
      setTypeStatus('success');
      let maxDiscountPrice = price - suggestedSellingPrice;
      const maxVoucherPrice =
        maxDiscountPrice < maxRewardVoucherPerCustomer
          ? maxDiscountPrice
          : maxRewardVoucherPerCustomer;
      setVoucherPrice(maxVoucherPrice);
      setDiscountPrice(maxDiscountPrice);
    }
  };

  const handleClearPriceInput = () => {
    setRegularPrice('');
    setTypeStatus('default');
  };

  const handleDisabledButton = () => {
    let disabled = false;
    if (stockQty === '' || stockQty === '0') {
      disabled = true;
    } else if (regularPrice === '' || regularPrice === '0') {
      disabled = true;
    } else if (typeStatus === 'error') {
      disabled = true;
    }
    return disabled;
  };
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
    const { maxRewardVoucherPerCustomer } = questTaskDetailState.data?.products;

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
            {toCurrency(voucherPrice, { withFraction: false })}
          </SnbText.B3>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <SnbText.B4>Pelanggan Anda</SnbText.B4>
        </View>
        <View style={QuestTaskRecordStockStyles.textCalculation}>
          <SnbText.B3 align={'left'}>Potongan Harga</SnbText.B3>
          <SnbText.B3 align={'right'} color={color.green50}>
            {toCurrency(discountPrice, { withFraction: false })}
          </SnbText.B3>
        </View>
      </View>
    );
  };
  /** => Render Item */
  const renderItem = () => {
    const { suggestedSellingPrice, catalogueImages } =
      questTaskDetailState.data?.products;
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
                uri={catalogueImages}
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
                    {toCurrency(suggestedSellingPrice, { withFraction: false })}
                  </SnbText.B4>
                </View>
              </View>
            </View>
          </View>
          <View style={QuestTaskRecordStockStyles.boxInput}>
            <SnbTextField.Text
              labelText={'Jumlah Stok:'}
              placeholder={'Qty.'}
              type={'default'}
              value={stockQty}
              keyboardType={'number-pad'}
              onChangeText={(text) => setStockQty(text)}
              clearText={() => setStockQty('')}
            />
            <View style={{ paddingVertical: 16 }}>
              <SnbText.H4>Harga Jual Reguler:</SnbText.H4>
              <SnbText.B3>
                Harga SKU reguler yang dijual dari toko ke pelanggan (diluar
                program/promo)
              </SnbText.B3>
              <View style={{ paddingTop: 8 }}>
                <SnbTextField.Text
                  placeholder={'Rp.'}
                  type={typeStatus}
                  value={regularPrice}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => checkValidationPrice(text)}
                  clearText={() => handleClearPriceInput()}
                  valMsgSuccess={'Berhasil!'}
                  valMsgError={
                    'Masukkan harga yang lebih tinggi dari harga jual yang disetujui'
                  }
                />
              </View>
            </View>
          </View>
          {typeStatus === 'success' ? renderCalculation() : <View />}
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
          disabled={handleDisabledButton()}
          onPress={() => confirm()}
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
      </ScrollView>
    );
  };
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {!questTaskDetailState.loading && questTaskDetailState.data !== null ? (
        renderContent()
      ) : (
        <LoadingPage />
      )}
      {renderButton()}
    </SnbContainer>
  );
};

export default QuestTaskRecordStockView;
