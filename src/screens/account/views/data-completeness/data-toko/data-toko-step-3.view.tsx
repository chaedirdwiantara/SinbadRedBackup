import { useNavigation } from '@react-navigation/native';
import { renderIF, useInput, useTextFieldSelect } from '@screen/auth/functions';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbButton,
  color,
  SnbTextField,
  SnbTextFieldSelect,
} from 'react-native-sinbad-ui';
import { ListOfSteps, ModalSelection, Stepper } from '../../shared';
import * as models from '@models';
import { useEasyRegistration } from '@screen/account/functions';

const Content: React.FC = () => {
  const address = useInput();
  const noteAddress = useInput();
  const { getSelection, resetGetSelection, resetSelectedItem, onSelectedItem } =
    useTextFieldSelect();
  const { navigate } = useNavigation();
  const [vehicleAccessibility, setVehicleAccessibility] =
    React.useState<any>(null);
  const [vehicleAccessibilityAmount, setVehicleAccessibilityAmount] =
    React.useState<any>(null);
  let mapRef = React.useRef<MapView>(null);
  const [type, setType] = React.useState<models.ITypeList>('');
  const [openModalSelection, setOpenModalSelection] =
    React.useState<boolean>(false);
  const { completeDataState } = useEasyRegistration();
  const { latitude, longitude } = completeDataState.data?.buyerData || {};

  const isLatLngAvailable = latitude && longitude;

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
                isLatLngAvailable,
                <SnbButton.Dynamic
                  onPress={() => navigate('MapsView', { action: 'register' })}
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
              isLatLngAvailable,
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                style={styles.pinPoint}>
                <Marker coordinate={{ latitude, longitude }} />
              </MapView>,
              <TouchableOpacity
                onPress={() => navigate('MapsView', { action: 'register' })}
                style={styles.pinPoint}>
                <SnbText.B4 color={color.black60}>Pin Lokasi Toko</SnbText.B4>
              </TouchableOpacity>,
            )}
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
              value={vehicleAccessibilityAmount?.name}
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
          disabled={false}
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
          }
          setOpenModalSelection(false);
          resetGetSelection();
          resetSelectedItem();
        }}
      />
    </View>
  );
};

const DataTokoStep3View: React.FC = () => {
  const [openModalStep, setOpenModalStep] = React.useState(false);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => {}} type="white" title="Alamat Toko" />
      <Stepper complete={3} total={3} onPress={() => setOpenModalStep(true)} />
      <Content />
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
