import { useNavigation } from '@react-navigation/core';
import { useTextFieldSelect } from '@screen/auth/functions';
import { useLocations } from '@screen/auth/functions/global-hooks.functions';
import React from 'react';
import { View } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbTextFieldSelect,
  SnbTopNav,
} from 'react-native-sinbad-ui';

const Content = () => {
  const { gotoSelection, selectedItem, resetSelectedItem } =
    useTextFieldSelect();
  const [province, setProvince] = React.useState<any>(null);
  const [city, setCity] = React.useState<any>(null);
  const [district, setDistrict] = React.useState<any>(null);
  const [urban, setUrban] = React.useState<any>(null);
  const { getLocation, locations } = useLocations();
  const { goBack } = useNavigation();

  React.useEffect(() => {
    if (locations.data?.length > 0) {
      goBack();
    }
  }, [locations]);

  React.useEffect(() => {
    switch (selectedItem?.type) {
      case 'listProvince': {
        setProvince(selectedItem.item);
        setCity(null);
        setDistrict(null);
        setUrban(null);
        break;
      }
      case 'listCity': {
        setCity(selectedItem.item);
        setDistrict(null);
        setUrban(null);
        break;
      }
      case 'listDistrict': {
        setDistrict(selectedItem.item);
        setUrban(null);
        break;
      }
      case 'listUrban': {
        setUrban(selectedItem.item);
        break;
      }
      default:
        break;
    }
    return resetSelectedItem;
  }, [selectedItem]);

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ padding: 16 }}>
        <SnbTextFieldSelect
          labelText="Provinsi"
          placeholder="Pilih Provinsi"
          value={province?.name || ''}
          type="default"
          onPress={() => {
            gotoSelection({ type: 'listProvince' });
          }}
          rightType="icon"
          rightIcon="arrow_drop_down"
        />
        <View style={{ marginVertical: 12 }} />
        <SnbTextFieldSelect
          labelText="Kota"
          placeholder="Pilih Kota"
          value={city?.city || ''}
          type="default"
          onPress={() => {
            if (province?.id) {
              gotoSelection({
                type: 'listCity',
                params: `provinceId=${province.id}`,
                meta: {
                  limit: 100,
                },
              });
            }
          }}
          rightType="icon"
          rightIcon="arrow_drop_down"
        />
        <View style={{ marginVertical: 12 }} />
        <SnbTextFieldSelect
          labelText="Kecamatan"
          placeholder="Pilih Kecamatan"
          value={district?.district || ''}
          type="default"
          onPress={() => {
            if (city?.city) {
              gotoSelection({
                type: 'listDistrict',
                params: `city=${city.city}`,
                meta: {
                  limit: 100,
                },
              });
            }
          }}
          rightType="icon"
          rightIcon="arrow_drop_down"
        />
        <View style={{ marginVertical: 12 }} />
        <SnbTextFieldSelect
          labelText="Desa/Kelurahan"
          placeholder="Pilih Desa/Kelurahan"
          value={urban?.urban || ''}
          type="default"
          onPress={() => {
            if (district?.district) {
              gotoSelection({
                type: 'listUrban',
                params: `district=${district.district}`,
                meta: {
                  limit: 100,
                },
              });
            }
          }}
          rightType="icon"
          rightIcon="arrow_drop_down"
        />
        <View style={{ marginVertical: 12 }} />
        <SnbTextFieldSelect
          labelText="Kode Pos"
          placeholder="Lihat Kode Pos"
          value={urban?.zipCode || ''}
          type="default"
          onPress={() => {}}
          rightType="icon"
          rightIcon="arrow_drop_down"
        />
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title="Simpan Lokasi Manual"
          loading={locations.loading}
          onPress={() => {
            getLocation({
              params: `province=${province.name}&city=${city.city}&district=${district.district}&urban=${urban.urban}`,
              meta: {
                limit: 10,
                skip: 0,
              },
            });
          }}
          disabled={!province || !city || !district || !urban}
          type="primary"
        />
      </View>
    </View>
  );
};

const InputManualLocationView = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        title="Input Manual Location"
        type="red"
      />
      <Content />
    </SnbContainer>
  );
};

export default InputManualLocationView;
