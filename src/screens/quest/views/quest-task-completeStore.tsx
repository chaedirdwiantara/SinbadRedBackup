/** === IMPORT PACKAGE HERE === */
import React, { FC, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbText,
  SnbBottomSheet,
  color,
} from 'react-native-sinbad-ui';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import { TimePicker } from 'react-native-wheel-picker-android';
import ButtonClock from '../components/ButtonClock';
import ModalWarning from '../components/ModalWarning';
/** === IMPORT FUNCTIONS === */
import { goBack, useQuestTaskAction } from '../function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { contexts } from '@contexts';
import { NavigationAction } from '@navigation';
import { QuestTaskCompleteStoreStyles } from '../styles';

const { height } = Dimensions.get('window');

/** === COMPONENT === */
const QuestTaskCompleteStoreView: FC = ({ route }: any) => {
  /** === HOOK === */
  const { stateUser } = React.useContext(contexts.UserContext);
  const { storeAddress }: any = stateUser.detail.data?.storeData || {};
  let mapRef = React.useRef<MapView>(null);

  const [timeOpen, setTimeOpen] = useState('09:00');
  const [timeClosed, setTimeClosed] = useState('21:00');
  const [dateNow] = useState(moment().format('YYYY-MM-DD'));
  const [modalTimePicker, setModalTimePicker] = useState(false);
  const [typeTimePicker, setTypeTimePicker] = useState('');
  const [tempTimePicker, setTempTimePicker] = useState('');
  const [onChangeTimePicker, setOnChangeTimePicker] = useState<any>('');
  const [modalConfirm, setModalConfirm] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [modalWarning, setModalWarning] = useState(false);
  const [counter, setCounter] = useState(null);

  const { dispatchQuest } = useQuestContext();
  const { update, detailTask } = useQuestTaskAction();
  useFocusEffect(
    React.useCallback(() => {
      detailTask(dispatchQuest, {
        id: route.params.taskId,
      });
    }, []),
  );

  React.useEffect(() => {
    if (storeAddress?.longitude !== null && storeAddress?.latitude !== null) {
      mapRef.current?.animateToRegion({
        latitude: storeAddress?.latitude || 0,
        longitude: storeAddress?.longitude || 0,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      });
    }
  }, [storeAddress]);
  /** FUNCTION */
  const confirm = () => {
    const data = {
      questId: route.params.questId,
      taskId: route.params.taskId,
      status: 'done',
      progress: {
        timeOpen,
        timeClosed,
      },
    };
    update(dispatchQuest, { data });
    setTimeout(() => {
      goBack();
    }, 500);
  };

  const onPressClock = (typeTimePicker: string, time: string) => {
    setModalTimePicker(true);
    setTypeTimePicker(typeTimePicker);
    const tempTime = moment(`${dateNow} ${time}`).format('YYYY-MM-DD HH:mm');
    setTempTimePicker(tempTime);
  };

  const onPilihTime = (typeTimePicker: string, time: string) => {
    if (typeTimePicker === 'timeOpen') {
      setTimeOpen(moment(time).format('HH:mm'));
    } else {
      setTimeClosed(moment(time).format('HH:mm'));
    }
    setOnChangeTimePicker('');
    setTempTimePicker('');
    setModalTimePicker(false);
    setTypeTimePicker('');
  };

  const onSelanjutnya = () => {
    if (moment(timeClosed, 'HH:mm').isBefore(moment(timeOpen, 'HH:mm'))) {
      return showWarning('Jam tutup tidak boleh kurang dari jam buka');
    }
    if (timeOpen === timeClosed) {
      return showWarning('Jam tutup tidak boleh sama dengan jam buka');
    }
    setModalConfirm(true);
  };

  const showWarning = (warningMessage: string) => {
    setWarningMessage(warningMessage);
    setTimer(3);
    setModalWarning(true);
    const counterData = setInterval(() => {
      setTimer(timer - 1);
      if (timer === 0) {
        setModalWarning(false);
        clearInterval(counter);
      }
    }, 1000);
    setCounter(counterData);
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
      <View style={[QuestTaskCompleteStoreStyles.box, { marginTop: 0 }]}>
        <SnbText.C2>
          Bantu pelanggan menemukan toko anda, dengan konfirmasi lokasi toko
          secara akurat dan jam operasional
        </SnbText.C2>
      </View>
    );
  };
  /** => Render Address */
  const renderAddress = () => {
    return (
      <View style={QuestTaskCompleteStoreStyles.box}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <SnbText.H3>Alamat Toko:</SnbText.H3>
          <TouchableOpacity
            onPress={() =>
              NavigationAction.navigate('MerchantDetailAddressView', {
                source: 'Quest',
              })
            }>
            <SnbText.B4 color={color.red50}>Ubah</SnbText.B4>
          </TouchableOpacity>
        </View>
        <SnbText.H4>Koordinat Lokasi</SnbText.H4>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: storeAddress?.latitude || 0,
            longitude: storeAddress?.longitude || 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          zoomEnabled={false}
          pitchEnabled={false}
          scrollEnabled={false}
          style={{
            height: height * 0.36,
            marginVertical: 20,
          }}>
          <Marker
            image={require('../../../assets/icons/maps/store_pin.png')}
            coordinate={{
              latitude: storeAddress?.latitude || 0,
              longitude: storeAddress?.longitude || 0,
            }}
          />
        </MapView>
        <SnbText.H4>Detail Alamat:</SnbText.H4>
        <SnbText.B3>{storeAddress?.address || '-'}</SnbText.B3>
        <SnbText.H4>Catatan Alamat:</SnbText.H4>
        <SnbText.B3>{storeAddress?.noteAddress || '-'}</SnbText.B3>
      </View>
    );
  };
  /** => Render Working Hour */
  const renderWorkingHour = () => {
    return (
      <View
        style={[QuestTaskCompleteStoreStyles.box, { paddingHorizontal: 0 }]}>
        <View style={QuestTaskCompleteStoreStyles.boxPadding}>
          <SnbText.H4>Jam Operasional Toko:</SnbText.H4>
          <ButtonClock
            type="open"
            time={timeOpen}
            onPress={() => onPressClock('timeOpen', timeOpen)}
          />
          <ButtonClock
            type="closed"
            time={timeClosed}
            onPress={() => onPressClock('timeClosed', timeClosed)}
          />
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
          onPress={() => onSelanjutnya()}
        />
      </View>
    );
  };
  /** => Render Modal Time Picker */
  const renderModalTimePicker = () => {
    return (
      <SnbBottomSheet
        open={modalTimePicker}
        closeAction={() => setModalTimePicker(false)}
        content={
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            <SnbText.H4>Pilih Waktu</SnbText.H4>
            <TimePicker
              format24={true}
              initDate={tempTimePicker}
              onTimeSelected={(val) => setOnChangeTimePicker(val)}
              hideIndicator
              itemTextSize={18}
              minutes={['00', '15', '30', '45']}
              selectedItemTextSize={22}
              selectedItemTextFontFamily={''}
              itemTextFontFamily={''}
            />
            <View style={{ height: 75 }}>
              <SnbButton.Single
                type="primary"
                title="Pilih"
                onPress={() => onPilihTime(typeTimePicker, onChangeTimePicker)}
              />
            </View>
          </View>
        }
      />
    );
  };
  /** => Render Modal Confirm */
  const renderModalConfirm = () => {
    return (
      <SnbBottomSheet
        open={modalConfirm}
        closeAction={() => setModalConfirm(false)}
        content={
          <>
            <View style={QuestTaskCompleteStoreStyles.confirm}>
              <Image
                style={QuestTaskCompleteStoreStyles.imageConfirm}
                source={require('../../../assets/icons/quest/storeConfirm.png')}
              />
              <SnbText.H3>Cek Kembali Data Anda</SnbText.H3>
              <SnbText.B1 color={color.black80}>
                Apakah data alamat toko anda sudah benar?
              </SnbText.B1>
            </View>
            <View style={{ paddingBottom: 30 }}>
              <View style={{ height: 75 }}>
                <SnbButton.Single
                  type="primary"
                  title={'Ya, sudah benar'}
                  radius={5}
                  onPress={() => confirm()}
                />
              </View>
              <View style={{ height: 75 }}>
                <SnbButton.Single
                  type="secondary"
                  title={'Tidak, Saya ingin mengubah alamat'}
                  radius={5}
                  onPress={() => {
                    setModalConfirm(false);
                    NavigationAction.navigate('MerchantDetailAddressView', {
                      source: 'Quest',
                    });
                  }}
                />
              </View>
            </View>
          </>
        }
      />
    );
  };
  /** => Render Content */
  const renderContent = () => {
    return (
      <ScrollView>
        {renderInformation()}
        {renderAddress()}
        {renderWorkingHour()}
        {renderButton()}
      </ScrollView>
    );
  };

  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {renderContent()}
      {/* modal */}
      {renderModalTimePicker()}
      {renderModalConfirm()}
      <ModalWarning open={modalWarning} content={warningMessage} />
    </SnbContainer>
  );
};

export default QuestTaskCompleteStoreView;
