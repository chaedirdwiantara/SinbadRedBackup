import React, { useCallback } from 'react';
import {
  borderV2,
  colorV2,
  Content,
  FooterButton,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  SnbContainer,
  SnbIcon,
  SnbSkeletonAnimator,
  SnbText2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import MapView, { LatLng } from 'react-native-maps';
import {
  Image,
  LogBox,
  PermissionsAndroid,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { DATA_TOKO_STEP_3_VIEW, } from '../functions/screens_name';
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
  removePlusCode,
} from '@screen/auth/functions/auth-utils.functions';
import { debounce } from 'lodash';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';


interface IconButtonProps {
  icon: string;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onPress }) => {
  return (
    <TouchableHighlight
      style={{
        backgroundColor: colorV2.bgColor.light,
        paddingVertical: 12.8,
        paddingHorizontal: 12.8,
        borderRadius: borderV2.radius.full,
        alignItems: 'center'
      }}
      underlayColor={colorV2.bgColor.neutral}
      onPress={onPress}>
      <View style={{ alignItems: 'center' }}>
        <SnbIcon
          name={icon}
          size={18.3}
          color={colorV2.iconColor.dark}
        />
      </View>
    </TouchableHighlight>
  )
}

const MapsViewType2: React.FC = () => {
  const [latLng, setLatLng] = React.useState<LatLng>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });
  const refMaps = React.useRef<MapView>(null);
  const { goBack, dispatch } = useNavigation();
  const bottomSheetRef = React.useRef<SnbBottomSheet2Ref>(null);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [addressResult, setAddressResult] = React.useState<any[]>([]);
  const [isMounted, setIsMounted] = React.useState(true);
  const { getLocation, locations, resetLocation } = useLocations();
  const [loadingGetAddress, setLoadingGetAddress] = React.useState(false);
  const { params } = useRoute();
  const { onMapsResult, action, currentLatLng, originFrom, testID }: any =
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
          addressResult.length > 0 ? removePlusCode(addressResult[0].formatted_address) : '';
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
    } catch (error) { }
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
    } catch (error) { }
  }

  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.'])

  return (
    <SnbContainer color="white">
      <View style={{ flex: 0.7 }}>
        <GooglePlacesAutocomplete
          placeholder='Cari alamat toko Anda di sini'
          fetchDetails
          numberOfLines={2}
          minLength={3}
          debounce={750}
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          keepResultsAfterBlur
          textInputProps={{ multiline: true }}
          isRowScrollable={false}
          onPress={(_, details = null) => {
            if (details?.geometry?.location) {
              refMaps.current?.animateToRegion({
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
                ...REGION_OPTIONS,
              });
            }
          }}
          query={{
            key: Config.GOOGLE_MAPS_API_KEY,
            language: 'id',
            components: 'country:id',
          }}
          renderLeftButton={() => (
            <View style={styles.iconSearchBar}>
              <SnbIcon name="search" size={16} />
            </View>
          )}
          renderRow={({ description, id }) => (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <SnbIcon name="location_store" size={16} color={colorV2.iconColor.default} />
              <View style={{ marginHorizontal: layout.spacing.xxsm }} />
              <View style={{ flex: 1 }}>
                <SnbText2.Body.Default key={id} numberOfLines={2}>
                  {description}
                </SnbText2.Body.Default>
              </View>
            </View>
          )}
          styles={{
            container: styles.searchBarContainer,
            textInput: styles.searchBarTextInput
          }}
        />
        <MapView
          initialRegion={{
            ...latLng,
            ...REGION_OPTIONS,
          }}
          showsMyLocationButton={false}
          ref={refMaps}
          onRegionChangeComplete={handleOnChangeRegionComplete}
          style={{ flex: 1 }}
          testID={'13.1.1'}
        />
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={require('@image/pin_point.png')} />
        </View>
        <View style={{ ...styles.floatingButton }}>
          <IconButton
            icon='arrow_back'
            onPress={goBack}
          />
        </View>
        <View style={{ ...styles.floatingButton, right: 0 }}>
          <IconButton
            icon='location'
            onPress={getLocationPermissions}
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
              marginBottom: layout.spacing.md
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
                color={colorV2.textColor.secondary}
                testID={'13.1.1'}>
                {removePlusCode(addressResult[0]?.formatted_address)}
              </SnbText2.Paragraph.Small>,
              <SnbText2.Paragraph.Small
                color={colorV2.textColor.secondary}
                testID={'13.1.1'}>
                Alamat tidak ditemukan
              </SnbText2.Paragraph.Small>,
            ),
          )}
        </View>
        <FooterButton.Single
          title="Pilih Lokasi ini"
          disabled={loadingGetAddress || locations.loading}
          loadingButton={locations.loading}
          buttonPress={() => {
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
          testID={'13.1.1'}
        />
      </View>
      <SnbBottomSheet2
        ref={bottomSheetRef}
        name="modal-area-not-found"
        title={<SnbBottomSheetPart.Title title="" />}
        navigation={
          <SnbBottomSheetPart.Navigation
            iconRight1Name="x"
            onRight1Action={bottomSheetRef.current?.close}
          />
        }
        type="content"
        contentHeight={contentHeight + 56}
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
              description="Coba cek ulang posisi titik lokasi Anda atau Anda dapat hubungi tim CS"
            />
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
    height: 64,
    width: 64,
    resizeMode: 'contain'
  },
  iconSearchBar: {
    backgroundColor: colorV2.bgColor.light,
    marginBottom: 5,
    borderTopLeftRadius: borderV2.radius.md,
    borderBottomLeftRadius: borderV2.radius.md,
    justifyContent: 'center',
    paddingLeft: layout.spacing.md,
    paddingRight: layout.spacing.xxsm
  },
  searchBarContainer: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    right: 0,
    marginTop: layout.spacing['3xl'],
    marginHorizontal: layout.spacing.lg
  },
  searchBarTextInput: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: colorV2.bgColor.light
  }
});
export default MapsViewType2;
