import React from 'react';
import {
  color,
  SnbBottomSheet,
  SnbButton,
  SnbContainer,
  SnbSkeletonAnimator,
  SnbText,
} from '@sinbad/react-native-sinbad-ui';
import MapView, { LatLng, Marker } from 'react-native-maps';
import {
  Image,
  LogBox,
  PermissionsAndroid,
  StyleSheet,
  View,
} from 'react-native';
import {
  DATA_TOKO_STEP_3_VIEW,
  INPUT_MANUAL_LOCATION_MODAL_VIEW,
} from '../functions/screens_name';
import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { extractAddress, renderIF } from '@screen/auth/functions';
import apiMaps from '@core/services/apiMaps';
import { useLocations } from '@screen/auth/functions/global-hooks.functions';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  getStreetName,
  REGION_OPTIONS,
} from '@screen/auth/functions/auth-utils.functions';

const MapsViewType2: React.FC = () => {
  const [latLng, setLatLng] = React.useState<LatLng>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });
  const refMaps = React.useRef<MapView>(null);
  const { navigate, goBack, dispatch } = useNavigation();
  const [showModalAreaNotFound, setShowModalAreaNotFound] =
    React.useState(false);
  const [addressResult, setAddressResult] = React.useState<any[]>([]);
  const [isMounted, setIsMounted] = React.useState(true);
  const { getLocation, locations, resetLocation } = useLocations();
  const [loadingGetAddress, setLoadingGetAddress] = React.useState(false);
  const { params } = useRoute();
  const { onMapsResult, action, existingLatLang }: any = params || {};

  React.useEffect(() => {
    if (existingLatLang) {
      setLatLng(existingLatLang);
    } else {
      getLocationPermissions();
    }
    return () => {
      setIsMounted(false);
      resetLocation();
    };
  }, []);

  React.useEffect(() => {
    if (
      latLng.latitude !== DEFAULT_LATITUDE &&
      latLng.longitude !== DEFAULT_LONGITUDE
    ) {
      setTimeout(() => {
        refMaps.current?.animateToRegion({
          ...latLng,
          ...REGION_OPTIONS,
        });
      }, 10);
      getAddress(latLng);
    }
  }, [latLng]);

  React.useEffect(() => {
    if (locations.data) {
      const formattedAddress =
        addressResult.length > 0 ? addressResult[0].formatted_address : '';
      const street =
        addressResult.length > 0
          ? getStreetName(addressResult[0].address_components)
          : '';
      const mapResult = {
        coordinate: latLng,
        formattedAddress,
        location: locations.data.id,
        street,
      };
      if (action === 'edit') {
        onMapsResult(mapResult);
        goBack();
      } else {
        setTimeout(() => {
          dispatch(StackActions.replace(DATA_TOKO_STEP_3_VIEW, mapResult));
        }, 0);
      }
    }

    if (locations.error) {
      setShowModalAreaNotFound(true);
    }
  }, [locations]);

  async function getAddress(coords?: LatLng) {
    setLoadingGetAddress(true);
    try {
      const { results } = await apiMaps(
        `&latlng=${coords?.latitude},${coords?.longitude}`,
        'GET',
      );
      if (isMounted) {
        setLoadingGetAddress(false);
        setAddressResult(results);
      }
    } catch (error) {}
  }

  async function getUserLocation() {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLatLng({ latitude, longitude });
      },
      (error: any) => {
        if (error?.code === 3) {
          getUserLocation();
        } else {
          setShowModalAreaNotFound(true);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  async function getLocationPermissions() {
    try {
      const checkLocationPermissionResult = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!checkLocationPermissionResult) {
        const requestLocationPermissionResult =
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
        if (requestLocationPermissionResult === 'granted') {
          getUserLocation();
        } else {
          setShowModalAreaNotFound(true);
        }
      } else {
        getUserLocation();
      }
    } catch (error) {}
  }

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <SnbContainer color="white">
      <View style={{ flex: 0.7 }}>
        <MapView
          initialRegion={{
            ...latLng,
            latitudeDelta: 16,
            longitudeDelta: 16,
          }}
          showsMyLocationButton={false}
          ref={refMaps}
          style={{ flex: 1 }}>
          {renderIF(
            latLng.latitude !== DEFAULT_LATITUDE &&
              latLng.longitude !== DEFAULT_LONGITUDE,
            <Marker
              coordinate={latLng}
              draggable
              onDragEnd={({ nativeEvent: { coordinate } }: any) => {
                setLatLng(coordinate);
                refMaps.current?.animateToRegion({
                  ...coordinate,
                  ...REGION_OPTIONS,
                });
              }}>
              <Image
                source={require('@image/pin_point.png')}
                style={{ height: 44, width: 44, resizeMode: 'contain' }}
              />
            </Marker>,
          )}
        </MapView>
        <View style={{ ...styles.floatingButton }}>
          <SnbButton.Floating
            type="primary"
            contentColor={color.black80}
            iconName="arrow_back"
            buttonColor={color.white}
            onPress={goBack}
            disabled={false}
          />
        </View>
        <View
          style={{
            ...styles.floatingButton,
            right: 0,
          }}>
          <SnbButton.Floating
            type="primary"
            iconName="my_location"
            contentColor={color.blue40}
            buttonColor={color.white}
            onPress={getLocationPermissions}
            disabled={false}
          />
        </View>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.addresInfo}>
          <SnbText.H3>Cari Alamat Toko</SnbText.H3>
          <View
            style={{
              marginTop: 12,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{ flex: 1 }}>
              {renderIF(
                loadingGetAddress,
                <SnbSkeletonAnimator>
                  <View style={{ height: 20, width: 120, borderRadius: 4 }} />
                </SnbSkeletonAnimator>,
                renderIF(
                  addressResult.length > 0,
                  <SnbText.B2>
                    {getStreetName(addressResult[0]?.address_components)}
                  </SnbText.B2>,
                  <SnbText.B2>Jalan tidak diketahui</SnbText.B2>,
                ),
              )}
            </View>
            <SnbButton.Dynamic
              title="Cari Lokasi"
              onPress={() => navigate(INPUT_MANUAL_LOCATION_MODAL_VIEW)}
              disabled={false}
              type="tertiary"
              buttonColor={color.blue50}
              size="small"
            />
          </View>
          {renderIF(
            loadingGetAddress,
            <SnbSkeletonAnimator>
              <View style={{ height: 20, width: 240, borderRadius: 4 }} />
            </SnbSkeletonAnimator>,
            renderIF(
              addressResult.length > 0,
              <SnbText.B1 align="justify" color={color.black60}>
                {addressResult[0]?.formatted_address}
              </SnbText.B1>,
              <SnbText.B1 color={color.black60}>
                Alamat tidak ditemukan
              </SnbText.B1>,
            ),
          )}
        </View>
        <View style={{ height: 72 }}>
          <SnbButton.Single
            title="Pilih Lokasi ini"
            disabled={loadingGetAddress || locations.loading}
            type="primary"
            loading={locations.loading}
            onPress={() => {
              if (addressResult.length === 0) {
                setShowModalAreaNotFound(true);
              } else {
                const address = extractAddress(
                  addressResult[0]?.address_components,
                );
                getLocation({
                  params: `province=${address.province}&city=${address.city}&district=${address.district}&urban=${address.urban}`,
                });
              }
            }}
          />
        </View>
      </View>
      <SnbBottomSheet
        closeAction={() => {
          setShowModalAreaNotFound(false);
        }}
        isSwipeable
        open={showModalAreaNotFound}
        content={
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('@image/sinbad_image/address_not_found.png')}
              style={{
                height: 180,
                width: 180,
                resizeMode: 'contain',
                marginVertical: 16,
              }}
            />
            <View style={{ padding: 16 }}>
              <SnbText.H3 align="center">Area Tidak Ditemukan</SnbText.H3>
              <View style={{ marginVertical: 8 }} />
              <SnbText.B1 align="center" color={color.black60}>
                Coba cek ulang posisi titik lokasi Anda atau masukkan lokasi
                manual.
              </SnbText.B1>
            </View>
            <View style={{ marginVertical: 12 }} />
            <View style={{ height: 72 }}>
              <SnbButton.Single
                onPress={() => {
                  setShowModalAreaNotFound(false);
                  navigate(INPUT_MANUAL_LOCATION_MODAL_VIEW);
                }}
                title="Masukkan Lokasi Manual"
                disabled={false}
                type="primary"
              />
            </View>
          </View>
        }
      />
    </SnbContainer>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    bottom: 32,
    width: 88,
    height: 78,
  },
  addressContainer: {
    flex: 0.3,
    backgroundColor: color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
    marginTop: -32,
    justifyContent: 'space-between',
  },
  addresInfo: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 0,
  },
});
export default MapsViewType2;
