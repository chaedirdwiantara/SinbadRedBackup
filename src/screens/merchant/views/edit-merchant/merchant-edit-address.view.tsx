import { useNavigation, useRoute } from '@react-navigation/native';
import { renderIF, useInput, useTextFieldSelect } from '@screen/auth/functions';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
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
import * as models from '@models';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  REGION_OPTIONS,
} from '@screen/auth/functions/auth-utils.functions';
import { MAPS_VIEW_TYPE_2 } from '@screen/account/functions/screens_name';
import { ModalSelection } from '@screen/account/views/shared';
import { contexts } from '@contexts';

const Content: React.FC = () => {
  const { coordinate, formattedAddress, location, street }: any =
    useRoute().params || {};
  const { stateUser } = React.useContext(contexts.UserContext);
  const {
    storeAddress,
    storeInformation: { storeDetailCompleteness },
  }: any = stateUser.detail.data?.storeData || {};
  const {
    vehicleAccessibility: currentVehicleAccessibility,
    vehicleAccessibilityAmount: currentVehicleAccessibilityAmount,
  } = storeDetailCompleteness;
  const {
    latitude,
    longitude,
    address: currentAddress,
    noteAddress: currentNoteAddress,
  } = storeAddress;
  const address = useInput(currentAddress);
  const noteAddress = useInput(currentNoteAddress);
  const { getSelection, resetGetSelection, resetSelectedItem, onSelectedItem } =
    useTextFieldSelect();
  const { navigate } = useNavigation();
  const [vehicleAccessibility, setVehicleAccessibility] = React.useState<any>(
    currentVehicleAccessibility || null,
  );
  const [vehicleAccessibilityAmount, setVehicleAccessibilityAmount] =
    React.useState<any>(
      currentVehicleAccessibilityAmount
        ? {
            id: currentVehicleAccessibilityAmount,
            value: currentVehicleAccessibilityAmount,
          }
        : null,
    );
  let mapRef = React.useRef<MapView>(null);
  const [type, setType] = React.useState<models.ITypeList>('');
  const [openModalSelection, setOpenModalSelection] =
    React.useState<boolean>(false);
  const [latLng, setLatLng] = React.useState<LatLng | any>(null);
  const isLatLngAvailable = latitude && longitude;
  const [streetName, setStreetName] = React.useState();
  const [staticAddress, setStaticAddress] = React.useState(
    storeAddress?.address,
  );
  const [locationId, setLocationId] = React.useState(storeAddress?.locationId);

  React.useEffect(() => {
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
    setTimeout(() => {
      mapRef.current?.animateToRegion({ ...latLng, ...REGION_OPTIONS });
    }, 10);
  }, [latLng]);

  function onMapsResult(data: any) {
    address.setValue(data.formattedAddress);
    setStaticAddress(data.formattedAddress);
    setStreetName(data.street);
    setLatLng(data.coordinate);
    setLocationId(data.location);
  }

  function handleDisableSaveButton() {
    const dataIsChanged =
      address.value !== currentAddress ||
      noteAddress.value !== currentNoteAddress ||
      vehicleAccessibility?.id !== currentVehicleAccessibility?.id ||
      vehicleAccessibilityAmount?.value !== currentVehicleAccessibilityAmount ||
      latLng?.latitude !== latitude ||
      latLng?.longitude !== longitude;

    if (
      dataIsChanged &&
      address.value &&
      noteAddress.value &&
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
          <View style={{ padding: 16 }}>
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
                      action: 'update',
                      currentLatLng: latLng,
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
                  coordinate={
                    latLng || {
                      latitude: DEFAULT_LATITUDE,
                      longitude: DEFAULT_LONGITUDE,
                    }
                  }>
                  <Image
                    source={require('@image/pin_point.png')}
                    style={{ height: 44, width: 44, resizeMode: 'contain' }}
                  />
                </Marker>
              </MapView>,
              <TouchableOpacity
                onPress={() =>
                  navigate(MAPS_VIEW_TYPE_2, {
                    onMapsResult,
                    action: 'update',
                    currentLatLng: latLng,
                  })
                }
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
          onPress={() => {}}
          type="primary"
          loading={false}
          disabled={handleDisableSaveButton()}
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
    </View>
  );
};

const MerchantEditAddressView: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="red" title="Alamat Toko" />
      <Content />
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

export default MerchantEditAddressView;
