import React from 'react';
import {
  borderV2,
  colorV2,
  SnbBottomSheet,
  SnbButton2,
  SnbContainer,
  SnbSkeletonAnimator,
  SnbText2,
  spacingV2 as layout,
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
  const { onMapsResult, action, existingLatLang, originFrom }: any =
    params || {};

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
      if (locations.data.id !== null) {
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
        if (action === 'update') {
          onMapsResult(mapResult);
          goBack();
        } else {
          setTimeout(() => {
            if (originFrom === 'profile') {
              dispatch(
                StackActions.replace('MerchantEditAddressView', mapResult),
              );
            } else {
              dispatch(StackActions.replace(DATA_TOKO_STEP_3_VIEW, mapResult));
            }
          }, 0);
        }
      } else {
        setShowModalAreaNotFound(true);
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
          <SnbButton2.Icon
            onPress={goBack}
            disabled={false}
            size="medium"
            iconName="arrow_back"
          />
        </View>
        <View
          style={{
            ...styles.floatingButton,
            right: 0,
          }}>
          <SnbButton2.Icon
            size="medium"
            onPress={getLocationPermissions}
            disabled={false}
            iconName="location"
          />
        </View>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.addresInfo}>
          <SnbText2.Body.Large align="center">
            Cari Alamat Toko
          </SnbText2.Body.Large>
          <View
            style={{
              marginTop: layout.spacing.md,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{ flex: 1 }}>
              {renderIF(
                loadingGetAddress,
                <SnbSkeletonAnimator>
                  <View
                    style={{
                      height: 20,
                      width: 120,
                      borderRadius: borderV2.radius.sm,
                    }}
                  />
                </SnbSkeletonAnimator>,
                renderIF(
                  addressResult.length > 0,
                  <SnbText2.Body.Small>
                    {getStreetName(addressResult[0]?.address_components)}
                  </SnbText2.Body.Small>,
                  <SnbText2.Body.Small>
                    Jalan tidak diketahui
                  </SnbText2.Body.Small>,
                ),
              )}
            </View>
            <View style={{ marginRight: -layout.spacing.md }}>
              <SnbButton2.Link
                title="Cari Lokasi"
                onPress={() => navigate(INPUT_MANUAL_LOCATION_MODAL_VIEW)}
                disabled={false}
                size="small"
              />
            </View>
          </View>
          {renderIF(
            loadingGetAddress,
            <SnbSkeletonAnimator>
              <View
                style={{
                  height: 20,
                  width: 240,
                  borderRadius: borderV2.radius.sm,
                }}
              />
            </SnbSkeletonAnimator>,
            renderIF(
              addressResult.length > 0,
              <SnbText2.Paragraph.Small
                align="justify"
                color={colorV2.textColor.secondary}>
                {addressResult[0]?.formatted_address}
              </SnbText2.Paragraph.Small>,
              <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
                Alamat tidak ditemukan
              </SnbText2.Paragraph.Small>,
            ),
          )}
        </View>
        <View style={{ padding: layout.spacing.lg }}>
          <SnbButton2.Primary
            title="Pilih Lokasi ini"
            disabled={loadingGetAddress || locations.loading}
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
            full
            size="medium"
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
                marginVertical: layout.spacing.lg,
              }}
            />
            <View
              style={{
                paddingHorizontal: layout.spacing['3xl'],
                paddingVertical: layout.spacing.sm,
              }}>
              <SnbText2.Headline.Default align="center">
                Area Tidak Ditemukan
              </SnbText2.Headline.Default>
              <View style={{ marginVertical: layout.spacing.sm }} />
              <SnbText2.Paragraph.Default
                align="center"
                color={colorV2.textColor.secondary}>
                Coba cek ulang posisi titik lokasi Anda atau masukkan lokasi
                manual.
              </SnbText2.Paragraph.Default>
            </View>
            <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
              <View style={{ flex: 1 }}>
                <SnbButton2.Primary
                  onPress={() => {
                    setShowModalAreaNotFound(false);
                    navigate(INPUT_MANUAL_LOCATION_MODAL_VIEW);
                  }}
                  title="Masukkan Lokasi Manual"
                  disabled={false}
                  full
                  size="medium"
                />
              </View>
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
    margin: layout.spacing.lg,
  },
  addressContainer: {
    flex: 0.3,
    backgroundColor: colorV2.bgColor.light,
    borderTopLeftRadius: borderV2.radius.lg,
    borderTopRightRadius: borderV2.radius.lg,
    elevation: 4,
    marginTop: -layout.spacing.xxl,
    justifyContent: 'space-between',
  },
  addresInfo: {
    paddingHorizontal: layout.spacing.lg,
    paddingTop: layout.spacing.xl,
    paddingBottom: 0,
  },
});
export default MapsViewType2;
