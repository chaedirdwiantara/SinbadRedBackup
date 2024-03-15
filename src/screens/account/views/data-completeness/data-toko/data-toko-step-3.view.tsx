import {
  useFocusEffect,
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
  Image,
} from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import {
  SnbContainer,
  SnbTopNav2,
  SnbButton2,
  SnbTextField2,
  SnbText2,
  colorV2,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
  FooterButton,
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
import TextFieldSelect from '../../textfield-select-2.component';

function removeEmptyValue(data: any) {
  if (!data) {
    return { buyer: {} };
  }

  let buyer = data?.buyer;
  if (buyer) {
    for (const key in buyer) {
      if (buyer[key] === null || typeof buyer[key] === 'undefined') {
        delete buyer[key];
      }
    }
  }
  return { buyer };
}

interface Props {
  ref: any
}

const Content: React.FC<Props> = React.forwardRef((_, ref) => {
  const { completeDataState } = useEasyRegistration();
  const { buyerData } = completeDataState.data || {};
  const { coordinate, formattedAddress, location, street }: any =
    useRoute().params || {};
  const address = useInput(buyerData?.address);
  const noteAddress = useInput(buyerData?.noteAddress);
  const { getSelection, resetGetSelection, resetSelectedItem, onSelectedItem } =
    useTextFieldSelect();
  const { navigate } = useNavigation();
  const [vehicleAccessibility, setVehicleAccessibility] = React.useState<any>(
    buyerData?.vehicleAccessibility || null,
  );
  const [vehicleAccessibilityAmount, setVehicleAccessibilityAmount] =
    React.useState<any>(
      buyerData?.vehicleAccessibilityAmount
        ? {
          id: buyerData.vehicleAccessibilityAmount,
          value: buyerData.vehicleAccessibilityAmount,
        }
        : null,
    );
  let mapRef = React.useRef<MapView>(null);
  const [type, setType] = React.useState<models.ITypeList>('');
  const refModalSelection = React.useRef<SnbBottomSheet2Ref>()
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
  const [staticAddress, setStaticAddress] = React.useState(buyerData?.address);
  const [locationId, setLocationId] = React.useState(buyerData?.locationId);
  const {
    updateCompleteData,
    updateCompleteDataState,
    resetUpdateCompleteData,
    refetchCompleteData,
    backToDataCompleteness,
  } = useEasyRegistration();
  const [modalSelectionTestId, setModalSelectionTestId] = React.useState('')

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
    address.setValue(data.formattedAddress);
    setStaticAddress(data.formattedAddress);
    setStreetName(data.street);
    setLatLng(data.coordinate);
    setLocationId(data.location);
  }

  function handleDisableSaveButton() {
    const dataIsChanged =
      address.value !== existingAddress ||
      noteAddress.value !== existingNoteAddress ||
      vehicleAccessibility?.id !== existingVehicleAccessibility?.id ||
      vehicleAccessibilityAmount?.value !==
      existingVehicleAccessibilityAmount ||
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
          <View style={{ paddingHorizontal: layout.spacing.lg }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SnbText2.Body.Small>Titik Lokasi</SnbText2.Body.Small>
              {renderIF(
                latLng !== null,
                <SnbButton2.Link
                  onPress={() =>
                    navigate(MAPS_VIEW_TYPE_2, {
                      onMapsResult,
                      action: 'update',
                      currentLatLng: latLng,
                      testID: '13.1',
                    })
                  }
                  title="Ubah Titik Lokasi"
                  disabled={false}
                  size="tiny"
                  testID={'13.1'}
                />,
              )}
            </View>
            <View style={{ paddingVertical: layout.spacing.xxsm }} />
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
                  }
                  testID={'13.2'}>
                  <Image
                    source={require('@image/pin_point.png')}
                    style={{ height: 56, width: 56, resizeMode: 'contain' }}
                  />
                </Marker>
              </MapView>,
              <TouchableOpacity
                onPress={() =>
                  navigate(MAPS_VIEW_TYPE_2, {
                    onMapsResult,
                    action: 'update',
                    currentLatLng: latLng,
                    testID: '13.1',
                  })
                }
                style={styles.pinPoint}>
                <SnbText2.Body.Default color={colorV2.textColor.disable}>
                  Pin Lokasi Toko
                </SnbText2.Body.Default>
              </TouchableOpacity>,
            )}
          </View>
          <View style={{ padding: layout.spacing.lg }}>
            <SnbText2.Body.Small>{streetName}</SnbText2.Body.Small>
            <View style={{ marginVertical: layout.spacing.xxsm }} />
            <SnbText2.Paragraph.Small align="justify" >
              {staticAddress}
            </SnbText2.Paragraph.Small>
          </View>
          <View style={{ padding: layout.spacing.lg }}>
            <SnbTextField2.Area
              {...address}
              mandatory
              maxLength={200}
              labelText="Detail Alamat"
              placeholder="Masukkan detail alamat"
            />
          </View>
          <View style={{ padding: layout.spacing.lg }}>
            <SnbTextField2.Text
              {...noteAddress}
              mandatory
              labelText="Catatan Alamat"
              placeholder="Masukkan catatan alamat"
              maxLength={200}
              testID={'13.2'}
            />
          </View>
          <View style={{ padding: layout.spacing.lg }}>
            <TextFieldSelect
              labelText="Akses Jalan"
              mandatory
              value={vehicleAccessibility?.name}
              placeholder="Pilih akses jalan"
              type="default"
              onPress={() => {
                setType('listVehicleAccess');
                getSelection({ type: 'listVehicleAccess' });
                setModalSelectionTestId('13.3.1')
                if (vehicleAccessibility) {
                  onSelectedItem({
                    item: vehicleAccessibility,
                    type: 'listVehicleAccess',
                  });
                }
                refModalSelection.current?.open()
              }}
              rightType="icon"
              rightIcon="chevron_right"
              testID={'13.2'}
            />
          </View>
          <View style={{ padding: layout.spacing.lg }}>
            <TextFieldSelect
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
                setModalSelectionTestId('13.3.2')
                if (vehicleAccessibilityAmount) {
                  onSelectedItem({
                    item: vehicleAccessibilityAmount,
                    type: 'listVehicleAccessAmount',
                  });
                }
                refModalSelection.current?.open()
              }}
              rightType="icon"
              rightIcon="chevron_right"
              testID={'13.2'}
            />
          </View>
        </ScrollView>
      </View>
      <FooterButton.Single
        title="Simpan"
        buttonPress={() => {
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
        loadingButton={updateCompleteDataState.loading}
        disabled={
          handleDisableSaveButton() || updateCompleteDataState.loading
        }
        testID={'13.2'}
      />
      <ModalSelection
        testID={modalSelectionTestId}
        type={type}
        ref={refModalSelection}
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
          refModalSelection.current?.close()
          resetGetSelection();
          resetSelectedItem();
        }}
      />
      <ModalBack
        ref={ref}
        confirm={() => {
          if (
            address.value !== existingAddress ||
            noteAddress.value !== existingNoteAddress ||
            vehicleAccessibility?.id !== existingVehicleAccessibility?.id ||
            typeof vehicleAccessibilityAmount?.id !== 'undefined' &&
            (vehicleAccessibilityAmount?.id !==
              existingVehicleAccessibilityAmount) ||
            latLng.latitude !== latitude ||
            latLng.longitude !== longitude
          ) {
            updateCompleteData(
              removeEmptyValue({
                buyer: {
                  address: address.value,
                  noteAddress: noteAddress.value,
                  vehicleAccessibilityAmount: vehicleAccessibilityAmount?.id,
                  vehicleAccessibilityId: vehicleAccessibility?.id,
                  locationId,
                  latitude: latLng?.latitude || 0,
                  longitude: latLng?.longitude || 0,
                },
              }),
            );
          } else {
            backToDataCompleteness();
          }
        }}
      />
    </View>
  );
});

const DataTokoStep3View: React.FC = () => {
  const refModalListOfStep = React.useRef<SnbBottomSheet2Ref>()
  const refModalBack = React.useRef<SnbBottomSheet2Ref>()
  const { completeDataState } = useEasyRegistration();

  const handleBackButton = React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        refModalBack.current?.open()
        return true;
      },
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={() => refModalBack.current?.open()}
        color="white"
        title="Alamat Toko"
        testID={'13'}
      />
      <Stepper
        complete={completeDataState?.data?.buyerProgress?.completed}
        total={completeDataState?.data?.buyerProgress?.total}
        onPress={() => refModalListOfStep.current?.open()}
        testID={'13'}
      />
      <Content ref={refModalBack} />
      <ListOfSteps
        ref={refModalListOfStep}
        type="buyer"
        testID={'13.4'}
      />
    </SnbContainer>
  );
};

const styles = StyleSheet.create({
  pinPoint: {
    height: 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: layout.spacing.lg,
    backgroundColor: colorV2.bgColor.neutral,
    borderColor: colorV2.strokeColor.default,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default DataTokoStep3View;
