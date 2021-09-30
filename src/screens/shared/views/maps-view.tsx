import { navigate } from '@core/navigations/RootNavigation';
import apiMaps from '@core/services/apiMaps';
import { useNavigation } from '@react-navigation/core';
import { useTextFieldSelect } from '@screen/auth/functions';
import { INPUT_MANUAL_LOCATION_VIEW } from '@screen/auth/screens_name';
import React from 'react';
import { View } from 'react-native';
import MapView, { LatLng } from 'react-native-maps';
import {
  SnbBottomSheet,
  SnbButton,
  SnbContainer,
  SnbMaps,
} from 'react-native-sinbad-ui';

const MapsView = () => {
  const [desc, setDesc] = React.useState('');
  const [loadingDesc, setLoadingDesc] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { goBack } = useNavigation();
  const { resetSelectedItem } = useTextFieldSelect();

  const getAddress = async (coords?: LatLng) => {
    setLoadingDesc(true);
    try {
      const { results, error_message } = await apiMaps(
        `&latlng=${coords?.latitude},${coords?.longitude}`,
        'GET',
      );
      if (results) {
        if (results.length > 0) {
          setDesc(results[0].formatted_address);
        } else {
          setDesc('Alamat tidak ditemukan');
        }
        setLoadingDesc(false);
      }
      if (error_message) {
        setDesc(error_message);
        setLoadingDesc(false);
      }
    } catch (error) {
      setLoadingDesc(false);
      setDesc('Alamat tidak ditemukan');
      console.log(error);
    }
  };

  return (
    <SnbContainer color="white">
      <SnbMaps.Type1
        onDragEnd={(
          coords: LatLng,
          mapRef: React.MutableRefObject<MapView | null>,
        ) => {
          mapRef.current?.animateToRegion({
            ...coords,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
          getAddress(coords);
        }}
        mainButtonAction={() => {
          resetSelectedItem();
          navigate(INPUT_MANUAL_LOCATION_VIEW);
        }}
        contentTitle="Detail Alamat"
        loading={loading}
        contentDesc={desc}
        leftButtonAction={goBack}
        descLoading={loadingDesc || desc === ''}
        onSuccessGetPosition={(position) => {
          getAddress(position.coords);
        }}
      />
      <SnbBottomSheet
        content={
          <View>
            <View style={{ height: 72 }}>
              <SnbButton.Single
                title="Input Lokasi Manual"
                onPress={() => navigate(INPUT_MANUAL_LOCATION_VIEW)}
                disabled={false}
                type="primary"
              />
            </View>
          </View>
        }
        open={true}
      />
    </SnbContainer>
  );
};

export default MapsView;
