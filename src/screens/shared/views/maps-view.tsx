import { navigate } from '@core/navigations/RootNavigation';
import apiMaps from '@core/services/apiMaps';
import { useNavigation } from '@react-navigation/core';
import { extractAddress, useMerchant } from '@screen/auth/functions';
import { useLocations } from '@screen/auth/functions/global-hooks.functions';
import { INPUT_MANUAL_LOCATION_VIEW } from '@screen/auth/functions/screens_name';
import React from 'react';
import { View, Image } from 'react-native';
import MapView, { LatLng } from 'react-native-maps';
import {
  SnbBottomSheet,
  SnbButton,
  SnbText,
  SnbContainer,
  SnbMaps,
  SnbSvgIcon,
} from 'react-native-sinbad-ui';

const MapsView = () => {
  const [desc, setDesc] = React.useState('');
  const [loadingDesc, setLoadingDesc] = React.useState(false);
  const [loading] = React.useState(false);
  const { goBack } = useNavigation();
  const [address, setAddress] = React.useState<any>();
  const { getLocation, locations, resetLocation } = useLocations();
  const [showModal, setShowModal] = React.useState(false);
  const { saveStoreData, merchantData } = useMerchant();

  React.useEffect(() => {
    resetLocation();
    return resetLocation;
  }, []);

  React.useEffect(() => {
    if (locations.data?.length > 0) {
      saveStoreData({
        address: desc === 'Alamat tidak ditemukan' ? '' : desc,
        urbanId: locations?.data[0]?.id,
      });
      goBack();
    } else if (locations.data?.length === 0) {
      setShowModal(true);
    }
  }, [locations]);

  const getAddress = async (coords?: LatLng) => {
    setLoadingDesc(true);
    try {
      const { results, error_message } = await apiMaps(
        `&latlng=${coords?.latitude},${coords?.longitude}`,
        'GET',
      );
      if (results?.length > 0) {
        setDesc(results[0].formatted_address);
        setAddress(extractAddress(results[0].address_components));
      } else if (error_message) {
        setDesc(error_message);
      } else {
        setDesc('Alamat tidak ditemukan');
      }
      setLoadingDesc(false);
    } catch (error) {
      setLoadingDesc(false);
      setDesc('Alamat tidak ditemukan');
    }
  };

  return (
    <SnbContainer color="white">
      <SnbMaps.Type1
        initialRegion={{
          latitude: merchantData?.latitude || -6.25511,
          longitude: merchantData?.longitude || 106.808,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onDragEnd={(
          coords: LatLng,
          mapRef: React.MutableRefObject<MapView | null>,
        ) => {
          mapRef.current?.animateToRegion({
            ...coords,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
          saveStoreData({
            latitude: coords?.latitude,
            longitude: coords?.longitude,
          });
          getAddress(coords);
        }}
        disableMainButton={locations.loading || loadingDesc}
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
        loading={loading}
        contentDesc={desc}
        leftButtonAction={goBack}
        descLoading={loadingDesc || desc === ''}
        onSuccessGetPosition={(position) => {
          if (merchantData.longitude === null) {
            saveStoreData({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            getAddress(position.coords);
          } else {
            getAddress({
              latitude: merchantData.latitude || 0,
              longitude: merchantData.longitude || 0,
            });
          }
        }}
      />
      <SnbBottomSheet
        actionIcon="close"
        action
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
