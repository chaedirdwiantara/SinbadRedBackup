import { useNavigation } from '@react-navigation/core';
import { useTextFieldSelect } from '@screen/auth/functions';
import React from 'react';
import { View } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbTextFieldSelect,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import { ModalSelection } from '../shared';
import * as models from '@models';
import { useLocations } from '@screen/auth/functions/global-hooks.functions';

const Content = () => {
  const { resetSelectedItem, resetGetSelection, getSelection, onSelectedItem } =
    useTextFieldSelect();
  const [province, setProvince] = React.useState<any>(null);
  const [city, setCity] = React.useState<any>(null);
  const [district, setDistrict] = React.useState<any>(null);
  const [urban, setUrban] = React.useState<any>(null);
  const { goBack } = useNavigation();
  const [type, setType] = React.useState<models.ITypeList>('');
  const [openModalSelection, setOpenModalSelection] =
    React.useState<boolean>(false);
  const [params, setParams] = React.useState('');
  const { getLocation, locations, resetLocation } = useLocations();

  React.useEffect(() => {
    if (type === 'listProvince' && province) {
      onSelectedItem({ item: province, type: 'listProvince' });
    }
  }, [type]);

  React.useEffect(() => {
    if (locations.data) {
      goBack();
      resetLocation();
    }

    return resetLocation;
  }, [locations]);

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <SnbTextFieldSelect
            labelText="Provinsi"
            placeholder="Pilih Provinsi"
            mandatory
            value={province?.province || ''}
            type="default"
            onPress={() => {
              setType('listProvince');
              getSelection({ type: 'listProvince' });
              setOpenModalSelection(true);
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: 12 }} />
          <SnbTextFieldSelect
            labelText="Kota"
            placeholder="Pilih Kota"
            mandatory
            value={city?.city || ''}
            type="default"
            onPress={() => {
              if (province) {
                const cityParams = `province=${province?.province || ''}`;
                setType('listCity');
                setParams(cityParams);
                city && onSelectedItem({ item: city, type: 'listCity' });
                getSelection({
                  type: 'listCity',
                  params: cityParams,
                });
                setOpenModalSelection(true);
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: 12 }} />
          <SnbTextFieldSelect
            labelText="Kecamatan"
            placeholder="Pilih Kecamatan"
            mandatory
            value={district?.district || ''}
            type="default"
            onPress={() => {
              if (city?.city) {
                const districtParams = `province=${province?.province}&city=${
                  city?.city || ''
                }`;
                setType('listDistrict');
                setParams(districtParams);
                district &&
                  onSelectedItem({ type: 'listDistrict', item: district });
                getSelection({
                  type: 'listDistrict',
                  params: districtParams,
                });
                setOpenModalSelection(true);
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: 12 }} />
          <SnbTextFieldSelect
            labelText="Desa/Kelurahan"
            placeholder="Pilih Desa/Kelurahan"
            value={urban?.urban || ''}
            mandatory
            type="default"
            onPress={() => {
              if (district?.district) {
                const urbanParams = `province=${
                  province?.province || ''
                }&city=${city?.city || ''}&district=${
                  district?.district || ''
                }`;
                setType('listUrban');
                setParams(urbanParams);
                getSelection({
                  type: 'listUrban',
                  params: urbanParams,
                });
                urban && onSelectedItem({ type: 'listUrban', item: urban });
                setOpenModalSelection(true);
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: 12 }} />
          <SnbTextFieldSelect
            labelText="Kode Pos"
            placeholder="Lihat Kode Pos"
            mandatory
            value={urban?.zipCode || ''}
            type="default"
            onPress={() => {}}
            rightType="icon"
            rightIcon="chevron_right"
          />
        </View>
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title="Simpan Lokasi Manual"
          loading={locations.loading}
          onPress={() => {
            getLocation({
              params: `province=${province.province}&city=${city.city}&district=${district.district}&urban=${urban.urban}`,
            });
          }}
          disabled={
            !province || !city || !district || !urban || locations.loading
          }
          type="primary"
        />
      </View>
      <ModalSelection
        type={type}
        open={openModalSelection}
        params={params}
        onCloseModalSelection={(result) => {
          if (result) {
            onSelectedItem(result);
            switch (result?.type) {
              case 'listProvince': {
                setProvince(result.item);
                setCity(null);
                setDistrict(null);
                setUrban(null);
                break;
              }
              case 'listCity': {
                setCity(result.item);
                setDistrict(null);
                setUrban(null);
                break;
              }
              case 'listDistrict': {
                setDistrict(result.item);
                setUrban(null);
                break;
              }
              case 'listUrban': {
                setUrban(result.item);
                break;
              }
              default:
                break;
            }
          }
          resetGetSelection();
          resetSelectedItem();
          setOpenModalSelection(false);
        }}
      />
    </View>
  );
};

const InputManualLocationModalView = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} title="Lokasi Manual" type="white" />
      <Content />
    </SnbContainer>
  );
};

export default InputManualLocationModalView;