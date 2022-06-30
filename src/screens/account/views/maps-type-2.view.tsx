import React, { useCallback } from 'react';
import {
  borderV2,
  colorV2,
  Content,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
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
import { debounce } from 'lodash';

const MapsViewType2: React.FC = () => {
  const [latLng, setLatLng] = React.useState<LatLng>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });
  const refMaps = React.useRef<MapView>(null);
  const { navigate, goBack, dispatch } = useNavigation();
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [addressResult, setAddressResult] = React.useState<any[]>([]);
  const [isMounted, setIsMounted] = React.useState(true);
  const { getLocation, locations, resetLocation } = useLocations();
  const [loadingGetAddress, setLoadingGetAddress] = React.useState(false);
  const { params } = useRoute();
  const { onMapsResult, action, currentLatLng, originFrom }: any =
    params || {};

  React.useEffect(() => {
    if (currentLatLng) {
      setLatLng(currentLatLng);
      setTimeout(() => {
        refMaps.current?.animateToRegion({
          ...currentLatLng,
          ...REGION_OPTIONS,
        });
      }, 10)
    } else {
      getLocationPermissions();
    }
    return () => {
      setIsMounted(false);
      resetLocation();
    };
  }, []);

  const handleOnChangeRegionComplete = useCallback(
    debounce(({ latitude, longitude }) => {
      setLatLng({ latitude, longitude })
      getAddress({ latitude, longitude })
    }, 750)
    , [latLng])

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
        bottomSheetRef.current?.open();
      }
    }

    if (locations.error) {
      bottomSheetRef.current?.open();
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
        getAddress({ latitude, longitude })
        setTimeout(() => {
          refMaps.current?.animateToRegion({
            latitude,
            longitude,
            ...REGION_OPTIONS,
          });
        }, 10)
      },
      (error: any) => {
        if (error?.code === 3) {
          getUserLocation();
        } else {
          bottomSheetRef.current?.open();
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
          bottomSheetRef.current?.open();
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
            ...REGION_OPTIONS
          }}
          showsMyLocationButton={false}
          ref={refMaps}
          onRegionChangeComplete={handleOnChangeRegionComplete}
          style={{ flex: 1 }} />
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={require('@image/pin_point.png')} />
        </View>
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
                bottomSheetRef.current?.open();
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
      <SnbBottomSheet2
        ref={bottomSheetRef}
        name="modal-area-not-found"
        title={<SnbBottomSheetPart.Title title="" swipeIndicator />}
        type="content"
        contentHeight={contentHeight + 100}
        content={
          <View
            onLayout={(ev) => setContentHeight(ev.nativeEvent.layout.height)}>
            <Content.Illustration
              image={require('@image/sinbad_image/address_not_found.png')}
              imageStyle={{
                height: 180,
                width: 180,
                resizeMode: 'contain',
                marginVertical: layout.spacing.lg,
              }}
              title="Area Tidak Ditemukan"
              description="Coba cek ulang posisi titik lokasi Anda atau masukkan lokasi
              manual."
            />
          </View>
        }
        button={
          <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
            <View style={{ flex: 1 }}>
              <SnbButton2.Primary
                onPress={() => {
                  bottomSheetRef.current?.close();
                  navigate(INPUT_MANUAL_LOCATION_MODAL_VIEW);
                }}
                title="Masukkan Lokasi Manual"
                disabled={false}
                full
                size="medium"
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
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48,
    resizeMode: 'contain'
  },
});
export default MapsViewType2;
