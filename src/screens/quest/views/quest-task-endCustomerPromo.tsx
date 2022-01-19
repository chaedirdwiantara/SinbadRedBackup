/** === IMPORT PACKAGE HERE === */
import React, { FC, useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbText,
  color,
  SnbImageCompressor,
  SnbTextField,
  SnbCheckbox,
} from 'react-native-sinbad-ui';
import { Svg, Polygon } from 'react-native-svg';
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT FUNCTIONS === */
import { Images } from 'src/assets';
import { toCurrency } from '@core/functions/global/currency-format';
import { goBack, useQuestTaskAction } from '../function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { QuestTaskEndCustomerPromoStyle } from '../styles';

/** === COMPONENT === */
const QuestTaskEndCustomerPromoView: FC = ({ route }: any) => {
  /** === HOOK === */
  const [viewType, setViewType] = useState('inputCodeView');
  const [inputCode, setInputCode] = useState('');
  const [inputCodeStatus, setInputCodeStatus] = useState('default');
  const [inputPhone, setInputPhone] = useState('');
  const [inputPhoneStatus, setInputPhoneStatus] = useState('default');
  const [phoneValMsgError, setPhoneValMsgError] = useState('');
  const [phoneValMsgSuccess, setPhoneValMsgSuccess] = useState('');
  const [checked, setChecked] = useState<'unselect' | 'selected'>('unselect');

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
  const onChangePhoneNo = (text: string) => {
    setInputPhoneStatus('default');
    text = text.replace(/[^0-9]/g, '');
    setInputPhone(text);
    const numberCountIsValid = /^[0-9]{10,14}$/.test(text);
    const numberFormatIsValid = /^08[0-9]$/.test(text) && text.length > 1;

    if (text === '') {
      setInputPhoneStatus('default');
    } else if (text && !numberFormatIsValid && text.slice(0, 2) !== '08') {
      setInputPhoneStatus('error');
      setPhoneValMsgError('No. HP harus diawali dengan 08');
    } else if (text && !numberCountIsValid) {
      setInputPhoneStatus('error');
      setPhoneValMsgError('No. HP harus 10-14 digit');
    } else {
      setInputPhoneStatus('success');
      setPhoneValMsgSuccess('Nomor Handphone Berhasil!');
    }
  };

  const handleDisabledButton = () => {
    let disabled = false;
    if (inputPhoneStatus !== 'success') {
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
  /** => Render Image */
  const renderImage = () => {
    return (
      <View style={QuestTaskEndCustomerPromoStyle.imageWrapper}>
        <Image
          style={QuestTaskEndCustomerPromoStyle.image}
          source={require('../../../assets/images/promo_cashier.png')}
        />
      </View>
    );
  };
  /** => Render Input Code View */
  const renderInputCodeView = () => {
    return (
      <>
        <View style={QuestTaskEndCustomerPromoStyle.titleWrapper}>
          <SnbText.H3 align={'center'}>
            Masukkan Kode Unik dari Pelanggan untuk mendapatkan Cashback!
          </SnbText.H3>
        </View>
        <View style={{ paddingTop: 30, paddingHorizontal: 16 }}>
          <SnbTextField.Text
            placeholder={'Masukkan Kode'}
            type={inputCodeStatus}
            value={inputCode}
            onChangeText={(text) => setInputCode(text)}
            clearText={() => setInputCode('')}
          />
        </View>
        {renderImage()}
      </>
    );
  };
  /** => Render Input Phone No */
  const renderInputPhoneNoView = () => {
    return (
      <>
        <View style={QuestTaskEndCustomerPromoStyle.titleWrapper}>
          <SnbText.H3 align={'center'}>
            Terakhir, Masukkan Nomor Handphone Pelanggan Anda!
          </SnbText.H3>
        </View>
        <View style={{ paddingTop: 30, paddingHorizontal: 16 }}>
          <SnbTextField.Text
            placeholder={'Masukkan Nomor Handphone'}
            type={inputPhoneStatus}
            value={inputPhone}
            keyboardType={'phone-pad'}
            onChangeText={(text) => onChangePhoneNo(text)}
            clearText={() => setInputPhone('')}
            valMsgError={phoneValMsgError}
            valMsgSuccess={phoneValMsgSuccess}
          />
        </View>
        {renderImage()}
      </>
    );
  };
  /** => Render Promo Tag */
  const PromoTag = () => (
    <View style={QuestTaskEndCustomerPromoStyle.promoTagContainer}>
      <View style={QuestTaskEndCustomerPromoStyle.promoTagContent}>
        <SnbText.C1 color={color.white}>Promo</SnbText.C1>
      </View>
      <View>
        <Svg height="26" width="26" style={{ marginLeft: -0.1 }}>
          <Polygon points="0,0 0,26 13,13" fill={color.green50} />
        </Svg>
      </View>
    </View>
  );
  /** => Render Select SKU */
  const renderSelectSkuView = () => {
    return (
      <>
        <View
          style={[
            QuestTaskEndCustomerPromoStyle.box,
            QuestTaskEndCustomerPromoStyle.shadowForBox5,
          ]}>
          <SnbText.B3>
            Masukkan pilihan SKU yang pelanggan Anda inginkan
          </SnbText.B3>
        </View>
        <View style={QuestTaskEndCustomerPromoStyle.boxContentList}>
          <View
            style={[
              QuestTaskEndCustomerPromoStyle.boxContentListItem,
              QuestTaskEndCustomerPromoStyle.shadowForBox5,
            ]}>
            <PromoTag />
            <View style={QuestTaskEndCustomerPromoStyle.boxContentImage}>
              <SnbImageCompressor
                uri={
                  'https://images.sinbad.co.id/prod/catalogue-images/17671/image_1591176704340.png'
                }
                style={
                  QuestTaskEndCustomerPromoStyle.fullWidthRatioContainRadius5Image
                }
                defaultSource={Images.opacityPlaceholder}
              />
            </View>
            <View style={QuestTaskEndCustomerPromoStyle.boxContentDesc}>
              <View style={QuestTaskEndCustomerPromoStyle.boxTitleAndSku}>
                <View style={QuestTaskEndCustomerPromoStyle.boxName}>
                  <SnbText.B4>SGM EKSPLOR 3+ MADU 600 GR GA (KP)</SnbText.B4>
                </View>
              </View>
              <View style={QuestTaskEndCustomerPromoStyle.boxOrderedAndButton}>
                <View style={QuestTaskEndCustomerPromoStyle.boxPrice}>
                  <SnbText.C1 color={color.black80}>
                    {toCurrency(13500, { withFraction: false })}
                  </SnbText.C1>
                  <View style={{ marginTop: 8 }}>
                    <SnbText.B4 color={color.red50}>
                      {toCurrency(10000, { withFraction: false })}
                    </SnbText.B4>
                  </View>
                </View>
              </View>
            </View>
            <View style={QuestTaskEndCustomerPromoStyle.checkboxContainer}>
              <SnbCheckbox
                status={checked}
                onPress={() =>
                  setChecked(checked === 'selected' ? 'unselect' : 'selected')
                }
              />
            </View>
          </View>
        </View>
        <View style={{ paddingBottom: 50 }} />
      </>
    );
  };
  /** => Render Button */
  const renderButton = () => {
    return (
      <View style={{ height: 75 }}>
        <SnbButton.Single
          type="primary"
          title={'OK'}
          disabled={handleDisabledButton()}
          onPress={() => setViewType('selectSkuView')}
        />
      </View>
    );
  };
  /** => Switch View */
  const switchView = () => {
    switch (viewType) {
      case 'inputCodeView':
        return renderInputCodeView();
      case 'inputPhoneNoView':
        return renderInputPhoneNoView();
      case 'selectSkuView':
        return renderSelectSkuView();
      default:
        break;
    }
  };
  /** => Render Content */
  const renderContent = () => {
    return <ScrollView>{switchView()}</ScrollView>;
  };

  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderContent()}
      {viewType === 'inputPhoneNoView' ? renderButton() : <View />}
    </SnbContainer>
  );
};

export default QuestTaskEndCustomerPromoView;
