import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { renderIF, useInput, useTextFieldSelect } from '@screen/auth/functions';
import React from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbButton,
  color,
  SnbTextField,
  SnbTextFieldSelect,
} from 'react-native-sinbad-ui';
import { ListOfSteps, ModalBack, ModalSelection, Stepper } from '../../shared';
import * as models from '@models';
import { useEasyRegistration } from '@screen/account/functions';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  REGION_OPTIONS,
} from '@screen/auth/functions/auth-utils.functions';
import { MAPS_VIEW_TYPE_2 } from '@screen/account/functions/screens_name';

interface Props {
  openModalBack: boolean;
  onCloseModalBack: (value: boolean) => void;
}

const Content: React.FC<Props> = (props) => {
  const { completeDataState } = useEasyRegistration();
  const { buyerData } = completeDataState.data || {};
  const { coordinate, formattedAddress, location, street }: any =
    useRoute().params || {};
  const address = useInput(buyerData?.address);
  const noteAddress = useInput(buyerData?.noteAddress);
  const { getSelection, resetGetSelection, resetSelectedItem, onSelectedItem } =
    useTextFieldSelect();
  const { navigate, goBack } = useNavigation();
  const [vehicleAccessibility, setVehicleAccessibility] = React.useState<any>(
    buyerData?.vehicleAccessibility || null,
  );
  const [vehicleAccessibilityAmount, setVehicleAccessibilityAmount] =
    React.useState<any>(
      buyerData.vehicleAccessibilityAmount
        ? {
            id: buyerData.vehicleAccessibilityAmount,
            value: buyerData.vehicleAccessibilityAmount,
          }
        : null,
    );
  let mapRef = React.useRef<MapView>(null);
  const [type, setType] = React.useState<models.ITypeList>('');
  const [openModalSelection, setOpenModalSelection] =
    React.useState<boolean>(false);
  const [latLng, setLatLng] = React.useState<LatLng | any>(null);
  const {
    latitude,
    longitude,
    address: existingAddress,
    noteAddress: existingNoteAddress,
    vehicleAccessibility: existingVehicleAccessibility,
    vehicleAccessibilityAmount: existingVehicleAccessibilityAmount,
  } = completeDataState.data?.buyerData || {};
  const isLatLngAvailable = latitude && longitude;
  const [streetName, setStreetName] = React.useState();
  const [staticAddress, setStaticAddress] = React.useState();
  const [locationId, setLocationId] = React.useState('');
  const {
    updateCompleteData,
    updateCompleteDataState,
    resetUpdateCompleteData,
    refetchCompleteData,
    backToDataCompleteness,
  } = useEasyRegistration();
  const [openModalBack, setOpenModalBack] = React.useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    resetUpdateCompleteData();
    if (formattedAddress) {
      address.setValue(formattedAddress);
      setStaticAddress(formattedAddress);
    }
    street && setStreetName(street);
    coordinate && setLatLng(coordinate);
    isLatLngAvailable && setLatLng({ longitude, latitude });
    location && setLocationId(location);
  }, []);

  React.useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        setOpenModalBack(true);
      } else {
        goBack();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return backHandler.remove;
  }, [isFocused]);

  React.useEffect(() => {
    setTimeout(() => {
      mapRef.current?.animateToRegion({ ...latLng, ...REGION_OPTIONS });
    }, 10);
  }, [latLng]);

  React.useEffect(() => {
    if (updateCompleteDataState.data) {
      refetchCompleteData();
      resetUpdateCompleteData();
      backToDataCompleteness();
    }
  }, [updateCompleteDataState]);

  function onMapsResult(data: any) {
    if (data.formattedAddress) {
      address.setValue(data.formattedAddress);
      setStaticAddress(data.formattedAddress);
    }
    data.street && setStreetName(data.street);
    data.coordinate && setLatLng(data.coordinate);
    data.location && setLocationId(data.location);
  }

  function handleDisableSaveButton() {
    const dataIsChanged =
      address.value !== existingAddress ||
      noteAddress.value !== existingNoteAddress ||
      vehicleAccessibility?.id !== existingVehicleAccessibility?.id ||
      vehicleAccessibilityAmount?.value !==
        existingVehicleAccessibilityAmount ||
      latLng.latitude !== latitude ||
      latLng.longitude !== longitude;

    if (
      dataIsChanged &&
      address.value !== '' &&
      noteAddress.value !== '' &&
      vehicleAccessibility !== null &&
      vehicleAccessibilityAmount !== null &&
      latLng !== null
    ) {
      return false;
    }
    return true;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SnbText.H4>Titik Lokasi</SnbText.H4>
              {renderIF(
                latLng !== null,
                <SnbButton.Dynamic
                  onPress={() =>
                    navigate(MAPS_VIEW_TYPE_2, {
                      onMapsResult,
                      action: 'edit',
                      existingLatLang: latLng,
                    })
                  }
                  title="Ubah Titik Lokasi"
                  disabled={false}
                  type="tertiary"
                  buttonColor={color.blue50}
                  size="small"
                />,
              )}
            </View>
            <View style={{ paddingVertical: 4 }} />
            {renderIF(
              latLng !== null,
              <MapView
                ref={mapRef}
                initialRegion={
                  latLng
                    ? {
                        ...latLng,
                        ...REGION_OPTIONS,
                      }
                    : {
                        latitude: DEFAULT_LATITUDE,
                        longitude: DEFAULT_LONGITUDE,
                        ...REGION_OPTIONS,
                      }
                }
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                style={styles.pinPoint}>
                <Marker
                  image={require('@image/pin_point.png')}
                  coordinate={
                    latLng || {
                      latitude: DEFAULT_LATITUDE,
                      longitude: DEFAULT_LONGITUDE,
                    }
                  }
                />
              </MapView>,
              <TouchableOpacity
                onPress={() => navigate('MapsView', { action: 'register' })}
                style={styles.pinPoint}>
                <SnbText.B4 color={color.black60}>Pin Lokasi Toko</SnbText.B4>
              </TouchableOpacity>,
            )}
          </View>
          <View style={{ padding: 16 }}>
            <SnbText.H4>{streetName}</SnbText.H4>
            <View style={{ marginVertical: 4 }} />
            <SnbText.B1 align="justify" color={color.black60}>
              {staticAddress}
            </SnbText.B1>
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Area
              {...address}
              mandatory
              maxLength={200}
              labelText="Detail Alamat"
              placeholder="Masukkan detail alamat"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              {...noteAddress}
              mandatory
              labelText="Catatan Alamat"
              placeholder="Masukkan catatan alamat"
              maxLength={200}
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextFieldSelect
              labelText="Akses Jalan"
              mandatory
              value={vehicleAccessibility?.name}
              placeholder="Pilih akses jalan"
              type="default"
              onPress={() => {
                setType('listVehicleAccess');
                getSelection({ type: 'listVehicleAccess' });
                if (vehicleAccessibility) {
                  onSelectedItem({
                    item: vehicleAccessibility,
                    type: 'listVehicleAccess',
                  });
                }
                setOpenModalSelection(true);
              }}
              rightType="icon"
              rightIcon="chevron_right"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextFieldSelect
              labelText="Jumlah Akses Jalan"
              mandatory
              value={
                vehicleAccessibilityAmount?.value
                  ? `${vehicleAccessibilityAmount?.value} Kendaraan`
                  : ''
              }
              placeholder="Pilih jumlah akses jalan"
              type="default"
              onPress={() => {
                setType('listVehicleAccessAmount');
                getSelection({ type: 'listVehicleAccessAmount' });
                if (vehicleAccessibilityAmount) {
                  onSelectedItem({
                    item: vehicleAccessibilityAmount,
                    type: 'listVehicleAccessAmount',
                  });
                }
                setOpenModalSelection(true);
              }}
              rightType="icon"
              rightIcon="chevron_right"
            />
          </View>
        </ScrollView>
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title="Simpan"
          onPress={() => {
            updateCompleteData({
              buyer: {
                address: address.value,
                noteAddress: noteAddress.value,
                vehicleAccessibilityAmount: vehicleAccessibilityAmount?.id,
                vehicleAccessibilityId: vehicleAccessibility?.id,
                locationId,
                ...latLng,
              },
            });
          }}
          type="primary"
          loading={updateCompleteDataState.loading}
          disabled={
            handleDisableSaveButton() || updateCompleteDataState.loading
          }
        />
      </View>
      <ModalSelection
        type={type}
        open={openModalSelection}
        onCloseModalSelection={(result: any) => {
          if (result) {
            switch (result.type as models.ITypeList) {
              case 'listVehicleAccess': {
                setVehicleAccessibility(result.item);
                break;
              }
              case 'listVehicleAccessAmount': {
                setVehicleAccessibilityAmount(result.item);
                break;
              }
              default:
                break;
            }
            onSelectedItem(result.item);
          }
          setOpenModalSelection(false);
          resetGetSelection();
          resetSelectedItem();
        }}
      />
      <ModalBack
        open={openModalBack || props.openModalBack}
        closeModal={() => {
          setOpenModalBack(false);
          props.onCloseModalBack(false);
        }}
        confirm={() => {
          if (!handleDisableSaveButton()) {
            updateCompleteData({
              buyer: {
                address: address.value,
                noteAddress: noteAddress.value,
                vehicleAccessibilityAmount: vehicleAccessibilityAmount?.id,
                vehicleAccessibilityId: vehicleAccessibility?.id,
                locationId,
                ...latLng,
              },
            });
          } else {
            backToDataCompleteness();
          }
        }}
      />
    </View>
  );
};

const DataTokoStep3View: React.FC = () => {
  const [openModalStep, setOpenModalStep] = React.useState(false);
  const [openModalBack, setOpenModalBack] = React.useState(false);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={() => setOpenModalBack(true)}
        type="white"
        title="Alamat Toko"
      />
      <Stepper complete={3} total={3} onPress={() => setOpenModalStep(true)} />
      <Content
        openModalBack={openModalBack}
        onCloseModalBack={setOpenModalBack}
      />
      <ListOfSteps
        open={openModalStep}
        type="buyer"
        closeModal={() => setOpenModalStep(false)}
      />
    </SnbContainer>
  );
};

const styles = StyleSheet.create({
  pinPoint: {
    height: 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: color.black5,
    borderColor: color.black40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default DataTokoStep3View;
