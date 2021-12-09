import { contexts } from '@contexts';
import { navigate } from '@core/navigations/RootNavigation';
import apiMaps from '@core/services/apiMaps';
import { useNavigation, useRoute } from '@react-navigation/core';
import { extractAddress, useMerchant } from '@screen/auth/functions';
import { useLocations } from '@screen/auth/functions/global-hooks.functions';
import { INPUT_MANUAL_LOCATION_VIEW } from '@screen/auth/functions/screens_name';
import React from 'react';
import { View, Image } from 'react-native';
import MapView, { LatLng, Region } from 'react-native-maps';
import {
  SnbBottomSheet,
  SnbButton,
  SnbText,
  SnbContainer,
  SnbMaps,
} from 'react-native-sinbad-ui';

const DEFAULT_LOCATION: LatLng = { longitude: 106.808, latitude: -6.25511 };

const MapsView = () => {
  const [desc, setDesc] = React.useState('');
  const [loadingDesc, setLoadingDesc] = React.useState(false);
  const [address, setAddress] = React.useState<any>();
  const [showModal, setShowModal] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(true);
  const [position, setPosition] = React.useState<LatLng | null>(null);
  const [isGettingCurrentPosition, setIsGettingCurrentPosition] =
    React.useState<boolean>(true);
  const { goBack } = useNavigation();
  const { saveStoreData, merchantData } = useMerchant();
  const { getLocation, locations, resetLocation } = useLocations();
  const { stateUser } = React.useContext(contexts.UserContext);
  const { storeAddress }: any = stateUser.detail.data?.storeData || {};
  const { params }: any = useRoute();
  const [region, setRegion] = React.useState<Region>({
    latitude:
      merchantData?.latitude ||
      storeAddress?.latitude ||
      DEFAULT_LOCATION.latitude,
    longitude:
      merchantData?.longitude ||
      storeAddress?.longitude ||
      DEFAULT_LOCATION.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  React.useEffect(() => {
    if (params?.action === 'edit') {
      setDesc(storeAddress.address || '');
    } else {
      if (merchantData.address) {
        setDesc(merchantData.address || '');
      } else {
        setDesc('Mendapatkan lokasi anda. . .');
        setPosition(DEFAULT_LOCATION);
      }
    }
    resetLocation();
    return () => {
      setIsMounted(false);
      resetLocation();
    };
  }, []);

  React.useEffect(() => {
    if (locations.data?.length > 0) {
      saveStoreData({
        address: desc === 'Alamat tidak ditemukan' ? '' : desc,
        urbanId: locations?.data[0]?.id,
        latitude: position?.latitude,
        longitude: position?.longitude,
      });
      goBack();
    }

    if (locations.data?.length === 0 || locations.error !== null) {
      saveStoreData({
        latitude: position?.latitude,
        longitude: position?.longitude,
      });
      setShowModal(true);
    }
  }, [locations]);

  const getAddress = async (coords?: LatLng) => {
    setIsGettingCurrentPosition(false);
    setLoadingDesc(true);
    try {
      const { results, error_message } = await apiMaps(
        `&latlng=${coords?.latitude},${coords?.longitude}`,
        'GET',
      );
      if (isMounted) {
        if (results?.length > 0) {
          setDesc(results[0].formatted_address);
          setAddress(extractAddress(results[0].address_components));
        } else if (error_message) {
          setAddress(null);
          setDesc(error_message);
        } else {
          setAddress(null);
          setDesc('Alamat tidak ditemukan');
        }
        setLoadingDesc(false);
      }
    } catch (error) {
      if (isMounted) {
        setLoadingDesc(false);
        setDesc('Alamat tidak ditemukan');
      }
    }
  };

  return (
    <SnbContainer color="white">
      <SnbMaps.Type1
        initialRegion={region}
        onDragEnd={(
          coords: LatLng,
          mapRef: React.MutableRefObject<MapView | null>,
        ) => {
          mapRef.current?.animateToRegion({
            ...coords,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
          setPosition({
            latitude: coords?.latitude,
            longitude: coords?.longitude,
          });
          getAddress(coords);
        }}
        disableMainButton={
          locations.loading ||
          loadingDesc ||
          storeAddress?.address === desc ||
          desc === '' ||
          isGettingCurrentPosition
        }
        mainButtonAction={() => {
          if (address) {
            getLocation({
              params: `province=${address.province}&city=${address.city}&district=${address.district}&urban=${address.urban}`,
              meta: {
                limit: 10,
                skip: 0,
              },
            });
          } else {
            setShowModal(true);
          }
        }}
        contentTitle="Detail Alamat"
        loading={locations.loading}
        contentDesc={desc}
        leftButtonAction={goBack}
        descLoading={loadingDesc || desc === ''}
        onFailedGetPosition={(error) => setDesc(error.message)}
        onSuccessGetPosition={(geoPosition, refMaps, _) => {
          if (
            merchantData.longitude === null &&
            params?.action === 'register'
          ) {
            refMaps.current?.animateToRegion({
              ...geoPosition,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            });
            setRegion({ ...region, ...geoPosition });
            setPosition({
              latitude: geoPosition.latitude,
              longitude: geoPosition.longitude,
            });
            getAddress(geoPosition);
          } else {
            getAddress({
              latitude:
                merchantData?.latitude ||
                storeAddress?.latitude ||
                DEFAULT_LOCATION.latitude,
              longitude:
                merchantData?.longitude ||
                storeAddress?.longitude ||
                DEFAULT_LOCATION.longitude,
            });
          }
        }}
      />
      <SnbBottomSheet
        actionIcon="close"
        closeAction={() => {
          setShowModal(false);
        }}
        content={
          <View>
            <View style={{ alignItems: 'center', margin: 16 }}>
              <Image
                source={require('../../../assets/images/sinbad_image/no_gps.png')}
                style={{ height: 190, width: undefined, aspectRatio: 1 / 1 }}
              />
            </View>
            <SnbText.B2 align="center">Area tidak ditemukan</SnbText.B2>
            <View style={{ marginVertical: 8 }} />
            <SnbText.B3 align="center">
              Perbesar peta dengan dua jari pada layar Anda atau masukkan lokasi
              manual
            </SnbText.B3>
            <View style={{ marginVertical: 8 }} />
            <View style={{ height: 72 }}>
              <SnbButton.Single
                title="Masukkan Lokasi Manual"
                onPress={() => {
                  saveStoreData({
                    latitude: position?.latitude,
                    longitude: position?.longitude,
                  });
                  setShowModal(false);
                  navigate(INPUT_MANUAL_LOCATION_VIEW);
                }}
                disabled={false}
                type="primary"
              />
            </View>
          </View>
        }
        open={showModal}
      />
    </SnbContainer>
  );
};

export default MapsView;
